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

// Connect

module "connect_lambda" {
  source        = "./modules/lambda"
  function_name = "OverUnderConnect"
  source_dir    = "${path.module}/handlers/connect"
  lambda_role_arn = aws_iam_role.lambda_role.arn
}

module "connect_route" {
  source         = "./modules/route"
  api_gateway_id = aws_apigatewayv2_api.over_under_gateway.id
  route_name     = "$connect"
  lambda_invoke_arn = module.connect_lambda.invoke_arn
}

// Disconnect

module "disconnect_lambda" {
  source        = "./modules/lambda"
  function_name = "OverUnderDisconnect"
  source_dir    = "${path.module}/handlers/disconnect"
  lambda_role_arn = aws_iam_role.lambda_role.arn
}

module "disconnect_route" {
  source         = "./modules/route"
  api_gateway_id = aws_apigatewayv2_api.over_under_gateway.id
  route_name     = "$disconnect"
  lambda_invoke_arn = module.disconnect_lambda.invoke_arn
}

// Dispatch

module "dispatch_lambda" {
  source        = "./modules/lambda"
  function_name = "OverUnderDispatch"
  source_dir    = "${path.module}/handlers/dispatch"
  lambda_role_arn = aws_iam_role.lambda_role.arn
}

module "dispatch_route" {
  source         = "./modules/route"
  api_gateway_id = aws_apigatewayv2_api.over_under_gateway.id
  route_name     = "dispatch"
  lambda_invoke_arn = module.dispatch_lambda.invoke_arn
}

// Join Room

module "join_room_lambda" {
  source        = "./modules/lambda"
  function_name = "OverUnderJoinRoom"
  source_dir    = "${path.module}/handlers/joinRoom"
  lambda_role_arn = aws_iam_role.lambda_role.arn
}

module "join_room_route" {
  source         = "./modules/route"
  api_gateway_id = aws_apigatewayv2_api.over_under_gateway.id
  route_name     = "joinRoom"
  lambda_invoke_arn = module.join_room_lambda.invoke_arn
}