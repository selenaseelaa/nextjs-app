provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "nextjs-app" {
    name    = "launch-wizard-5"
    vpc_id  = "vpc-0a89c09fe1a3fd0fe"

    ingress {
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      from_port = 3000
      to_port   = 3000
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
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