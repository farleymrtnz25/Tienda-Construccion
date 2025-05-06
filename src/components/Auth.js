import React, { useEffect, useState } from 'react';
import { initIdentity, getCurrentUser } from '../lib/identity';

export default function Auth({ onLogin }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const identity = initIdentity();
    identity.on('login', user => {
      setUser(user);
      onLogin(user);
    });
    identity.on('logout', () => {
      setUser(null);
      onLogin(null);
    });
    setUser(getCurrentUser());
  }, [onLogin]);

  return user
    ? <button onClick={() => initIdentity().logout()}>Cerrar sesión</button>
    : <button onClick={() => initIdentity().open()}>Iniciar sesión / Registrarse</button>;
}