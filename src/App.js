import React, { useEffect, useState } from 'react';
import Auth from './components/Auth';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import InventoryDashboard from './components/InventoryDashboard';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch('/.netlify/functions/getProducts');
    const data = await res.json();
    const formatted = data.data.map(item => ({
      id: item.ref['@ref'].id,
      ...item.data
    }));
    setProducts(formatted);
  };

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Tienda de Materiales de Construcción</h1>
      <Auth onLogin={setUser} />

      {user && (
        <>
          <ProductForm onAdd={fetchProducts} />
          <InventoryDashboard products={products} />
          <ProductList products={products} onSell={fetchProducts} />
        </>
      )}
    </div>
  );
}