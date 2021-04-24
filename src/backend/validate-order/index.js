const Sequelize = require("sequelize");

const POSTGRES_CONNECTION_STRING = process.env.POSTGRES_CONNECTION_STRING || "postgres://postgres:postgrespassword@103.82.241.60:5432/threefactorappexample";

function performValidation(order){
    return true;
}

async function validateOrder(order) {
    try {
        var sequelize = new Sequelize(
            POSTGRES_CONNECTION_STRING, {}
        );
        var isValid = performValidation(order);
        var res = await sequelize.query('UPDATE orders SET order_valid = :isValid WHERE order_id = :orderId',
                                    { replacements: { isValid: isValid, orderId: order.order_id } }
                                       );
        return res;
    } catch(e) {
        console.log(e);
        throw new Error(e);
    } finally {
	    sequelize.close();
    }
}

exports.validateOrder = validateOrder;
