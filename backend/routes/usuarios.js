const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ✅ Crear usuario (POST)
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono || null], (err, result) => {
    if (err) {
      console.error('❌ Error al crear usuario:', err);
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

// ✅ Listar usuarios (GET)
router.get('/', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('❌ Error al listar usuarios:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// ✅ Actualizar usuario (PUT)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, id], (err) => {
    if (err) {
      console.error('❌ Error al actualizar usuario:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// ✅ Eliminar usuario (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('❌ Error al eliminar usuario:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;

