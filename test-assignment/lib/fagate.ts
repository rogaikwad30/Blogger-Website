import * as cdk from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class FargateDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new Vpc(this, 'VPC', {
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
    new CfnOutput(this, 'loadBalancerUrl', {
      value: backendService.loadBalancer.loadBalancerDnsName,
      exportName: 'loadBalancerUrl',
    });
  }
}
