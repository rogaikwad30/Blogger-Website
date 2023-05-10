"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsLambdaTaskStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const sns = __importStar(require("aws-cdk-lib/aws-sns"));
const sqs = __importStar(require("aws-cdk-lib/aws-sqs"));
const lambda = __importStar(require("aws-cdk-lib/aws-lambda"));
const eventsources = __importStar(require("aws-cdk-lib/aws-lambda-event-sources"));
const iam = __importStar(require("aws-cdk-lib/aws-iam"));
const ec2 = __importStar(require("aws-cdk-lib/aws-ec2"));
class AwsLambdaTaskStack extends cdk.Stack {
    constructor(scope, id, props) {
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
            managedPolicies: [
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
exports.AwsLambdaTaskStack = AwsLambdaTaskStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLHlEQUEyQztBQUMzQyx5REFBMkM7QUFDM0MsK0RBQWlEO0FBQ2pELG1GQUFxRTtBQUNyRSx5REFBMkM7QUFDM0MseURBQTJDO0FBRTNDLE1BQWEsa0JBQW1CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDL0MsWUFBWSxLQUFjLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ3JDLElBQUksRUFBRSxhQUFhO1lBQ25CLE1BQU0sRUFBRSxDQUFDO1lBQ1QsbUJBQW1CLEVBQUU7Z0JBQ25CO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0JBQ2pDLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2dCQUNEO29CQUNFLElBQUksRUFBRSxTQUFTO29CQUNmLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtvQkFDM0MsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUNILG1EQUFtRDtRQUNuRCxtREFBbUQ7UUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUM3RCxXQUFXLEVBQUUscUJBQXFCO1NBQ25DLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQzdELFNBQVMsRUFBRSxxQkFBcUI7U0FDakMsQ0FBQyxDQUFDO1FBR0gsdUVBQXVFO1FBQ3ZFLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFO1lBQ3BELFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztZQUMzRCxlQUFlLEVBQUc7Z0JBQ2hCLEdBQUcsQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsOENBQThDLENBQUM7YUFDM0Y7U0FDRixDQUFDLENBQUM7UUFFSCw4Q0FBOEM7UUFDOUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN4QixTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEMsd0RBQXdEO1FBQ3hELE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUN4QyxPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQztZQUNwRCxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO1NBQy9CLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO1lBQ3hDLE9BQU8sRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBR2xDLDJDQUEyQztRQUMzQyxvQkFBb0I7UUFDcEIsb0NBQW9DO1FBQ3BDLE1BQU07UUFDTixrQ0FBa0M7UUFFbEMseURBQXlEO1FBQ3pELDhDQUE4QztRQUM5Qyw2Q0FBNkM7UUFDN0Msc0JBQXNCO1FBQ3RCLE1BQU07UUFDTixxQ0FBcUM7UUFFckMsb0VBQW9FO1FBQ3BFLGdEQUFnRDtRQUNoRCxzQkFBc0I7UUFDdEIsTUFBTTtRQUNOLDJEQUEyRDtRQUczRCxNQUFNLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzdELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFBRTtnQkFDWCxpQkFBaUIsRUFBRSxpQkFBaUI7Z0JBQ3BDLFlBQVksRUFBRSxNQUFNO2FBQ3JCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNGO0FBL0ZELGdEQStGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcclxuaW1wb3J0ICogYXMgc25zIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc25zXCI7XHJcbmltcG9ydCAqIGFzIHNxcyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXNxc1wiO1xyXG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGFcIjtcclxuaW1wb3J0ICogYXMgZXZlbnRzb3VyY2VzIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLWV2ZW50LXNvdXJjZXNcIjtcclxuaW1wb3J0ICogYXMgaWFtIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtaWFtXCI7XHJcbmltcG9ydCAqIGFzIGVjMiBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWVjMlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEF3c0xhbWJkYVRhc2tTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xyXG4gICAgY29uc3QgdnBjID0gbmV3IGVjMi5WcGModGhpcywgXCJNeVZwY1wiLCB7XHJcbiAgICAgIGNpZHI6IFwiMTAuMC4wLjAvMTZcIixcclxuICAgICAgbWF4QXpzOiAyLFxyXG4gICAgICBzdWJuZXRDb25maWd1cmF0aW9uOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJwdWJsaWNcIixcclxuICAgICAgICAgIHN1Ym5ldFR5cGU6IGVjMi5TdWJuZXRUeXBlLlBVQkxJQyxcclxuICAgICAgICAgIGNpZHJNYXNrOiAyNCxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwicHJpdmF0ZVwiLFxyXG4gICAgICAgICAgc3VibmV0VHlwZTogZWMyLlN1Ym5ldFR5cGUuUFJJVkFURV9XSVRIX05BVCxcclxuICAgICAgICAgIGNpZHJNYXNrOiAyNCxcclxuICAgICAgICB9LFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcbiAgICAvLyBjb25zdCBzbnNUb3BpYyA9IG5ldyBzbnMuVG9waWModGhpcywgXCJNeVRvcGljXCIpO1xyXG4gICAgLy8gY29uc3Qgc3FzUXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsIFwiTXlRdWV1ZVwiKTtcclxuICAgIGNvbnN0IHNuc1RvcGljID0gbmV3IHNucy5Ub3BpYyh0aGlzLCAnVGVzdEFzc2lnbm1lbnRTbnNUb3BpYycsIHtcclxuICAgICAgZGlzcGxheU5hbWU6ICdTTlMgVGVzdCBBc3NpZ25tZW50JyxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENyZWF0ZSBTUVMgcXVldWVcclxuICAgIGNvbnN0IHNxc1F1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnVGVzdEFzc2lnbm1lbnRTcXNRdWV1ZScsIHtcclxuICAgICAgcXVldWVOYW1lOiAnc3FzLXRlc3QtYXNzaWdubWVudCcsXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gc3FzUXVldWUuZ3JhbnRTZW5kTWVzc2FnZXMobmV3IGlhbS5Bcm5QcmluY2lwYWwoc25zVG9waWMudG9waWNBcm4pKTtcclxuICAgIGNvbnN0IGxhbWJkYVJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgXCJNeUxhbWJkYVJvbGVcIiwge1xyXG4gICAgICBhc3N1bWVkQnk6IG5ldyBpYW0uU2VydmljZVByaW5jaXBhbChcImxhbWJkYS5hbWF6b25hd3MuY29tXCIpLFxyXG4gICAgICBtYW5hZ2VkUG9saWNpZXMgOiBbXHJcbiAgICAgICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKGBzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhVlBDQWNjZXNzRXhlY3V0aW9uUm9sZWApLFxyXG4gICAgICBdLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIHBlcm1pc3Npb25zIGZvciBwdWJsaXNoaW5nIHRvIFNOUyB0b3BpY1xyXG4gICAgY29uc3Qgc25zUG9saWN5ID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgICBhY3Rpb25zOiBbJ3NuczpQdWJsaXNoJ10sXHJcbiAgICAgIHJlc291cmNlczogW3Nuc1RvcGljLnRvcGljQXJuXSxcclxuICAgIH0pO1xyXG4gICAgbGFtYmRhUm9sZS5hZGRUb1BvbGljeShzbnNQb2xpY3kpO1xyXG5cclxuICAgIC8vIEFkZCBwZXJtaXNzaW9ucyBmb3IgY29uc3VtaW5nIG1lc3NhZ2VzIGZyb20gU1FTIHF1ZXVlXHJcbiAgICBjb25zdCBzcXNQb2xpY3kgPSBuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XHJcbiAgICAgIGFjdGlvbnM6IFsnc3FzOlJlY2VpdmVNZXNzYWdlJywgJ3NxczpEZWxldGVNZXNzYWdlJ10sXHJcbiAgICAgIHJlc291cmNlczogW3Nxc1F1ZXVlLnF1ZXVlQXJuXSxcclxuICAgIH0pO1xyXG4gICAgbGFtYmRhUm9sZS5hZGRUb1BvbGljeShzcXNQb2xpY3kpO1xyXG5cclxuICAgIGNvbnN0IGVjMlBvbGljeSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcclxuICAgICAgYWN0aW9uczogWydlYzI6Q3JlYXRlTmV0d29ya0ludGVyZmFjZSddLFxyXG4gICAgICByZXNvdXJjZXM6IFsnKiddLFxyXG4gICAgfSk7XHJcbiAgICBsYW1iZGFSb2xlLmFkZFRvUG9saWN5KGVjMlBvbGljeSk7XHJcblxyXG5cclxuICAgIC8vIGNvbnN0IHBvbGljeSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcclxuICAgIC8vICAgYWN0aW9uczogW1wiKlwiXSxcclxuICAgIC8vICAgcmVzb3VyY2VzOiBbc25zVG9waWMudG9waWNBcm5dLFxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBsYW1iZGFSb2xlLmFkZFRvUG9saWN5KHBvbGljeSk7XHJcbiAgICBcclxuICAgIC8vIEFkZCBwZXJtaXNzaW9ucyBmb3IgY3JlYXRpbmcgbmV0d29yayBpbnRlcmZhY2VzIGluIEVDMlxyXG4gICAgLy8gY29uc3QgZWMyUG9saWN5ID0gbmV3IGlhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xyXG4gICAgLy8gICBhY3Rpb25zOiBbXCJlYzI6Q3JlYXRlTmV0d29ya0ludGVyZmFjZVwiXSxcclxuICAgIC8vICAgcmVzb3VyY2VzOiBbXCIqXCJdLFxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyBsYW1iZGFSb2xlLmFkZFRvUG9saWN5KGVjMlBvbGljeSk7XHJcblxyXG4gICAgLy8gY29uc3QgZGVzY3JpYmVOZXR3b3JrSW50ZXJmYWNlc1BvbGljeSA9IG5ldyBpYW0uUG9saWN5U3RhdGVtZW50KHtcclxuICAgIC8vICAgYWN0aW9uczogW1wiZWMyOkRlc2NyaWJlTmV0d29ya0ludGVyZmFjZXNcIl0sXHJcbiAgICAvLyAgIHJlc291cmNlczogW1wiKlwiXSxcclxuICAgIC8vIH0pO1xyXG4gICAgLy8gbGFtYmRhUm9sZS5hZGRUb1BvbGljeShkZXNjcmliZU5ldHdvcmtJbnRlcmZhY2VzUG9saWN5KTtcclxuICAgIFxyXG4gICAgXHJcbiAgICBjb25zdCBsYW1iZGFGbiA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJNeUxhbWJkYUZ1bmN0aW9uXCIsIHtcclxuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1gsXHJcbiAgICAgIGhhbmRsZXI6IFwiaW5kZXguaGFuZGxlclwiLFxyXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksXHJcbiAgICAgIHZwYzogdnBjLFxyXG4gICAgICByb2xlOiBsYW1iZGFSb2xlLFxyXG4gICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgIERFUExPWU1FTlRfVEFSR0VUOiBcInRlc3QtYXNzaWdubWVudFwiLFxyXG4gICAgICAgIEVYUFJFU1NfUE9SVDogXCI4MDAwXCJcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICBzcXNRdWV1ZS5ncmFudENvbnN1bWVNZXNzYWdlcyhsYW1iZGFGbik7XHJcbiAgICBsYW1iZGFGbi5hZGRFdmVudFNvdXJjZShuZXcgZXZlbnRzb3VyY2VzLlNuc0V2ZW50U291cmNlKHNuc1RvcGljKSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==