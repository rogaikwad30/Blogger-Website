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
exports.FargateDemoStack = void 0;
const cdk = __importStar(require("aws-cdk-lib"));
const aws_ec2_1 = require("aws-cdk-lib/aws-ec2");
const ecs = __importStar(require("aws-cdk-lib/aws-ecs"));
const ecs_patterns = __importStar(require("aws-cdk-lib/aws-ecs-patterns"));
const aws_cdk_lib_1 = require("aws-cdk-lib");
class FargateDemoStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // VPC
        const vpc = new aws_ec2_1.Vpc(this, 'VPC', {
            maxAzs: 2,
            natGateways: 1,
        });
        // Fargate cluster
        const cluster = new ecs.Cluster(this, 'Cluster', {
            vpc: vpc,
        });
        // Fargate service
        const backendService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'backendService', {
            cluster: cluster,
            memoryLimitMiB: 1024,
            cpu: 512,
            desiredCount: 2,
            taskImageOptions: {
                image: ecs.ContainerImage.fromAsset('./backend/'),
                environment: {
                    myVar: 'variable01',
                },
            },
        });
        // Health check
        backendService.targetGroup.configureHealthCheck({ path: '/health' });
        // Load balancer url
        new aws_cdk_lib_1.CfnOutput(this, 'loadBalancerUrl', {
            value: backendService.loadBalancer.loadBalancerDnsName,
            exportName: 'loadBalancerUrl',
        });
    }
}
exports.FargateDemoStack = FargateDemoStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFnYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFnYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQW1DO0FBQ25DLGlEQUEwQztBQUMxQyx5REFBMkM7QUFDM0MsMkVBQTZEO0FBQzdELDZDQUF3QztBQUd4QyxNQUFhLGdCQUFpQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDOUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDL0IsTUFBTSxFQUFFLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUMvQyxHQUFHLEVBQUUsR0FBRztTQUNULENBQUMsQ0FBQztRQUVILGtCQUFrQjtRQUNsQixNQUFNLGNBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxxQ0FBcUMsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDcEcsT0FBTyxFQUFFLE9BQU87WUFDaEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsR0FBRyxFQUFFLEdBQUc7WUFDUixZQUFZLEVBQUUsQ0FBQztZQUNmLGdCQUFnQixFQUFFO2dCQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDO2dCQUNqRCxXQUFXLEVBQUU7b0JBQ1gsS0FBSyxFQUFFLFlBQVk7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFHSCxlQUFlO1FBRWYsY0FBYyxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLG9CQUFvQjtRQUNwQixJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3JDLEtBQUssRUFBRSxjQUFjLENBQUMsWUFBWSxDQUFDLG1CQUFtQjtZQUN0RCxVQUFVLEVBQUUsaUJBQWlCO1NBQzlCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQXhDRCw0Q0F3Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xyXG5pbXBvcnQgeyBWcGMgfSBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZWMyJztcclxuaW1wb3J0ICogYXMgZWNzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3MnO1xyXG5pbXBvcnQgKiBhcyBlY3NfcGF0dGVybnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjcy1wYXR0ZXJucyc7XHJcbmltcG9ydCB7IENmbk91dHB1dCB9IGZyb20gJ2F3cy1jZGstbGliJztcclxuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XHJcblxyXG5leHBvcnQgY2xhc3MgRmFyZ2F0ZURlbW9TdGFjayBleHRlbmRzIGNkay5TdGFjayB7XHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xyXG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XHJcblxyXG4gICAgLy8gVlBDXHJcbiAgICBjb25zdCB2cGMgPSBuZXcgVnBjKHRoaXMsICdWUEMnLCB7XHJcbiAgICAgIG1heEF6czogMixcclxuICAgICAgbmF0R2F0ZXdheXM6IDEsXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBGYXJnYXRlIGNsdXN0ZXJcclxuICAgIGNvbnN0IGNsdXN0ZXIgPSBuZXcgZWNzLkNsdXN0ZXIodGhpcywgJ0NsdXN0ZXInLCB7XHJcbiAgICAgIHZwYzogdnBjLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gRmFyZ2F0ZSBzZXJ2aWNlXHJcbiAgICBjb25zdCBiYWNrZW5kU2VydmljZSA9IG5ldyBlY3NfcGF0dGVybnMuQXBwbGljYXRpb25Mb2FkQmFsYW5jZWRGYXJnYXRlU2VydmljZSh0aGlzLCAnYmFja2VuZFNlcnZpY2UnLCB7XHJcbiAgICAgIGNsdXN0ZXI6IGNsdXN0ZXIsXHJcbiAgICAgIG1lbW9yeUxpbWl0TWlCOiAxMDI0LFxyXG4gICAgICBjcHU6IDUxMixcclxuICAgICAgZGVzaXJlZENvdW50OiAyLFxyXG4gICAgICB0YXNrSW1hZ2VPcHRpb25zOiB7XHJcbiAgICAgICAgaW1hZ2U6IGVjcy5Db250YWluZXJJbWFnZS5mcm9tQXNzZXQoJy4vYmFja2VuZC8nKSxcclxuICAgICAgICBlbnZpcm9ubWVudDoge1xyXG4gICAgICAgICAgbXlWYXI6ICd2YXJpYWJsZTAxJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgICBcclxuXHJcbiAgICAvLyBIZWFsdGggY2hlY2tcclxuICAgIFxyXG4gICAgYmFja2VuZFNlcnZpY2UudGFyZ2V0R3JvdXAuY29uZmlndXJlSGVhbHRoQ2hlY2soeyBwYXRoOiAnL2hlYWx0aCcgfSk7XHJcblxyXG4gICAgLy8gTG9hZCBiYWxhbmNlciB1cmxcclxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgJ2xvYWRCYWxhbmNlclVybCcsIHtcclxuICAgICAgdmFsdWU6IGJhY2tlbmRTZXJ2aWNlLmxvYWRCYWxhbmNlci5sb2FkQmFsYW5jZXJEbnNOYW1lLFxyXG4gICAgICBleHBvcnROYW1lOiAnbG9hZEJhbGFuY2VyVXJsJyxcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=