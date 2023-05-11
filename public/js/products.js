function search() {
  var input, filter, ul, li, i, txtValue;
  input = document.getElementById("search-input");
  filter = input.value.toUpperCase();
  for (i = 0; i < document.querySelectorAll(".card-title").length; i++) {
    ul = document.querySelectorAll(".card-title")[i].innerHTML.toUpperCase();
    if(filter === ul){
      document.querySelectorAll(".card")[i].style.display = "block";
    }
    else{
      document.querySelectorAll(".card")[i].style.display = "none";

    }
}
}




// Get a reference to the HTML element
for (let index = 0; index < document.querySelectorAll('.card').length; index++) {
  const myElement = document.querySelectorAll('.card')[index];

  // Add an event listener to the element
  myElement.addEventListener('click', function () {
    // Navigate to the new page
    window.location.href = 'product-generic.ejs';
  });

}



const filterType = document.querySelectorAll('.filter-type');
const filterButton = document.querySelector('#filter-button');
const cards = document.querySelectorAll('.card');

filterButton.addEventListener('click', () => {
  // Get selected filter types
  const selectedTypes = Array.from(filterType).filter(el => el.checked).map(el => el.value);
  console.log('Selected types:', selectedTypes);

  // Loop through all cards and show/hide based on filters
  cards.forEach(card => {
    const type = card.dataset.type;

    const showType = selectedTypes.includes(type);

    console.log(`Card type: ${type}, showType: ${showType}`);

    if (showType) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});


//////////////////////////////
const products = document.querySelectorAll('.card');

function filterByPrice(price) {
  products.forEach((product) => {
    const productPrice = Number(product.querySelector('.card-text').textContent.slice(1));
    if (productPrice > price) {
      product.style.display = 'none';
    } else {
      product.style.display = 'block';
    }
  });
}

const filterPriceRange = document.querySelector('#filter-price');
filterPriceRange.addEventListener('input', () => {
  const priceValue = filterPriceRange.value;
  filterByPrice(priceValue);
});

// Initial filter trigger
filterButton.click();
