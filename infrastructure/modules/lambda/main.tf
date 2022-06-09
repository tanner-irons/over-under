variable "function_name" {
  description = "The name of the lambda function"
  type        = string
}

variable "source_dir" {
  description = "The source directory of the lambda function"
  type        = string
}

variable "lambda_role_arn" {
  description = "The lambda role arn"
  type        = string
}

data "archive_file" "lambda_zip" {
  type = "zip"

  source_dir  = var.source_dir
  output_path = "${var.source_dir}/handler.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = "${var.source_dir}/handler.zip"
  function_name    = var.function_name
  role             = var.lambda_role_arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
}

output "invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}