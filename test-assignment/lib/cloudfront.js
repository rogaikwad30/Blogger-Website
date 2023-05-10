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
exports.CloudfrontDemoStack = exports.DeploymentService = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const constructs_1 = require("constructs");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const aws_cloudfront_origins_1 = require("aws-cdk-lib/aws-cloudfront-origins");
const aws_s3_1 = require("aws-cdk-lib/aws-s3");
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
const path = './frontend/build';
class DeploymentService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const hostingBucket = new aws_s3_1.Bucket(this, 'FrontendBucket', {
            autoDeleteObjects: true,
            blockPublicAccess: aws_s3_1.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        const distribution = new aws_cloudfront_1.Distribution(this, 'CloudfrontDistribution', {
            defaultBehavior: {
                origin: new aws_cloudfront_origins_1.S3Origin(hostingBucket),
                viewerProtocolPolicy: aws_cloudfront_1.ViewerProtocolPolicy.ALLOW_ALL,
            },
            defaultRootObject: 'index.html',
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: '/index.html',
                },
            ],
        });
        new aws_s3_deployment_1.BucketDeployment(this, 'BucketDeployment', {
            sources: [aws_s3_deployment_1.Source.asset(path)],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ['/*'],
        });
        new aws_cdk_lib_1.CfnOutput(this, 'CloudFrontURL', {
            value: distribution.domainName,
            description: 'The distribution URL',
            exportName: 'CloudfrontURL',
        });
        new aws_cdk_lib_1.CfnOutput(this, 'BucketName', {
            value: hostingBucket.bucketName,
            description: 'The name of the S3 bucket',
            exportName: 'BucketName',
        });
    }
}
exports.DeploymentService = DeploymentService;
class CloudfrontDemoStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        new DeploymentService(this, 'deployment');
    }
}
exports.CloudfrontDemoStack = CloudfrontDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWRmcm9udC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsb3VkZnJvbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpREFBa0M7QUFDbEMsMkNBQXNDO0FBRXRDLDZDQUFzRDtBQUN0RCwrREFBK0U7QUFDL0UsK0VBQTZEO0FBQzdELCtDQUE4RDtBQUM5RCxxRUFBd0U7QUFFeEUsTUFBTSxJQUFJLEdBQUcsa0JBQWtCLENBQUE7QUFFL0IsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWhCLE1BQU0sYUFBYSxHQUFHLElBQUksZUFBTSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNyRCxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGlCQUFpQixFQUFFLDBCQUFpQixDQUFDLFNBQVM7WUFDOUMsYUFBYSxFQUFFLDJCQUFhLENBQUMsT0FBTztTQUN2QyxDQUFDLENBQUE7UUFFRixNQUFNLFlBQVksR0FBRyxJQUFJLDZCQUFZLENBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFFO1lBQ2xFLGVBQWUsRUFBRTtnQkFDYixNQUFNLEVBQUUsSUFBSSxpQ0FBUSxDQUFDLGFBQWEsQ0FBQztnQkFDbkMsb0JBQW9CLEVBQUUscUNBQW9CLENBQUMsU0FBUzthQUN2RDtZQUNELGlCQUFpQixFQUFFLFlBQVk7WUFDL0IsY0FBYyxFQUFFO2dCQUNaO29CQUNJLFVBQVUsRUFBRSxHQUFHO29CQUNmLGtCQUFrQixFQUFFLEdBQUc7b0JBQ3ZCLGdCQUFnQixFQUFFLGFBQWE7aUJBQ2xDO2FBQ0o7U0FDSixDQUFDLENBQUE7UUFFRixJQUFJLG9DQUFnQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtZQUMzQyxPQUFPLEVBQUUsQ0FBQywwQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QixpQkFBaUIsRUFBRSxhQUFhO1lBQ2hDLFlBQVk7WUFDWixpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQztTQUM1QixDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNqQyxLQUFLLEVBQUUsWUFBWSxDQUFDLFVBQVU7WUFDOUIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxVQUFVLEVBQUUsZUFBZTtTQUM5QixDQUFDLENBQUE7UUFFRixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUM5QixLQUFLLEVBQUUsYUFBYSxDQUFDLFVBQVU7WUFDL0IsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxVQUFVLEVBQUUsWUFBWTtTQUMzQixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0o7QUE1Q0QsOENBNENDO0FBRUQsTUFBYSxtQkFBb0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUM5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBRXZCLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0lBQzdDLENBQUM7Q0FDSjtBQU5ELGtEQU1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJ1xyXG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJ1xyXG5cclxuaW1wb3J0IHsgQ2ZuT3V0cHV0LCBSZW1vdmFsUG9saWN5IH0gZnJvbSAnYXdzLWNkay1saWInXHJcbmltcG9ydCB7IERpc3RyaWJ1dGlvbiwgVmlld2VyUHJvdG9jb2xQb2xpY3kgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udCdcclxuaW1wb3J0IHsgUzNPcmlnaW4gfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udC1vcmlnaW5zJ1xyXG5pbXBvcnQgeyBCbG9ja1B1YmxpY0FjY2VzcywgQnVja2V0IH0gZnJvbSAnYXdzLWNkay1saWIvYXdzLXMzJ1xyXG5pbXBvcnQgeyBCdWNrZXREZXBsb3ltZW50LCBTb3VyY2UgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMtZGVwbG95bWVudCdcclxuXHJcbmNvbnN0IHBhdGggPSAnLi9mcm9udGVuZC9idWlsZCdcclxuXHJcbmV4cG9ydCBjbGFzcyBEZXBsb3ltZW50U2VydmljZSBleHRlbmRzIENvbnN0cnVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkKVxyXG5cclxuICAgICAgICBjb25zdCBob3N0aW5nQnVja2V0ID0gbmV3IEJ1Y2tldCh0aGlzLCAnRnJvbnRlbmRCdWNrZXQnLCB7XHJcbiAgICAgICAgICAgIGF1dG9EZWxldGVPYmplY3RzOiB0cnVlLFxyXG4gICAgICAgICAgICBibG9ja1B1YmxpY0FjY2VzczogQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUxMLFxyXG4gICAgICAgICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IERpc3RyaWJ1dGlvbih0aGlzLCAnQ2xvdWRmcm9udERpc3RyaWJ1dGlvbicsIHtcclxuICAgICAgICAgICAgZGVmYXVsdEJlaGF2aW9yOiB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBTM09yaWdpbihob3N0aW5nQnVja2V0KSxcclxuICAgICAgICAgICAgICAgIHZpZXdlclByb3RvY29sUG9saWN5OiBWaWV3ZXJQcm90b2NvbFBvbGljeS5BTExPV19BTEwsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRlZmF1bHRSb290T2JqZWN0OiAnaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgIGVycm9yUmVzcG9uc2VzOiBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHR0cFN0YXR1czogNDA0LFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlSHR0cFN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlUGFnZVBhdGg6ICcvaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIG5ldyBCdWNrZXREZXBsb3ltZW50KHRoaXMsICdCdWNrZXREZXBsb3ltZW50Jywge1xyXG4gICAgICAgICAgICBzb3VyY2VzOiBbU291cmNlLmFzc2V0KHBhdGgpXSxcclxuICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IGhvc3RpbmdCdWNrZXQsXHJcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvbixcclxuICAgICAgICAgICAgZGlzdHJpYnV0aW9uUGF0aHM6IFsnLyonXSxcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsICdDbG91ZEZyb250VVJMJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogZGlzdHJpYnV0aW9uLmRvbWFpbk5hbWUsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIGRpc3RyaWJ1dGlvbiBVUkwnLFxyXG4gICAgICAgICAgICBleHBvcnROYW1lOiAnQ2xvdWRmcm9udFVSTCcsXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLCAnQnVja2V0TmFtZScsIHtcclxuICAgICAgICAgICAgdmFsdWU6IGhvc3RpbmdCdWNrZXQuYnVja2V0TmFtZSxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgbmFtZSBvZiB0aGUgUzMgYnVja2V0JyxcclxuICAgICAgICAgICAgZXhwb3J0TmFtZTogJ0J1Y2tldE5hbWUnLFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDbG91ZGZyb250RGVtb1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcclxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcclxuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKVxyXG5cclxuICAgICAgICBuZXcgRGVwbG95bWVudFNlcnZpY2UodGhpcywgJ2RlcGxveW1lbnQnKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==