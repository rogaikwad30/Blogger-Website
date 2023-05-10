import * as cdk from "aws-cdk-lib";
import * as sns from "aws-cdk-lib/aws-sns";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as eventsources from "aws-cdk-lib/aws-lambda-event-sources";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class AwsLambdaTaskStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const vpc = new ec2.Vpc(this, "MyVpc", {
      cidr: "10.0.0.0/16",
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: "public",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
        {
          name: "private",
          subnetType: ec2.SubnetType.PRIVATE_WITH_NAT,
          cidrMask: 24,
        },
      ],
    });
    // const snsTopic = new sns.Topic(this, "MyTopic");
    // const sqsQueue = new sqs.Queue(this, "MyQueue");
    const snsTopic = new sns.Topic(this, 'TestAssignmentSnsTopic', {
      displayName: 'SNS Test Assignment',
    });

    // Create SQS queue
    const sqsQueue = new sqs.Queue(this, 'TestAssignmentSqsQueue', {
      queueName: 'sqs-test-assignment',
    });


    // sqsQueue.grantSendMessages(new iam.ArnPrincipal(snsTopic.topicArn));
    const lambdaRole = new iam.Role(this, "MyLambdaRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies : [
        iam.ManagedPolicy.fromAwsManagedPolicyName(`service-role/AWSLambdaVPCAccessExecutionRole`),
      ],
    });

    // Add permissions for publishing to SNS topic
    const snsPolicy = new iam.PolicyStatement({
      actions: ['sns:Publish'],
      resources: [snsTopic.topicArn],
    });
    lambdaRole.addToPolicy(snsPolicy);

    // Add permissions for consuming messages from SQS queue
    const sqsPolicy = new iam.PolicyStatement({
      actions: ['sqs:ReceiveMessage', 'sqs:DeleteMessage'],
      resources: [sqsQueue.queueArn],
    });
    lambdaRole.addToPolicy(sqsPolicy);

    const ec2Policy = new iam.PolicyStatement({
      actions: ['ec2:CreateNetworkInterface'],
      resources: ['*'],
    });
    lambdaRole.addToPolicy(ec2Policy);


    // const policy = new iam.PolicyStatement({
    //   actions: ["*"],
    //   resources: [snsTopic.topicArn],
    // });
    // lambdaRole.addToPolicy(policy);
    
    // Add permissions for creating network interfaces in EC2
    // const ec2Policy = new iam.PolicyStatement({
    //   actions: ["ec2:CreateNetworkInterface"],
    //   resources: ["*"],
    // });
    // lambdaRole.addToPolicy(ec2Policy);

    // const describeNetworkInterfacesPolicy = new iam.PolicyStatement({
    //   actions: ["ec2:DescribeNetworkInterfaces"],
    //   resources: ["*"],
    // });
    // lambdaRole.addToPolicy(describeNetworkInterfacesPolicy);
    
    
    const lambdaFn = new lambda.Function(this, "MyLambdaFunction", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("lambda"),
      vpc: vpc,
      role: lambdaRole,
      environment: {
        DEPLOYMENT_TARGET: "test-assignment",
        EXPRESS_PORT: "8000"
      },
    });
    
    sqsQueue.grantConsumeMessages(lambdaFn);
    lambdaFn.addEventSource(new eventsources.SnsEventSource(snsTopic));
  }
}
