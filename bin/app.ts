#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TablesStack } from '../lib/dynamodb-stack';
import { ApiStack } from '../lib/api-stack';
import { Table } from '../interfaces/table.interface';
import { LambdaFunction, httpFuncts } from '../interfaces/lambda.interface';

const app = new cdk.App();

const tables: Table[] = [
    {name: 'city-person', pk: 'city', sk: 'person'}
];

const lambdas: LambdaFunction[] = [
    {name: 'getRandomPerson', funct: httpFuncts.GET},
    {name: 'getRandomEvent', funct: httpFuncts.GET}
];

new TablesStack(app, 'TablesStack', tables, {});
new ApiStack(app, 'ApiStack', lambdas, {});
