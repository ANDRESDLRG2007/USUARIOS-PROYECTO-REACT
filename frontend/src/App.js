import React, { useState } from "react";
import UserList from "./components/UserList";
import Login from "./components/Login";
import Header from "./components/Header";
import "./styles/theme.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (usuario) => {
    setUser(usuario);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="app-bg">
        <Header />
        <div className="card login-card">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="app-bg">
      <Header />
      <div className="card">
        <p className="welcome">
          Bienvenido, <strong>{user.nombre}</strong> ({user.rol})
        </p>
        <button className="btn logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {user.rol === "admin" ? (
        <div className="card">
          <h2>Panel de administrador</h2>
          <UserList />
        </div>
      ) : (
        <div className="card">
          <h2>Panel de usuario</h2>
          <p>Solo puedes ver tu propia información:</p>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
