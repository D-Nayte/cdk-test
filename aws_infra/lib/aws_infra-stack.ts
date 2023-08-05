//  this file manages the aws sources using the aws-cdk-lib
import * as cdk from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class AwsInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create a new vpc with a public subnet
    const vpc = new cdk.aws_ec2.Vpc(this, 'VPC', {
      maxAzs: 1,
      subnetConfiguration: [
        {
          name: 'Public',
          subnetType: cdk.aws_ec2.SubnetType.PUBLIC,
        },
      ],
    });

    // crate an security group that allows all traffic in and out and ssh on port 22
    const securityGroup = new cdk.aws_ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });

    securityGroup.addIngressRule(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.tcp(80),
      'allow http access from anywhere'
    );
    securityGroup.addIngressRule(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.tcp(443),
      'allow https access from anywhere'
    );
    securityGroup.addIngressRule(
      cdk.aws_ec2.Peer.anyIpv4(),
      cdk.aws_ec2.Port.tcp(22),
      'allow ssh access from anywhere'
    );

    // create a userData script that installs codeDeploy agent and docker on ec2 instance launch
    const script = cdk.aws_ec2.UserData.custom(`
      #!/bin/bash
      $ sudo yum update -y
      $ sudo yum install ruby -y
      $ sudo yum install wget -y
      $ cd /home/ec2-user
      $ wget https://aws-codedeploy-eu-central-1.s3.eu-central-1.amazonaws.com/latest/install
      $ chmod +x ./install
      $ sudo ./install auto
      $ sudo service codedeploy-agent start
      $ sudo amazon-linux-extras install docker -y
      $ sudo service docker start
      $ sudo usermod -a -G docker ec2-user
    `);

    //  create an ec2 instance that runs in the public subnet and add inbound rules to allow traffic from port 80
    // the ec2 instance must run any Amazon Linux 2 AMI
    const ec2Instance = new cdk.aws_ec2.Instance(this, 'Instance', {
      vpc,
      instanceType: new cdk.aws_ec2.InstanceType('t2.micro'),
      machineImage: cdk.aws_ec2.MachineImage.latestAmazonLinux2(),
      securityGroup: securityGroup,
      userData: script,
    });

    // create an s3 bucket that can be used by codepipeline
    const s3Bucket = new cdk.aws_s3.Bucket(this, 'S3Bucket', {
      bucketName: 'my-first-bucket',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // create a gitHubRepo variable that contains the url of the gitHub repo
    const gitHubRepo = 'https://github.com/D-Nayte/man-makes-monsters';

    // create a CICD pipleline that uses the "gitHubRepo" as source and the "s3Bucket" as artifact store and deploy to the "ec2Instance"
    const pipeline = new cdk.aws_codepipeline.Pipeline(this, 'Pipeline', {
      pipelineName: 'MyFirstPipeline',
      restartExecutionOnUpdate: true,
      artifactBucket: s3Bucket,
    });
  }
}
