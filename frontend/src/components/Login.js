import React, { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5002/api/login", {
        email,
        password
      });
      console.log('===== RESPUESTA COMPLETA =====');
      console.log('res.data:', res.data);
      if (res.data.success) {
        onLoginSuccess(res.data.user);
      } else {
        setError(res.data.error || "Error al iniciar sesión");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        err.response?.data?.error ||
        "Error de conexión con el servidor"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}

export default Login;
