import { Stack, StackProps, aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaFunction } from '../interfaces/lambda.interface';

export class LambdasStack extends Stack {
  constructor(scope: Construct, id: string, lambdas: LambdaFunction[], props?: StackProps) {
    super(scope, id, props);

    lambdas.map(l => {
      new aws_lambda.Function(this, l.name, {
        functionName: `${this.node.tryGetContext('ID')}-${this.node.tryGetContext('ENV')}-lambda-${l.name}`,
        runtime: aws_lambda.Runtime.NODEJS_16_X,
        code: aws_lambda.Code.fromAsset(`lambdas/${l.name}`),
        handler: `${l.name}.handler`
      });
    });
  }
}
