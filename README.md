Equipo de trabajo : ANDRES DE LA RUE Y JAIME POVED MARTINEZ
Desarrollado con MySQL, Axios, Express y JavaScript

Funcionamiento / Flujo general

Al arrancar el backend, este expone endpoints para gestionar usuarios (por ejemplo: GET /listar, POST /crear, PUT /actualizar/:id, DELETE /eliminar/:id).

Al arrancar el frontend, la aplicación React solicita al backend la lista de usuarios al cargar la página principal.

En la interfaz se muestra la lista de usuarios.

El usuario puede:

Crear: rellenar un formulario con datos de usuario, enviar al backend que lo almacena.

Leer: ver los detalles de cada usuario.

Actualizar: seleccionar un usuario, editar los datos en un formulario, enviar los cambios al backend.

Eliminar: pulsar una opción para borrar un usuario, enviar petición al backend, luego actualizar la lista.

Cuando se realiza una operación de cambio (crear / actualizar / eliminar), el frontend se vuelve a sincronizar con la API para reflejar los cambios.

Estructura del proyecto
