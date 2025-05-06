const { addProduct } = require('../../src/lib/fauna');

exports.handler = async (event) => {
  const { name, quantity } = JSON.parse(event.body);
  try {
    const result = await addProduct(name, quantity);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};