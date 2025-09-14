import {obtenerCarrito, removerCarrito, cantidad, ajustarPrecio,actualizarNroCarrito, limpiarCarrito} from './app.js';

const itemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('cart-total');
const buyBtn = document.getElementById('buy-btn');
const msgEl = document.getElementById('cart-msg');

function listadoCarrito(item) {
  return `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}">
      <div>
        <div class="name">${item.title}</div>
        <div class="price">${ajustarPrecio(item.price)}</div>
        <div class="qty">
          <button class="dec" aria-label="Restar">−</button>
          <span class="q">${item.qty}</span>
          <button class="inc" aria-label="Sumar">+</button>
        </div>
      </div>
      <button class="remove" title="Eliminar">✕</button>
    </div>
  `;
}

function rendirizarCarrito() {
  const cart = obtenerCarrito();
  if (!cart.length) {
    itemsEl.innerHTML = `<p>Tu carrito está vacío.</p>`;
    totalEl.textContent = ajustarPrecio(0);
    actualizarNroCarrito(0);
    return;
  }
  itemsEl.innerHTML = cart.map(listadoCarrito).join('');
  const total = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  totalEl.textContent = ajustarPrecio(total);
  actualizarNroCarrito();
}

function eventosClick() {
  itemsEl.addEventListener('click', (e) => {
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;
    const id = Number(itemEl.dataset.id);

    if (e.target.classList.contains('inc')) {
      const cart = obtenerCarrito();
      const it = cart.find(i => i.id === id);
      if (it) cantidad(id, it.qty + 1);
      rendirizarCarrito();
    }
    if (e.target.classList.contains('dec')) {
      const cart = obtenerCarrito();
      const it = cart.find(i => i.id === id);
      if (it) cantidad(id, Math.max(1, it.qty - 1));
      rendirizarCarrito();
    }
    if (e.target.classList.contains('remove')) {
      removerCarrito(id);
      rendirizarCarrito();
    }
  });

  buyBtn.addEventListener('click', async () => {
    buyBtn.disabled = true;
    msgEl.classList.add('d-none');
    msgEl.textContent = '';
    //simulación de un pago con una promesa
    const fakeCheckout = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve(true) : reject(new Error('Pago rechazado'));
      }, 1200);
    });

    try {
      await fakeCheckout();
      limpiarCarrito();
      rendirizarCarrito();
      msgEl.textContent = '¡Compra realizada con éxito! Gracias por tu compra!';
      msgEl.className = 'alert'; 
    } catch (err) {
      msgEl.textContent = msg(e.message || 'Error en el pago');
      msgEl.className = 'alert';
    } finally {
      buyBtn.disabled = false;
    }
  });
}

function init() {
  actualizarNroCarrito();
  rendirizarCarrito();
  eventosClick();
}

document.addEventListener('DOMContentLoaded', init);
