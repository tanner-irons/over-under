variable "function_name" {
  description = "The name of the lambda function"
  type        = string
}

variable "source_dir" {
  description = "The source directory of the lambda function"
  type        = string
}

data "aws_iam_policy_document" "lambda" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy" "dynamo" {
  name = "over-under-dynamo"
}

data "aws_iam_policy" "manage_connections" {
  name = "over-under-manage-connections"
}

data "aws_iam_policy" "execution" {
  name = "AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role" "lambda_role" {
  name               = "${var.function_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda.json
  managed_policy_arns = [
    data.aws_iam_policy.dynamo.arn,
    data.aws_iam_policy.manage_connections.arn,
    data.aws_iam_policy.execution.arn,
  ]
}

data "archive_file" "lambda_zip" {
  type = "zip"

  source_dir  = var.source_dir
  output_path = "${path.root}/artifacts/${var.function_name}.zip"
}

resource "aws_lambda_function" "lambda" {
  filename         = "${path.root}/artifacts/${var.function_name}.zip"
  function_name    = var.function_name
  role             = aws_iam_role.lambda_role.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  runtime          = "nodejs12.x"
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
}

output "function_name" {
  value = aws_lambda_function.lambda.function_name
}

output "invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}