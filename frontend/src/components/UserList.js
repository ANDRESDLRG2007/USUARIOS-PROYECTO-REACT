// ✅ UserList.js
// Este componente maneja el CRUD (Crear, Leer, Actualizar, Eliminar) de usuarios
// usando React Hooks y Axios para comunicarse con el backend (API REST).

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// ✅ Subcomponente que muestra el formulario para crear o editar usuarios
function UserForm({ initial, onSave, onCancel }) {
  // Estados locales del formulario
  const [nombre, setNombre] = useState(initial.nombre || '');
  const [email, setEmail] = useState(initial.email || '');
  const [telefono, setTelefono] = useState(initial.telefono || '');
  const [password, setPassword] = useState('');


  // Cada vez que cambian los valores iniciales (por ejemplo al editar), actualiza el formulario
  useEffect(() => {
    setNombre(initial.nombre || '');
    setEmail(initial.email || '');
    setTelefono(initial.telefono || '');
  }, [initial]);

  // Envía los datos al componente principal (UserList)
const submit = (e) => {
  e.preventDefault();
  onSave({ nombre, email, telefono, password });
};


  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} />

      <button type="submit">Guardar</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}

// ✅ Componente principal que muestra la lista y controla todo el CRUD
export default function UserList() {
  // Lista de usuarios obtenidos desde el backend
  const [users, setUsers] = useState([]);

  // Guarda el usuario que se está editando
  const [editing, setEditing] = useState(null);

  // Controla si se está mostrando el formulario de creación
  const [showCreate, setShowCreate] = useState(false);

  // ✅ Función para traer usuarios desde el backend (GET)
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/usuarios');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error cargando usuarios');
    }
  };

  // ✅ useEffect: se ejecuta una vez al iniciar el componente
  useEffect(() => { fetchUsers(); }, []);

  // ✅ Crear usuario (POST)
const handleCreate = async (data) => {
  try {
    await axios.post('http://localhost:5002/api/usuarios', data);
    setShowCreate(false);
    fetchUsers();
  } catch (err) {
    console.error(err);
    alert('Error creando usuario: ' + (err.response?.data?.error || err.message));
  }
};


  // ✅ Preparar edición (mostrar formulario con los datos)
  const startEdit = (user) => setEditing(user);

  // ✅ Actualizar usuario (PUT)
  const handleUpdate = async (data) => {
    try {
      await axios.put(`http://localhost:5002/api/usuarios/${editing.id}`, data);
      setEditing(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error actualizando: ' + (err.response?.data?.error || err.message));
    }
  };

  // ✅ Eliminar usuario (DELETE)
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar usuario?')) return;
    try {
      await axios.delete(`http://localhost:5002/api/usuarios/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Error eliminando usuario');
    }
  };

  // ✅ Render: muestra tabla, formularios y botones
  return (
    <div className="table-responsive">
      {/* Botón para mostrar formulario de creación */}
      <button 
        className="btn btn-primary" 
        onClick={() => setShowCreate(true)}
        style={{ marginBottom: '1rem' }}
      >
        + Nuevo Usuario
      </button>

      {/* Formulario de creación */}
      {showCreate && (
        <UserForm 
          initial={{}} 
          onSave={handleCreate}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {/* Formulario de edición */}
      {editing && (
        <UserForm 
          initial={editing} 
          onSave={handleUpdate}
          onCancel={() => setEditing(null)}
        />
      )}

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
              <td>
                <button onClick={() => startEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
