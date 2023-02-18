export interface LambdaFunction {
    name:   string;
    funct:  httpFuncts;
}

export enum httpFuncts {
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE'
}