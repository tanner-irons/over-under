const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

function initSend(event) {
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
    });

    return async(connectionId, data) => {
        try {
            await apigwManagementApi.postToConnection({
                ConnectionId: connectionId,
                Data: JSON.stringify({ route: "dispatch", data })
            }).promise();
        }
        catch (error) {
            console.log(error);
        }

    }
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

exports.handler = async (event) => {
    const send = initSend(event);
    const { action, roomId } = JSON.parse(event.body);
    const connections = await getConnections(roomId);
    const events = connections.Items.map(connection => {
        return send(connection.connectionid, JSON.stringify(action));
    });

    try {
        await Promise.all(events);
    }
    catch (error) {
        console.log(error);
    }

    return {};
};
