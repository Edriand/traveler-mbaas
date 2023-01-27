#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TablesStack } from '../lib/dynamodb-stack';

const app = new cdk.App();

new TablesStack(app, 'TablesStack', {});
