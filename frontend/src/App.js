import React, { useState } from "react";
import UserList from "./components/UserList";
import Login from "./components/Login";
import "../styles/theme.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (usuario) => {
    setUser(usuario);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <p>Bienvenido, {user.nombre} ({user.rol})</p>
      <button onClick={handleLogout}>Cerrar sesión</button>

      {user.rol === "admin" ? (
        <>
          <h3>Panel de administrador</h3>
          <UserList />
        </>
      ) : (
        <>
          <h3>Panel de usuario</h3>
          <p>Solo puedes ver tu propia información:</p>
          <table border="1" cellPadding="10">
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
        </>
      )}
    </div>
  );
}

export default App;
