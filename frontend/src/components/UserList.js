
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function UserForm({ initial, onSave, onCancel }) {

  const [nombre, setNombre] = useState(initial.nombre || '');
  const [email, setEmail] = useState(initial.email || '');
  const [telefono, setTelefono] = useState(initial.telefono || '');


  useEffect(() => {
    setNombre(initial.nombre || '');
    setEmail(initial.email || '');
    setTelefono(initial.telefono || '');
  }, [initial]);


  const submit = (e) => {
    e.preventDefault();
    onSave({ nombre, email, telefono });
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: 16 }}>
      <input placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
      <input placeholder="Teléfono" value={telefono} onChange={e => setTelefono(e.target.value)} />
      <button type="submit">Guardar</button>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}


export default function UserList() {

  const [users, setUsers] = useState([]);

  
  const [editing, setEditing] = useState(null);


  const [showCreate, setShowCreate] = useState(false);


  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/usuarios');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert('Error cargando usuarios');
    }
  };

  useEffect(() => { fetchUsers(); }, []);

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


  const startEdit = (user) => setEditing(user);

  
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

 
  return (
    <div style={{ padding: 20 }}>
      <h2>Usuarios</h2>

      {}
      {!showCreate && !editing && (
        <button onClick={() => setShowCreate(true)}>Crear usuario</button>
      )}

      {}
      {showCreate && (
        <div>
          <h3>Crear usuario</h3>
          <UserForm initial={{}} onSave={handleCreate} onCancel={() => setShowCreate(false)} />
        </div>
      )}

      {}
      {editing && (
        <div>
          <h3>Editar usuario #{editing.id}</h3>
          <UserForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}

      {}
      <table border="1" cellPadding="8" style={{ marginTop: 12 }}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
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
