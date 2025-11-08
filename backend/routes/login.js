const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Recibida petición de login con datos:', { email, password });

  if (!email || !password) {
    console.log('Error: campos incompletos');
    return res.status(400).json({ 
      success: false,
      error: 'Email y contraseña son requeridos' 
    });
  }

  // Modificar la consulta para ver si el usuario existe primero
  const checkUserQuery = 'SELECT * FROM usuarios WHERE email = ?';
  
  db.query(checkUserQuery, [email], (err, results) => {
    if (err) {
      console.error('Error en consulta SQL:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Error interno del servidor' 
      });
    }

    console.log('Resultados de búsqueda de usuario:', results);

    if (!results || results.length === 0) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ 
        success: false,
        error: 'Usuario no encontrado' 
      });
    }

    // Verificar la contraseña
    const usuario = results[0];
    if (usuario.password !== password) {
      console.log('Contraseña incorrecta');
      return res.status(401).json({ 
        success: false,
        error: 'Contraseña incorrecta' 
      });
    }

    console.log('Login exitoso para usuario:', usuario.email);
    return res.json({
      success: true,
      message: 'Login exitoso',
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  });
});

module.exports = router;
