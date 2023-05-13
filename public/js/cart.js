const addToCartButton = document.getElementById('add-to-cart-button');

  addToCartButton.addEventListener('click', event => {
    event.preventDefault();

    const product = JSON.parse(event.target.dataset.item);
    addItemToCart(product);
})




function addItemToCart(product) {
    fetch('/cart/add', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(cart => {
      // update UI with new cart data
    })
    .catch(error => console.error(error));
  }