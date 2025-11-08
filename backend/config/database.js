const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'usuarios_app',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conectado exitosamente a MySQL');
});

module.exports = connection;
