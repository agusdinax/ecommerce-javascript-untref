//https://fakestoreapi.com/products
//https://fakestoreapi.com/docs#tag/Products/
function updateCart(count) {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  badge.textContent = count;
  badge.classList.remove('bump');
  void badge.offsetWidth; // reinicia animación
  badge.classList.add('bump');
}

document.addEventListener('DOMContentLoaded', () => {
  let items = 0;
  const btn = document.getElementById('add');
  btn.addEventListener('click', () => {
    items++;
    updateCart(items);
  });
});
