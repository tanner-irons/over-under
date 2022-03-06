const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    await deleteConnectionId(connectionId);
    callback(null, {
        statusCode: 200,
    });
}

function deleteConnectionId(connectionId) {
    return ddb.delete({
        TableName: 'OverUnder',
        Key: {
            connectionid: connectionId,
        },
    }).promise();
}
