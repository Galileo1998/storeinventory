## Store Inventory
    Es un proyecto académico. Se elaborarán dos soluciones, backend en express basado  en el REST API json y un frontend basado en
    react.js.
    La persistencia de datos se manejará en mongodb.
## Backend
### Seguridad (JWT)
Tendrá esquema de seguridad para validar usuario y contraseña el cual devolverá un hash JWT para las siguientes autenticaciones
en las rutas privadas.
    --Login
    --Register
### Productos
Manejar el ingreso de las caracteristicas del
catalogo de productos y su inventario inicial.
    --Nuevo
    --Actualizar
    --Deshabilitar
    --Búsqueda personalizada
    --Búsqueda por punto de reabastecimiento
### Kardex
Registrar y trazar todo movimiento de inventario de un producto específico.
    --Ingresar movimiento
        * Producto terminado (+)
        * Producto devuelto (+)
        * Ajuste de inventario (+-)
        * Producto entregado (-)
        * Producto dañado (-)
        * Producto donado (-)
    --Obtnener Kardex  por rango de fecha de producto X. 