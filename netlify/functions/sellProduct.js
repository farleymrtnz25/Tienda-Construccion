const { sellProduct } = require('../../src/lib/fauna');

exports.handler = async (event) => {
  const { id, soldQty } = JSON.parse(event.body);
  try {
    const result = await sellProduct(id, soldQty);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};