## Caracteristicas del proyecto para el trabajo integrador:
- Listado de productos con imagen, nombre y precio.
- Detalle del producto en otra página y que detalle el nombre, precio, descripción, imagen de cada producto con un botón Volver.
- Carrito persistido en localStorage con compra simulada.
- Fetch a https://fakestoreapi.com/products y aca producto en particular
- Promesas con async/await
- Eventos para interacciones y actualización en tiempo real del carrito
- Responsive

### Comandos necesarios: 

Para este proyecto decidí trabajar con VITE con VANILLA puro (Javascript y HTML)
- Navegar hacia el proyecto y instalar dependencias 

```bash
cd ecommerce-vanilla
npm i
```
- Para levantar el proyecto:
```bash
npm run dev
```

### Estructura del proyecto
- Estructura de las carpetas del proyecto:
```
/src
  /js
    app.js
    index.js
    product.js
    cart.js
  /assets
    logo1.png
  styles.css
index.html
product.html
cart.html
```
- index.html: listado de productos y home de la página
- product.html: detalle de producto
- cart.html: carrito de compras 

- CSS: estilos del proyecto en formato css

- JS:
- /src/js/app.js: utilidades del carrito donde se obtienen los productos, configuración del precio y actualización del carrito
- /src/js/index.js: se visualiza el lisado y se navega al detalle del producto
- /src/js/product.js: para el detalle del producto y se agrega al carrito 
- /src/js/cart.js: el carrito donde se elimina o suma un producto y se hace una compra simulada


### API usada: Fake Store
- Listado: GET https://fakestoreapi.com/products  
- Detalle: GET https://fakestoreapi.com/products/:id

Se consumen con fetch usando async/await y se manejan los errores con try/catch.
```js
export async function traerProductos() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  return res.json(); 
}
```

### Objetos y estado de la app

- Elemento del carrito en json:
- Carrito: persistido en el localStorage.

### Eventos usados

- DOMContentLoaded: al inicializar cada página
- click en botones como ver detalle
- actualización visual:

### Promesas y compra simulada

Se simula el pago con una promesa que acepta o rechaza por opcion y que se actualiza cada cierto tiempo:

### Manejo de errores
- try/catch en funciones async
- feedback en la ui para recursos no encontrados.

