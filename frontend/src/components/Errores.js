import React, { useState } from "react";
import Login from "./Login";
import UserList from "./UserList";

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
        <div className="card login-card">
          <Login onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  // 🔹 Si hay usuario, muestra panel según rol
  return (
    <div className="app-bg">
      <div className="card">
        <p className="welcome">
          Bienvenido, <strong>{user.nombre}</strong> ({user.rol})
        </p>
        <button className="btn logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>

      {user?.rol === "admin" ? (
        <div className="admin-dashboard">
          {/* Panel de Administrador */}
          <div className="card admin-profile">
            <div className="profile-header">
              <div className="profile-image-container">
                <img 
                  src="/foto_perfil.webp" 
                  alt="Foto de perfil"
                  className="profile-image"
                />
              </div>
              <div className="admin-info">
                <h2>Panel de Administrador</h2>
                <p className="admin-role">Administrador del Sistema</p>
              </div>
            </div>
            <div className="admin-stats">
              <div className="stat-card">
                <h4>Total Usuarios</h4>
                <p className="stat-number">25</p>
              </div>
              <div className="stat-card">
                <h4>Administradores</h4>
                <p className="stat-number">3</p>
              </div>
              <div className="stat-card">
                <h4>Usuarios Activos</h4>
                <p className="stat-number">18</p>
              </div>
            </div>
          </div>

          {/* Gestión de Usuarios */}
          <div className="card users-management">
            <h2>Gestión de Usuarios</h2>
            <UserList />
          </div>
        </div>
      ) : (
        <div className="dashboard">
          <div className="card user-profile">
            <div className="profile-header">
              <div className="profile-image-container">
                <img 
                  src="/foto_perfil.webp" 
                  alt="Foto de perfil"
                  className="profile-image"
                />
              </div>
              <h2>Mi Perfil</h2>
            </div>
            <div className="profile-info">
              <table className="table">
                <tbody>
                  <tr>
                    <th>ID:</th>
                    <td>{user.id}</td>
                  </tr>
                  <tr>
                    <th>Nombre:</th>
                    <td>{user.nombre}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Rol:</th>
                    <td>{user.rol}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="card platform-info">
            <h2>Plataforma KairoSoft</h2>
            <div className="info-sections">
              <section>
                <h3>Servicios Disponibles</h3>
                <ul>
                  <li>Aula Virtual</li>
                  <li>Biblioteca Digital</li>
                  <li>Calendario Académico</li>
                  <li>Mensajería Interna</li>
                </ul>
              </section>
              
              <section>
                <h3>Recursos</h3>
                <ul>
                  <li>Guías de usuario</li>
                  <li>Tutoriales</li>
                  <li>Soporte técnico</li>
                  <li>FAQs</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Errores;
