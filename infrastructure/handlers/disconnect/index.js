const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    await deleteConnectionId(connectionId);
    return {
        statusCode: 200,
    };
}

function deleteConnectionId(connectionId) {
    return ddb.delete({
        TableName: 'OverUnder',
        Key: {
            connectionid: connectionId,
        },
    }).promise();
}
