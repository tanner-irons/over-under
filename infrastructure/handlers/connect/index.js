const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context, callback) => {
    const connectionId = event.requestContext.connectionId;
    try {
        await addConnectionId(connectionId);
    } catch (e) {
        console.log('DB Error:', e);
    }
    callback(null, {
        statusCode: 200,
    });
}

function addConnectionId(connectionId) {
    return ddb.put({
        TableName: 'OverUnder',
        Item: {
            connectionid: connectionId
        },

    }).promise();
}
