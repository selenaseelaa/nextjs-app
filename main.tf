provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "nextjs-app" {
  ami               = "ami-04b70fa74e45c3917"
  instance_type     = "t2.micro"
  vpc_security_group_ids = ["vpc-0a89c09fe1a3fd0fe"]
  key_name          = "ec2-key"


  tags = {
    Name = "nextjs-app"
  }
}