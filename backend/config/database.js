const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // el usuario por defecto de XAMPP
  password: '',       // deja vacío si no tienes contraseña en phpMyAdmin
  database: 'usuarios_app'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    return;
  }
  console.log('✅ Conectado a MySQL');
});

module.exports = connection;
