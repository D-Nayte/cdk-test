# Step-by-Step Guide to Using My GitHub Repo

This guide will walk you through the steps to set up and use my GitHub repository. It contains code for deploying AWS infrastructure using AWS CDK and running a Dockerized application. Follow the steps below to get started:

## Prerequisites

1. Set up an AWS account and create security credentials for that account.
2. Download the AWS CLI for Windows and configure it to use the credentials.

## Installation

1. Install TypeScript globally by running the following command:
   npm install -g typescript

arduino
Copy code

2. Install AWS CDK globally using the following command:
   npm install -g aws-cdk-lib

csharp
Copy code

## Setup AWS CDK Project

1. Initialize a new AWS CDK project in your desired directory using JavaScript as the language:
   cdk init app --language javascript

arduino
Copy code

2. Generate and synthesize the CloudFormation template for your AWS CDK app:
   cdk synth

sql
Copy code

3. Bootstrap the AWS environment (only once per AWS account per region) to prepare it for deploying CDK stacks:
   cdk bootstrap

bash
Copy code

## Deploy AWS Infrastructure

1. Deploy your AWS infrastructure using the following command:
   cdk deploy

sql
Copy code

2. If you want to check the differences between your current AWS infrastructure and what will be deployed, use the following command:
   cdk diff

markdown
Copy code

## Docker Setup and Deployment

1. Add Docker credentials to the `.env` file inside the `aws_infra` folder.

2. Run the Docker container, mapping port 3000 of the container to port 80 on your machine:
   docker run -p 80:3000 IMAGE

vbnet
Copy code

3. To verify if Docker is running on the EC2 instance, execute the following command:
   sudo systemctl is-active docker

csharp
Copy code

4. Check if CodeDeploy agent is running on the EC2 instance using the following command:
   sudo service codedeploy-agent status

markdown
Copy code

5. Ensure that the `aws_infra` (or your infrastructure folder) is added to the `.dockerignore` file to avoid unnecessary files being included in the Docker image.

## Cleanup

If you want to remove the deployed stacks and cleanup resources:

1. Delete the CDK stacks:
   cdk destroy

vbnet
Copy code

2. Remove the Docker container when you no longer need it.

By following these steps, you will be able to use my GitHub repository effectively and deploy AWS infrastructure along with a Dockerized application. If you have any questions or issues, feel free to refer to the repository's documentation or contact me for support. Happy coding!
