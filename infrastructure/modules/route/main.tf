variable "api_gateway_id" {
  description = "The id of the api gateway"
  type        = string
}

variable "lambda_invoke_arn" {
  description = "The invoke arn of the lambda function"
  type        = string
}

variable "route_name" {
  description = "The name of the route"
  type        = string
}

resource "aws_apigatewayv2_integration" "integration" {
  api_id                    = var.api_gateway_id
  integration_type          = "AWS_PROXY"
  integration_uri           = var.lambda_invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
  content_handling_strategy = "CONVERT_TO_TEXT"
}

resource "aws_apigatewayv2_route" "route" {
  api_id    = var.api_gateway_id
  route_key = var.route_name
  target    = "integrations/${aws_apigatewayv2_integration.integration.id}"
}

output "integration" {
  value = aws_apigatewayv2_integration.integration
}

output "route" {
  value = aws_apigatewayv2_route.route
}