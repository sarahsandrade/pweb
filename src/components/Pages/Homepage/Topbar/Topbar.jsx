import React from 'react';
import './Topbar.css'; // Importar arquivo CSS para os estilos

function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <h1 className="topbar-title">Quadro de Medalhas</h1>
        <nav className="topbar-nav">
          <a href="/login">Login</a>
          <a href="/Medal">Medalhas</a>
        </nav>
      </div>
    </header>
  );
}

export default Topbar;