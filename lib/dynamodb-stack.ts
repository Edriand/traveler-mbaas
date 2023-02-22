import { Stack, StackProps, aws_dynamodb } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Table } from '../interfaces/table.interface';

export class TablesStack extends Stack {
  constructor(scope: Construct, id: string, tables: Table[], project: string, props?: StackProps) {
    super(scope, `${project}-${id}`, props);

    tables.map(t => {
      let name =  `${project}-table-${t.name}`;
      new aws_dynamodb.Table(this, name, {
        tableName: name,
        partitionKey: { name: t.pk, type: aws_dynamodb.AttributeType.STRING },
        sortKey: { name: t.sk, type: aws_dynamodb.AttributeType.STRING },
        billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
        tableClass: aws_dynamodb.TableClass.STANDARD,
      });
    });
  }
}
