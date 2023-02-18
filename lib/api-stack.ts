import { Stack, StackProps, aws_lambda, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaFunction } from '../interfaces/lambda.interface';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, lambdas: LambdaFunction[], props?: StackProps) {
    super(scope, id, props);

    let backend = new aws_lambda.Function(this, "default", {
      functionName: `${this.node.tryGetContext('ID')}-${this.node.tryGetContext('ENV')}-lambda-default`,
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      code: aws_lambda.Code.fromAsset(`lambdas/default`),
      handler: `default.handler`
    });

    const api = new aws_apigateway.LambdaRestApi(this, 'api', {
      handler: backend,
      proxy: false
    });    

    lambdas.map(l => {
      let branch = api.root.addResource(l.name);

      let lambda = new aws_lambda.Function(this, l.name, {
        functionName: `${this.node.tryGetContext('ID')}-${this.node.tryGetContext('ENV')}-lambda-${l.name}`,
        runtime: aws_lambda.Runtime.NODEJS_16_X,
        code: aws_lambda.Code.fromAsset(`lambdas/${l.name}`),
        handler: `${l.name}.handler`
      });

      branch.addMethod(l.funct, new aws_apigateway.LambdaIntegration(lambda));
    });
  }
}
