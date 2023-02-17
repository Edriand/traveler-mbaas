#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TablesStack } from '../lib/dynamodb-stack';
import { Table } from '../interfaces/table.interface';
import { LambdaFunction } from '../interfaces/lambda.interface';
import {LambdasStack} from '../lib/lambda-stack';

const app = new cdk.App();

const tables: Table[] = [
    {name: 'city-person', pk: 'city', sk: 'person'}
];

const lambdas: LambdaFunction[] = [
    {name: 'getRandomPerson'}
];

new TablesStack(app, 'TablesStack', tables, {});
new LambdasStack(app, 'LambdasStack', lambdas, {});
