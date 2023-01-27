import { Stack, StackProps, aws_dynamodb } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class TablesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const table_person = new aws_dynamodb.Table(this, 'Table', {
      tableName: `${this.node.tryGetContext('ID')}-${this.node.tryGetContext('ENV')}-table-person`,
      partitionKey: { name: 'id', type: aws_dynamodb.AttributeType.STRING },
      sortKey: { name: 'city', type: aws_dynamodb.AttributeType.STRING },
      billingMode: aws_dynamodb.BillingMode.PAY_PER_REQUEST,
      tableClass: aws_dynamodb.TableClass.STANDARD,
    });
  }
}
