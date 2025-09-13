const CART_KEY = 'carrito';
const BASE = 'https://fakestoreapi.com';

export function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

export function guardarCarrito(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  actualizarNroCarrito(contadorCarrito(cart));
}

export function contadorCarrito(cart = obtenerCarrito()) {
  return cart.reduce((acc, item) => acc + item.qty, 0);
}

export function sumarCarrito(product, qty = 1) {
  const cart = obtenerCarrito();
  const idx = cart.findIndex(i => i.id === product.id);
  if (idx >= 0) cart[idx].qty += qty;
  else cart.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty });
  guardarCarrito(cart);
}

export function cantidad(productId, qty) {
  const cart = obtenerCarrito();
  const idx = cart.findIndex(i => i.id === productId);
  if (idx >= 0) {
    cart[idx].qty = Math.max(1, qty);
    guardarCarrito(cart);
  }
}

export function removerCarrito(productId) {
  const cart = obtenerCarrito().filter(i => i.id !== productId);
  guardarCarrito(cart);
}

export function limpiarCarrito() {
  guardarCarrito([]);
}

export function ajustarPrecio(num) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
    .format(num * 1000 / 1000);
}

export function actualizarCarrito(count) {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.remove('bump');
  void badge.offsetWidth;
  badge.classList.add('bump');
}

export function actualizarNroCarrito(initialCount = contadorCarrito()) {
  actualizarCarrito(initialCount);
}

export async function traerProductos() {
  const res = await fetch(`${BASE}/products`);
  if (!res.ok) throw new Error('No se pudieron cargar los productos');
  return res.json(); 
}

export async function traerProducto(id) {
  const res = await fetch(`${BASE}/products/${id}`);
  if (!res.ok) throw new Error('Producto no encontrado');
  return res.json();
}
