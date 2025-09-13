import { traerProducto, ajustarPrecio, sumarCarrito, actualizarNroCarrito } from './app.js';

const detailEl = document.getElementById('product-detail');
const errorEl = document.getElementById('detail-error');

function obtenerIdElemento() {
  const params = new URLSearchParams(window.location.search);
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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function init() {
  actualizarNroCarrito();
  const id = obtenerIdElemento();
  if (!id) {
    errorEl.textContent = 'Falta el parámetro id en la URL';
    errorEl.classList.remove('d-none');
    return;
  }

  try {
    const p = await traerProducto(id);
    detailEl.innerHTML = detalleTemplate(p);
    const btn = document.getElementById('add');
    const originalText = btn.textContent;
    btn.addEventListener('click', async () => {
      if (btn.disabled) return; 
      try {
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        await Promise.resolve(sumarCarrito(p, 1));
        actualizarNroCarrito();
        btn.textContent = '¡Agregado!';
        await sleep(1000);
      } catch (err) {
        console.error(err);
        btn.textContent = 'Error';
        await sleep(900);
      } finally {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.textContent = originalText;
      }
    });
  } catch (err) {
    errorEl.textContent = err?.message || 'Error al cargar el producto';
    errorEl.classList.remove('d-none');
  }
}

document.addEventListener('DOMContentLoaded', init);
