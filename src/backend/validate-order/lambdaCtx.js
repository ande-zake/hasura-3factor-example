const validateOrder = require('./index').validateOrder;

exports.handler = async (event, context, callback) => {
    const { id, event: {op, data}, table } = JSON.parse(event.body);
    console.log(`processing event ${id}`);
    try {
        var result = await validateOrder(data.new);
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(result)
        });
    } catch(e) {
        console.log(e);
        return callback(null, {
            statusCode: 500,
            body: e.toString()
        });
    }
};
