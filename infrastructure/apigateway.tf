resource "aws_apigatewayv2_api" "over_under" {
  name                       = "OverUnder"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.route"
}

resource "aws_apigatewayv2_deployment" "over_under" {
  api_id = aws_apigatewayv2_api.over_under.id
  description = "OverUnder API Deployment"

  triggers = {
    redeployment = sha1(join(",", tolist([
      jsonencode(module.connect_route.route),
      jsonencode(module.connect_route.integration),
      jsonencode(module.disconnect_route.route),
      jsonencode(module.disconnect_route.integration),
      jsonencode(module.dispatch_route.route),
      jsonencode(module.dispatch_route.integration),
      jsonencode(module.join_room_route.route),
      jsonencode(module.join_room_route.integration)
    ])))
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_apigatewayv2_stage" "over_under" {
  deployment_id = aws_apigatewayv2_deployment.over_under.id
  api_id   = aws_apigatewayv2_api.over_under.id
  name    = "dev"
}

output "socket_endpoint" {
  value = aws_apigatewayv2_api.over_under.api_endpoint
} 