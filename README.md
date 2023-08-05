$ sudo yum update -y
$ sudo amazon-linux-extras install docker
$ sudo service docker start
$ sudo usermod -a -G docker ec2-user

setup AWS account, create security credntials on that account, downlaod aws für windows and setup the software to use the credentials

npm install -g typescript

npm install -g aws-cdk-lib (install cdk globally)

cdk init app --language javascript

cdk synth

cdk bootstrap (ones per account per region)

cdk deploy

cdk diff (diffrenz in recources)

cdk destroy (delete stacks)

docker login -u USERNAME -p 'PASSWORD'

docker run -p 80:3000 IMAGE
