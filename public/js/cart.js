const addToCartButton = document.getElementById('add-to-cart-button');

  addToCartButton.addEventListener('click', event => {
    event.preventDefault();
    const product = JSON.parse(event.target.dataset.item);

    addItemToCart(product);
})




function addItemToCart(product) {
    alert(product.title + " has been added to your cart.");
    fetch('/cart/add', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => console.error(error));
  }