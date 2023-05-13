const addToCartButton = document.getElementById('create-new-order');

  addToCartButton.addEventListener('click', event => {
    event.preventDefault();
    createOrder();
})




function createOrder() {
    alert("New order has been created");
    fetch('/add/order', {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .catch(error => console.error(error));
  }