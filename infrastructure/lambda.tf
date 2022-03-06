data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda_role" {
  name               = "OverUnderConnect-role-rfdxvzhw"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
  managed_policy_arns = [
    "arn:aws:iam::324131267502:policy/OverUnder",
    "arn:aws:iam::324131267502:policy/service-role/AWSLambdaBasicExecutionRole-d87ed3ef-06f1-4177-a69b-ddbe23b6e72b",
  ]
}

data "archive_file" "connect_lambda_zip" {
  type = "zip"

  source_dir  = "${path.module}/handlers/connect"
  output_path = "${path.module}/handlers/archived/connect.zip"
}

resource "aws_lambda_function" "connect_lambda" {
  filename         = "${path.module}/handlers/archived/connect.zip"
  function_name    = "OverUnderConnect"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.connect_lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "connect_log_group" {
  name = "/aws/lambda/${aws_lambda_function.connect_lambda.function_name}"
}

resource "aws_apigatewayv2_integration" "connect_integration" {
  api_id                    = aws_apigatewayv2_api.over_under_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.connect_lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "connect_route" {
  api_id    = aws_apigatewayv2_api.over_under_gateway.id
  route_key = "$connect"
  target    = "integrations/${aws_apigatewayv2_integration.connect_integration.id}"
}

data "archive_file" "disconnect_lambda_zip" {
  type = "zip"

  source_dir  = "${path.module}/handlers/disconnect"
  output_path = "${path.module}/handlers/archived/disconnect.zip"
}

resource "aws_lambda_function" "disconnect_lambda" {
  filename         = "${path.module}/handlers/archived/disconnect.zip"
  function_name    = "OverUnderDisconnect"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.disconnect_lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "disconnect_log_group" {
  name = "/aws/lambda/${aws_lambda_function.disconnect_lambda.function_name}"
}

resource "aws_apigatewayv2_integration" "disconnect_integration" {
  api_id                    = aws_apigatewayv2_api.over_under_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.disconnect_lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "disconnect_route" {
  api_id    = aws_apigatewayv2_api.over_under_gateway.id
  route_key = "$disconnect"
  target    = "integrations/${aws_apigatewayv2_integration.disconnect_integration.id}"
}

data "archive_file" "dispatch_lambda_zip" {
  type = "zip"

  source_dir  = "${path.module}/handlers/dispatch"
  output_path = "${path.module}/handlers/archived/dispatch.zip"
}

resource "aws_lambda_function" "dispatch_lambda" {
  filename         = "${path.module}/handlers/archived/dispatch.zip"
  function_name    = "OverUnderDispatch"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.dispatch_lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "dispatch_log_group" {
  name = "/aws/lambda/${aws_lambda_function.dispatch_lambda.function_name}"
}

resource "aws_apigatewayv2_integration" "dispatch_integration" {
  api_id                    = aws_apigatewayv2_api.over_under_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.dispatch_lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "dispatch_route" {
  api_id    = aws_apigatewayv2_api.over_under_gateway.id
  route_key = "dispatch"
  target    = "integrations/${aws_apigatewayv2_integration.dispatch_integration.id}"
}

data "archive_file" "join_room_lambda_zip" {
  type = "zip"

  source_dir  = "${path.module}/handlers/joinRoom"
  output_path = "${path.module}/handlers/archived/joinRoom.zip"
}

resource "aws_lambda_function" "join_room_lambda" {
  filename         = "${path.module}/handlers/archived/joinRoom.zip"
  function_name    = "OverUnderJoinRoom"
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.join_room_lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "join_room_log_group" {
  name = "/aws/lambda/${aws_lambda_function.join_room_lambda.function_name}"
}

resource "aws_apigatewayv2_integration" "join_room_integration" {
  api_id                    = aws_apigatewayv2_api.over_under_gateway.id
  integration_type          = "AWS_PROXY"
  integration_uri           = aws_lambda_function.join_room_lambda.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "join_room_route" {
  api_id    = aws_apigatewayv2_api.over_under_gateway.id
  route_key = "joinRoom"
  target    = "integrations/${aws_apigatewayv2_integration.join_room_integration.id}"
}