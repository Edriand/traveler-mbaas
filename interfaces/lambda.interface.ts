export interface LambdaFunction {
    name:           string;
    funct:          httpFuncts;
    enviroments?:   { [key: string]: string; }
}

export enum httpFuncts {
    GET =       'GET',
    PUT =       'PUT',
    DELETE =    'DELETE'
}