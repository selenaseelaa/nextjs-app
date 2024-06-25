# Project CI/CD Documentation

# Overview
This project demonstrates setting up a CI/CD pipeline for a Next.js application using AWS EC2, Docker, and Terraform.

# Getting Started 

## Installation

- Clone the Project
- Clone the repository to your local machine:

```bash
git clone <repository-url>
cd <project-directory>
```

### Install dependencies
```
npm install
```

### Copy env file
```
cp .env.example .env
```

## Run Locally
To run the project locallt just start the development server using this command:
```
npm run dev
```
## Deploying to AWS EC2
Can be done with 2 ways: using workflow and manually
### Prerequisites
Before starting, ensure you have an AWS account with appropriate IAM credentials, Docker installed, and Terraform set up.

## Using CI/CD Workflow
You can deploy the project by pushing changes to your GitHub repository:
Push your changes:
```
git add .
git commit -m "commit"
git push origin yourbranchname
```
Monitor the CI/CD workflow on GitHub Actions. Upon success, a new Docker container and EC2 instance should be created.

## Manual Deployment

###Setup Instructions
1. Create an EC2 Instance
- Launch a new EC2 instance via the AWS Management Console.
- Choose an instance type and configure the security group to allow inbound -traffic on port 22 (SSH) and port 3000 (TCP).

2. Configure Docker
- SSH into your EC2 instance:
```
ssh -i "ec2-key.pem" ubuntu@<ec2-public-dns>
```
- Install Docker on your EC2 instance:
```
sudo apt-get update
sudo apt-get install docker.io
```
- Start and enable Docker service:
```
sudo systemctl start docker
sudo systemctl enable docker
```
- Pull the Docker image from your Docker Hub repository:
```
docker pull <docker-image-name>
```

3. Set up Terraform
- Install Terraform on your local machine or CI/CD server. For example, on Ubuntu:
```
sudo apt-get update
sudo apt-get install unzip
wget https://releases.hashicorp.com/terraform/1.0.0/terraform_1.0.0_linux_amd64.zip
unzip terraform_1.0.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
```
- Initialize Terraform and apply the configuration:
```
terraform init
terraform plan
terraform apply -auto-approve
```

4. Configure AWS EC2

- Configure the instance with necessary environment variables or configuration files.
- Ensure security groups, key pairs, and IAM roles are correctly set up for your application.

5. Set Environment Variables
- SSH into your EC2 instance:
```
ssh -i "ec2-key.pem" ubuntu@<ec2-public-dns>
```
- Set environment variables required for your Next.js application. Example:
```
export MONGO_PASSWORD=<mongo-password>
export SITE_URL=<site-url>
```

6. Deploy
- Build the Next.js application:
```
npm run build
```

- Test the application:
```
npm test
```

- Run the Docker container on your EC2 instance::
```
docker run -d -p 3000:3000 --name nextjs-app <docker-image-name>
```

7. Access Yout Appliaction
- Open a web browser and navigate to <ec2-public-ip>:3000 to access your deployed Next.js application.

```
Make sure to replace <repository-url>, <project-directory>, <docker-image-name>, <mongo-password>, <site-url>, <ec2-key.pem>, <ec2-public-dns>, and <ec2-public-ip> with appropriate values for your project. Following these steps will manually deploy your Next.js application on AWS EC2 using Docker and Terraform.
```

###For further information or documentation about this project visit link below:
https://github.com/users/selenaseelaa/projects/5
