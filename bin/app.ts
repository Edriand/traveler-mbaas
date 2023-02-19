#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TablesStack } from '../lib/dynamodb-stack';
import { ApiStack } from '../lib/api-stack';
import { Table } from '../interfaces/table.interface';
import { LambdaFunction, httpFuncts } from '../interfaces/lambda.interface';

const app = new cdk.App();
let project = `${app.node.tryGetContext('ID')}-${app.node.tryGetContext('ENV')}`;

const tables: Table[] = [
    {name: `${project}-table-city-person`, pk: 'city', sk: 'person'}
];

const lambdas: LambdaFunction[] = [
    {name: 'getRandomPerson', funct: httpFuncts.GET, enviroments: {
        TABLE: tables[0].name,
        REGION: app.node.tryGetContext('REGION')
    }},
    {name: 'getRandomEvent', funct: httpFuncts.GET}
];

new TablesStack(app, 'TablesStack', tables, project, {});
new ApiStack(app, 'ApiStack', lambdas, project, {});
