const addToCartButton = document.getElementById('create-new-order');

  addToCartButton.addEventListener('click', event => {
    event.preventDefault();
    createOrder();
})




function createOrder() {
      
    $.ajax({
      type: "POST",
      url: "/add/order",
      success: function(response) {
        alert(response.message);
        window.location.href = "/";
      },
      error: function(xhr, status, error) {
        alert("Error: " + error);
      }
    });

  
  
  }


  