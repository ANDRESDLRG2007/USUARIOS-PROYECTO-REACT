const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Crear usuario (POST)
router.post('/', (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono, password) VALUES (?, ?, ?, ?)';
  db.query(query, [nombre, email, telefono || null, password], (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      id: result.insertId,
      nombre,
      email,
      telefono
    });
  });
});

// Listar usuarios (GET)
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al listar usuarios:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Actualizar usuario (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, password } = req.body;

  let query, params;

  // Si incluye password, también se actualiza
  if (password) {
    query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, password = ? WHERE id = ?';
    params = [nombre, email, telefono, password, id];
  } else {
    query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
    params = [nombre, email, telefono, id];
  }

  db.query(query, params, (err) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Eliminar usuario (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;
