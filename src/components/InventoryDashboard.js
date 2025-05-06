import React from 'react';

export default function InventoryDashboard({ products }) {
  const totalIn = products.reduce((sum, p) => sum + (p.quantity + (p.sold || 0)), 0);
  const totalSold = products.reduce((sum, p) => sum + (p.sold || 0), 0);

  return (
    <div style={{ margin: '16px 0' }}>
      <h2>Resumen de Inventario</h2>
      <p>Total ingresado: {totalIn}</p>
      <p>Total vendido: {totalSold}</p>
    </div>
  );
}