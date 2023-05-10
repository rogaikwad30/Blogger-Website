#!/usr/bin/env node
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
require("source-map-support/register");
const cdk = __importStar(require("aws-cdk-lib"));
// import { TestAssignmentStack } from '../lib/test-assignment-stack';
const fagate_1 = require("../lib/fagate");
const cloudfront_1 = require("../lib/cloudfront");
const lambda_1 = require("../lib/lambda");
const app = new cdk.App();
// Fargate stack
new fagate_1.FargateDemoStack(app, "FargateDemoStack1", {
    env: { account: "171825851176", region: "us-west-1" },
});
// Cloudfront stack
new cloudfront_1.CloudfrontDemoStack(app, "CloudfrontDemoStack1", {
    // stage: "dev",
    env: { account: "171825851176", region: "us-west-1" },
    // path: path.join(__dirname + "./frontend")
});
new lambda_1.AwsLambdaTaskStack(app, "AwsLambdaTaskStack", {
    // stage: "dev",
    env: { account: "171825851176", region: "us-west-1" },
    // path: path.join(__dirname + "./frontend")
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1hc3NpZ25tZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdC1hc3NpZ25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsdUNBQXFDO0FBQ3JDLGlEQUFtQztBQUNuQyxzRUFBc0U7QUFDdEUsMENBQWlEO0FBQ2pELGtEQUF3RDtBQUN4RCwwQ0FBbUQ7QUFHbkQsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFMUIsZ0JBQWdCO0FBQ2hCLElBQUkseUJBQWdCLENBQUMsR0FBRyxFQUFFLG1CQUFtQixFQUFFO0lBQzdDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtDQUN0RCxDQUFDLENBQUM7QUFFSCxtQkFBbUI7QUFDbkIsSUFBSSxnQ0FBbUIsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLEVBQUU7SUFDbkQsZ0JBQWdCO0lBQ2hCLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUNyRCw0Q0FBNEM7Q0FDN0MsQ0FBQyxDQUFDO0FBR0gsSUFBSSwyQkFBa0IsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLEVBQUU7SUFDaEQsZ0JBQWdCO0lBQ2hCLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRTtJQUNyRCw0Q0FBNEM7Q0FDN0MsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbi8vIGltcG9ydCB7IFRlc3RBc3NpZ25tZW50U3RhY2sgfSBmcm9tICcuLi9saWIvdGVzdC1hc3NpZ25tZW50LXN0YWNrJztcbmltcG9ydCB7IEZhcmdhdGVEZW1vU3RhY2sgfSBmcm9tIFwiLi4vbGliL2ZhZ2F0ZVwiO1xuaW1wb3J0IHsgQ2xvdWRmcm9udERlbW9TdGFjayB9IGZyb20gXCIuLi9saWIvY2xvdWRmcm9udFwiO1xuaW1wb3J0IHsgQXdzTGFtYmRhVGFza1N0YWNrIH0gZnJvbSAnLi4vbGliL2xhbWJkYSc7XG5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG4vLyBGYXJnYXRlIHN0YWNrXG5uZXcgRmFyZ2F0ZURlbW9TdGFjayhhcHAsIFwiRmFyZ2F0ZURlbW9TdGFjazFcIiwge1xuICBlbnY6IHsgYWNjb3VudDogXCIxNzE4MjU4NTExNzZcIiwgcmVnaW9uOiBcInVzLXdlc3QtMVwiIH0sXG59KTtcblxuLy8gQ2xvdWRmcm9udCBzdGFja1xubmV3IENsb3VkZnJvbnREZW1vU3RhY2soYXBwLCBcIkNsb3VkZnJvbnREZW1vU3RhY2sxXCIsIHtcbiAgLy8gc3RhZ2U6IFwiZGV2XCIsXG4gIGVudjogeyBhY2NvdW50OiBcIjE3MTgyNTg1MTE3NlwiLCByZWdpb246IFwidXMtd2VzdC0xXCIgfSxcbiAgLy8gcGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSArIFwiLi9mcm9udGVuZFwiKVxufSk7XG5cblxubmV3IEF3c0xhbWJkYVRhc2tTdGFjayhhcHAsIFwiQXdzTGFtYmRhVGFza1N0YWNrXCIsIHtcbiAgLy8gc3RhZ2U6IFwiZGV2XCIsXG4gIGVudjogeyBhY2NvdW50OiBcIjE3MTgyNTg1MTE3NlwiLCByZWdpb246IFwidXMtd2VzdC0xXCIgfSxcbiAgLy8gcGF0aDogcGF0aC5qb2luKF9fZGlybmFtZSArIFwiLi9mcm9udGVuZFwiKVxufSk7XG4iXX0=