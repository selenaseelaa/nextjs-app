terraform {
  backend "s3" {
    bucket = "pso-fp"
    key    = "pso-fp.tfstate"
    region = "us-east-1"
  }
}
