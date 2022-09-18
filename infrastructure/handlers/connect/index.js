const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    await addConnectionId(connectionId);
    return {
        statusCode: 200,
    };
}

function addConnectionId(connectionId) {
    return ddb.put({
        TableName: 'OverUnder',
        Item: {
            connectionid: connectionId
        },

    }).promise();
}
