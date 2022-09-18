// Connect

module "connect_lambda" {
  source                    = "./modules/lambda"
  function_name             = "OverUnderConnect"
  source_dir                = "${path.root}/handlers/connect"

  depends_on = [
    aws_iam_policy.dynamo,
    aws_iam_policy.manage_connections
  ]
}

module "connect_route" {
  source            = "./modules/route"
  api_gateway_id    = aws_apigatewayv2_api.over_under.id
  route_name        = "$connect"
  lambda_invoke_arn = module.connect_lambda.invoke_arn
}

resource "aws_lambda_permission" "connect_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.connect_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.over_under.execution_arn}/*/${module.connect_route.route.route_key}"
}

// Disconnect

module "disconnect_lambda" {
  source                    = "./modules/lambda"
  function_name             = "OverUnderDisconnect"
  source_dir                = "${path.root}/handlers/disconnect"

  depends_on = [
    aws_iam_policy.dynamo,
    aws_iam_policy.manage_connections
  ]
}

module "disconnect_route" {
  source            = "./modules/route"
  api_gateway_id    = aws_apigatewayv2_api.over_under.id
  route_name        = "$disconnect"
  lambda_invoke_arn = module.disconnect_lambda.invoke_arn
}

resource "aws_lambda_permission" "disconnect_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.disconnect_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.over_under.execution_arn}/*/${module.disconnect_route.route.route_key}"
}

// Dispatch

module "dispatch_lambda" {
  source                    = "./modules/lambda"
  function_name             = "OverUnderDispatch"
  source_dir                = "${path.root}/handlers/dispatch"

  depends_on = [
    aws_iam_policy.dynamo,
    aws_iam_policy.manage_connections
  ]
}

module "dispatch_route" {
  source            = "./modules/route"
  api_gateway_id    = aws_apigatewayv2_api.over_under.id
  route_name        = "dispatch"
  lambda_invoke_arn = module.dispatch_lambda.invoke_arn
}

resource "aws_lambda_permission" "dispatch_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.dispatch_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.over_under.execution_arn}/*/${module.dispatch_route.route.route_key}"
}

// Join Room

module "join_room_lambda" {
  source                    = "./modules/lambda"
  function_name             = "OverUnderJoinRoom"
  source_dir                = "${path.root}/handlers/joinRoom"

  depends_on = [
    aws_iam_policy.dynamo,
    aws_iam_policy.manage_connections
  ]
}

module "join_room_route" {
  source            = "./modules/route"
  api_gateway_id    = aws_apigatewayv2_api.over_under.id
  route_name        = "joinRoom"
  lambda_invoke_arn = module.join_room_lambda.invoke_arn
}

resource "aws_lambda_permission" "join_room_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = module.join_room_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn = "${aws_apigatewayv2_api.over_under.execution_arn}/*/${module.join_room_route.route.route_key}"
}