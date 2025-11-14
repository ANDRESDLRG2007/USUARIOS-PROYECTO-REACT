Equipo de trabajo : ANDRES DE LA RUE Y JAIME POVED MARTINEZ :)

# 🧭 GUÍA: Cómo clonar y trabajar el proyecto en otro PC
🧱 1️⃣ Clonar el repositorio completo

Abre una terminal (Git Bash o VSCode) y ejecuta:

git clone https://github.com/ANDRESDLRG2007/USUARIOS-PROYECTO-REACT.git


Esto descargará todo el proyecto en una carpeta nueva llamada:

USUARIOS-PROYECTO-REACT

🌿 2️⃣ Entrar a la carpeta del proyecto
cd USUARIOS-PROYECTO-REACT

🌐 3️⃣ Ver todas las ramas disponibles
git branch -a


Deberías ver algo así:

* main
  remotes/origin/develop
  remotes/origin/feature/crud-usuarios
  remotes/origin/feature/login

🔀 4️⃣ Cambiarte a la rama con la que quieras trabajar

Por ejemplo, si quieres trabajar en la del login:

git checkout -b feature/login origin/feature/login


O si quieres la rama de desarrollo general:

git checkout -b develop origin/develop

🧩 5️⃣ Instalar dependencias del proyecto

📦 Backend

cd backend
npm install

⚛️ Frontend

Abre otra terminal (o regresa a la raíz):

cd ../frontend
npm install


Esto instalará todas las librerías necesarias (express, axios, react, etc.) en ambos lados.

⚙️ 6️⃣ Iniciar los servidores

## Backend

cd backend
npm run dev


Debe mostrar algo como:

Servidor corriendo en http://localhost:5002
Conectado a MySQL

## Frontend

En otra terminal:

cd frontend
npm start


Y abre http://localhost:3000

# 💾 7️⃣ Conectar a MySQL del nuevo PC

En el nuevo equipo, asegúrate de tener una base de datos local (MySQL o XAMPP).
Luego ejecuta en MySQL:

https://drive.google.com/file/d/18qY-w-8b3lG3WTzdCJmMdn1C1h_SBc1B/view?usp=sharing

CREATE DATABASE usuarios_app;
USE usuarios_app;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  password VARCHAR(100) NOT NULL,
  rol ENUM('admin','usuario') DEFAULT 'usuario',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, telefono, password, rol) VALUES
('Cristian Andres', 'cristian@gmail.com', '3101112233', '2007', 'admin'),
('Jaime', 'jaime@gmail.com', '3202223344', '2007', 'admin'),
('Laura Gomez', 'laura.gomez@email.com', '3105556677', 'abc123', 'usuario'),
('Carlos Ruiz', 'carlos.ruiz@email.com', '3158889900', 'xyz789', 'usuario'),
('Sofia Martinez', 'sofia.martinez@email.com', '3004445566', 'pass01', 'usuario'),
('Andres Torres', 'andres.torres@email.com', '3127778899', 'clave02', 'usuario'),
('Valentina Rojas', 'valentina.rojas@email.com', '3139990001', '12345', 'usuario'),
('Camilo Diaz', 'camilo.diaz@email.com', '3201112233', 'qwerty', 'usuario'),
('Mariana Silva', 'mariana.silva@email.com', '3012223344', 'asdfg', 'usuario'),
('Felipe Castro', 'felipe.castro@email.com', '3003334455', 'zxcvb', 'usuario');


Así tendrás usuarios de prueba listos.

☁️ 8️⃣ Subir cambios desde el nuevo PC (si trabajas algo)

Después de hacer modificaciones:

git add .
git commit -m "feat: cambios realizados en universidad"
git push origin feature/login


Si trabajas en otra rama, reemplaza feature/login por el nombre correcto.

🧭 9️⃣ Crear o actualizar el Pull Request

Entra a GitHub → pestaña Pull requests

Haz clic en New pull request o revisa el existente

Base: develop ← Compare: feature/login

Crea el PR o súbelo actualizado.

🧹 10️⃣ (Opcional) Actualizar el proyecto local si alguien más hizo cambios

Antes de empezar a trabajar cada día:

git fetch --all
git pull


Esto asegura que tienes la versión más reciente de todo.

-------
#*Componente Login – Descripción*

Este componente de React implementa un formulario de inicio de sesión que se comunica con un servidor backend para autenticar a un usuario.

Funcionalidad principal

Manejo del estado del formulario

email: almacena el correo ingresado por el usuario.

password: almacena la contraseña.

error: guarda mensajes de error que provengan del servidor o de fallos de conexión.

loading: indica si la petición al servidor está en proceso para deshabilitar inputs y botón.

Envía una solicitud al servidor

Al enviar el formulario, se ejecuta handleSubmit.

Se hace una petición POST a http://localhost:5002/api/login usando Axios.

Se envían los campos email y password.

Procesa la respuesta del backend

Si el servidor responde con success: true, se ejecuta onLoginSuccess y se pasa la información del usuario autenticado.

Si ocurre un error, se muestra un mensaje apropiado en pantalla.

Manejo de errores

Muestra errores provenientes del servidor (por ejemplo, credenciales incorrectas).

Muestra un error genérico en caso de fallos de conexión.

Interfaz del usuario

Formulario con campos para email y contraseña.

Botón de inicio de sesión que se deshabilita mientras la solicitud está en progreso.

Visualización de mensajes de error cuando corresponde.
