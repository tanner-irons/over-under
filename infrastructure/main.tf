terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.4.0"
    }
  }

  backend "s3" {
    bucket  = "over-under-terraform-state"
    key     = "terraform.tfstate"
    profile = "tfuser"
  }
}