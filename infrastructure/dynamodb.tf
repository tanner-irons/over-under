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