const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const roomId = JSON.parse(event.body).roomId;
    await joinRoom(connectionId, roomId);
    return {
        statusCode: 200,
    };
}

function getConnections(roomId) {
    return ddb.scan({
        TableName: 'OverUnder',
        FilterExpression: "roomid = :roomid",
        ExpressionAttributeValues: {
            ":roomid": roomId
        }
    }).promise();
}

async function joinRoom(connectionId, roomId) {
    const connections = await getConnections(roomId);
    return ddb.update({
        TableName: 'OverUnder',
        Key: {
            "connectionid": connectionId,
        },
        UpdateExpression: "SET roomid = :roomid, host = :host",
        ExpressionAttributeValues: {
            ":roomid": roomId,
            ":host": connections.Items.length === 0
        },
        ReturnValues: "UPDATED_NEW"
    }).promise();
}
