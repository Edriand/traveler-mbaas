#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ApiStack } from '../lib/api-stack';
import { CognitoStack } from '../lib/cognito-stack';
import { TablesStack } from '../lib/dynamodb-stack';
import { Table } from '../interfaces/table.interface';
import { LambdaFunction, httpFuncts } from '../interfaces/lambda.interface';
import { Pool } from '../interfaces/pool.interface';

const app = new cdk.App();
let project = `${app.node.tryGetContext('ID')}-${app.node.tryGetContext('ENV')}`;

const tables: Table[] = [
    {name: `city-person`, pk: 'city', sk: 'person'}
];

const lambdas: LambdaFunction[] = [
    {name: 'getRandomPerson', funct: httpFuncts.GET, enviroments: {
        TABLE: tables[0].name,
        REGION: app.node.tryGetContext('REGION')
    }},
    {name: 'getRandomEvent', funct: httpFuncts.GET}
];

const pools: Pool[] = [
    {name: 'users'}
];

new TablesStack(app, 'TablesStack', tables, project, {});
new ApiStack(app, 'ApiStack', lambdas, project, {});
new CognitoStack(app, 'CognitoStack', pools, project, {});
