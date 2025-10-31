const express = require('express');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login'); 

const app = express();
const PORT = 5002; 

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/login', loginRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'API de Usuarios funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
