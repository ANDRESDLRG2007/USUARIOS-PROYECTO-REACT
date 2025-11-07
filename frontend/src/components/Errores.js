import React, { useState } from "react";
import Login from "./Login";
import UserList from "./UserList";
import Header from "./Header";


function Errores() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (usuario) => {
    setUser(usuario);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // 🔹 Si no hay usuario, muestra login
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

  // 🔹 Si hay usuario, muestra panel según rol
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

export default Errores;
