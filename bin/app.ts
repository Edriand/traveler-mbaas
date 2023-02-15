#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TablesStack } from '../lib/dynamodb-stack';
import { Table } from '../interfaces/table.interface';

const app = new cdk.App();

const tables: Table[] = [
    {name: 'person', pk: 'id', sk: 'city'},
    {name: 'coords', pk: 'id', sk: 'coords'}
];

new TablesStack(app, 'TablesStack', tables, {});
