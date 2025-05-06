import React, { useState } from 'react';

export default function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('/.netlify/functions/addProduct', {
      method: 'POST',
      body: JSON.stringify({ name, quantity })
    });
    setName('');
    setQuantity(0);
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" required />
      <input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Cantidad" required />
      <button type="submit">Agregar Producto</button>
    </form>
  );
}