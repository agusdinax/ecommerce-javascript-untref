import { traerProductos, ajustarPrecio, actualizarNroCarrito } from './app.js';

const listEl = document.getElementById('product-list');
const errorEl = document.getElementById('list-error');

function tarjetasProductos(p) {
  return `
    <article class="card">
      <img src="${p.image}" alt="${p.title}">
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        <div class="price">${ajustarPrecio(p.price)}</div>
        <div class="card-actions">
          <a class="btn btn-primary" href="/product.html?id=${encodeURIComponent(p.id)}">Ver</a>
        </div>
      </div>
    </article>
  `;
}

async function init() {
  actualizarNroCarrito(); 
  try {
    const products = await traerProductos();
    listEl.innerHTML = products.map(tarjetasProductos).join('');
  } catch (err) {
    errorEl.textContent = err.message || 'Error al cargar productos';
    errorEl.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', init);
