import { Stack, StackProps, aws_cognito, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Pool } from '../interfaces/pool.interface';

export class CognitoStack extends Stack {
  constructor(scope: Construct, id: string, pools: Pool[], project: string, props?: StackProps) {
    super(scope, `${project}-${id}`, props);

    pools.map(p => {
        let name = `${project}-pool-${p.name}`;
        let pool = new aws_cognito.UserPool(this, name, {
            userPoolName: name,
            selfSignUpEnabled: true,
            userVerification: {
              emailSubject: 'Verify your email for our awesome app!',
              emailBody: 'Thanks for signing up to our awesome app! Your verification code is {####}',
              emailStyle: aws_cognito.VerificationEmailStyle.CODE
            },
            userInvitation: {
                emailSubject: 'Invite to join our awesome app!',
                emailBody: 'Hello {username}, you have been invited to join our awesome app! Your temporary password is {####}'
            },
            signInAliases: {
                username: true,
                email: true
            },
            autoVerify: { 
                email: true
            },
            standardAttributes: {
                email: {
                    required: true,
                    mutable: true
                },
                fullname: {
                  required: true,
                  mutable: true
                },
                address: {
                  required: false,
                  mutable: true
                }
            },
            accountRecovery: aws_cognito.AccountRecovery.EMAIL_ONLY
        });

        pool.addClient(`${project}-appClient-${p.name}`, {
            authFlows: {
              userPassword: true
            },
            preventUserExistenceErrors: true,
            accessTokenValidity: Duration.minutes(60),
            idTokenValidity: Duration.minutes(60),
            refreshTokenValidity: Duration.days(30)
        });

        pool.addDomain(`${project}-domain-${p.name}`, {
            cognitoDomain: {
              domainPrefix: project,
            },
        });
        console.log(pool.userPoolId);
    });
  }
}
