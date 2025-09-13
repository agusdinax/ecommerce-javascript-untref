import { traerProducto, ajustarPrecio, sumarCarrito, actualizarNroCarrito } from './app.js';

const detailEl = document.getElementById('product-detail');
const errorEl = document.getElementById('detail-error');

function getIdFromQuery() {
  const params = new URLSearchParams(location.search);
  return params.get('id');
}

function detalleTemplate(p) {
  return `
    <img src="${p.image}" alt="${p.title}">
    <div class="info">
      <h2 class="title">${p.title}</h2>
      <div class="price">${ajustarPrecio(p.price)}</div>
      <p class="desc">${p.description}</p>
      <div class="card-actions">
        <button id="add" class="btn btn-primary">Agregar al carrito</button>
      </div>
    </div>
  `;
}

async function init() {
  actualizarNroCarrito();
  const id = getIdFromQuery();
  if (!id) {
    errorEl.classList.remove('d-none');
    return;
  }

  try {
    const p = await traerProducto(id);
    detailEl.innerHTML = detalleTemplate(p);
    const btn = document.getElementById('add');
    btn.addEventListener('click', () => {
      sumarCarrito(p, 1);
      btn.textContent = '¡Agregado!';
      setTimeout(() => (btn.textContent = 'Agregar al carrito'), 1000);
    });
  } catch (err) {
    errorEl.textContent = err.message || 'Error al cargar el producto';
    errorEl.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', init);
