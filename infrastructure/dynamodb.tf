resource "aws_dynamodb_table" "over_under_dynamodb_table" {
  name           = "OverUnder"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "connectionid"

  attribute {
    name = "connectionid"
    type = "S"
  }
}

resource "aws_iam_policy" "dynamo" {
  name = "over-under-dynamo"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        "Sid" : "OverUnderDynamoDB",
        "Effect" : "Allow",
        "Action" : [
          "dynamodb:BatchGetItem",
          "dynamodb:BatchWriteItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "dynamodb:Query",
          "dynamodb:UpdateItem"
        ],
        "Resource" : aws_dynamodb_table.over_under_dynamodb_table.arn
      }
    ]
  })
}
