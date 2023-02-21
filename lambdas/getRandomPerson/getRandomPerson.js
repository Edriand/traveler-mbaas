const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let result = {};
let nPerson = 0;
let statusCode = 200;

exports.handler = async function (event, context) { 
  var params = {
    ExpressionAttributeValues: {
      ':c': {S: event['queryStringParameters']['city']}
    },
    KeyConditionExpression: 'city = :c',
    TableName: process.env.TABLE
  };

  await ddb.query(params, function(err, data) {
    if (err) {
      statusCode = 500;
      result = err;
      console.log("Error in query: ", err);
    } else {
      nPerson = Math.floor(Math.random() * data.Count);
      result = data.Items;
    }
  }).promise();

  return {
    statusCode: statusCode,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(AWS.DynamoDB.Converter.unmarshall(result[nPerson]))
  };
};
