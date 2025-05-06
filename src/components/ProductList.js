import React, { useState } from 'react';

export default function ProductList({ products, onSell }) {
  const [sellQty, setSellQty] = useState({});

  const handleSell = async (id) => {
    const qty = sellQty[id] || 0;
    await fetch('/.netlify/functions/sellProduct', {
      method: 'POST',
      body: JSON.stringify({ id, soldQty: Number(qty) })
    });
    onSell();
  };

  return (
    <div>
      {products.map(p => (
        <div key={p.id} style={{ margin: '8px 0' }}>
          <strong>{p.name}</strong> - En inventario: {p.quantity} - Vendidos: {p.sold || 0}
          <input
            type="number"
            value={sellQty[p.id] || ''}
            onChange={e => setSellQty({ ...sellQty, [p.id]: e.target.value })}
            placeholder="Cantidad a vender"
            style={{ margin: '0 8px' }}
          />
          <button onClick={() => handleSell(p.id)}>Vender</button>
        </div>
      ))}
    </div>
  );
}