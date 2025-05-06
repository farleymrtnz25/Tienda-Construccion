const { getProducts } = require('../../src/lib/fauna');

exports.handler = async () => {
  try {
    const results = await getProducts();
    return { statusCode: 200, body: JSON.stringify(results) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};