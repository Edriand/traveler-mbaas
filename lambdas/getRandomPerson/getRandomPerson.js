const AWS = require('aws-sdk');
AWS.config.update({region: process.env.REGION});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

let result = {};

var params = {
  ExpressionAttributeValues: {
    ':c': {S: 'valencia'}
  },
  KeyConditionExpression: 'city = :c',
  TableName: process.env.TABLE
};

exports.handler = async function (event) { 
  await ddb.query(params, function(err, data) {
    if (err) {
      console.log("Error in query: ", err);
    } else {
      console.log(data)
      data.Items.forEach(function(element) {
        result.city = element.city;
        result.person = element.person;
      });
    }
  }).promise();

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(result)
  };
};
