provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "nextjs-app" {
  ami               = "ami-04b70fa74e45c3917"
  instance_type     = "t2.micro"
  vpc_security_group_ids = ["sg-01e75675a95dae3a9"]
  key_name          = "ec2-key"


  tags = {
    Name = "nextjs-app"
  }
}