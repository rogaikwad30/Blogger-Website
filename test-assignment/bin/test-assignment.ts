#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
// import { TestAssignmentStack } from '../lib/test-assignment-stack';
import { FargateDemoStack } from "../lib/fagate";
import { CloudfrontDemoStack } from "../lib/cloudfront";
import * as path from 'path';
const app = new cdk.App();

// Fargate stack
new FargateDemoStack(app, "FargateDemoStack1", {
  env: { account: "171825851176", region: "us-west-1" },
});

// Cloudfront stack
new CloudfrontDemoStack(app, "CloudfrontDemoStack1", {
  // stage: "dev",
  env: { account: "171825851176", region: "us-west-1" },
  // path: path.join(__dirname + "./frontend")
});
