# OAuth

Para implementr OAuth manualmente con cualquier proveedor pueden seguir estos pasos:

1. Mirar la documentación del proveedor (Github, Google, FB, etc)
2. Obtener las credenciales del proveedor (`Client Id` y el `Client Secret`)
3. Crear el botón o el link para autenticar que redireccione al proveedor (cada proveedor tiene su URL).
4. Crear la ruta donde el proveedor va a redireccionar cuando la persona autorice la aplicación (callback).
5. Crear la ruta de nuestra aplicación que va a obtener el access token, el email, que crea el usuario y que devuelve el JWT
