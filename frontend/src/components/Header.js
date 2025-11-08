import React from "react";
import "../styles/theme.css";

function Header() {
  return (
    <header className="header">
      <img src="/logo.png" alt="KairoSoft" className="logo" />
      <div className="brand">
        <h1>KairoSoft</h1>
        <p>Plataforma Educativa Virtual</p>
      </div>
    </header>
  );
}

export default Header;
