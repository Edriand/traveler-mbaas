import { Stack, StackProps, aws_lambda, aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaFunction } from '../interfaces/lambda.interface';

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, lambdas: LambdaFunction[], project: string, props?: StackProps) {
    super(scope, `${project}-${id}`, props);

    let backend = new aws_lambda.Function(this, "default", {
      functionName: `${project}-lambda-default`,
      runtime: aws_lambda.Runtime.NODEJS_16_X,
      code: aws_lambda.Code.fromAsset(`lambdas/default`),
      handler: `default.handler`
    });

    const api = new aws_apigateway.LambdaRestApi(this, 'api', {
      handler: backend,
      proxy: false
    });
    
    console.log(api.url)

    lambdas.map(l => {
      let branch = api.root.addResource(l.name);

      let lambda = new aws_lambda.Function(this, l.name, {
        functionName: `${project}-lambda-${l.name}`,
        runtime: aws_lambda.Runtime.NODEJS_16_X,
        code: aws_lambda.Code.fromAsset(`lambdas/${l.name}`),
        handler: `${l.name}.handler`,
        environment: l.enviroments
      });

      branch.addMethod(l.funct, new aws_apigateway.LambdaIntegration(lambda));
    });
  }
}
