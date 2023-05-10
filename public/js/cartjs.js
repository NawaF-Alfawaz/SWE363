

//feeding order info in order to display them
const products = document.querySelector(".ph");

function createBox([name,sku,type,price]){

let code = `
<div class="product-box box" id="product1">
                  <div class="product-image"></div>
                  <div>
                    <p class="product-text">Product Name:${name}</p>
                    <p class="product-text">SKU:${sku}</p>
                    <p class="product-text">Type:${type}</p>
                  </div>
                  <div>
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                                        <!-- add more options here -->
                </select>
                <label class="prodprice">${price}</label>
                                    <button type="button" class="btn btn-danger" onclick="removeNode1()">Delete</button>
              </div>
            </div>
`
products.innerHTML+=code;

}

//orders info 

let item1 = [" keycap "," aa "," item ","240 sar"]
let item2 = [" keycap "," aa "," item ","320 sar"]
let item3 = [" keycap "," aa "," item ","240 sar"]
let item4 = [" keycap "," aa "," item ","440 sar"]


//array of orders for total calc
let items = [item1,item2,item3,item4]



//displaying product info 
createBox(item1);
createBox(item2);
createBox(item3);
createBox(item4);



//deleting product info
  function removeNode1() {
      const myDiv = document.getElementById("product1");
      const parent = myDiv.parentNode;
      parent.removeChild(myDiv);
      console.log("product 1 removed");
  }




  const checkout = document.querySelector(".ph1");



  //calculating the total
  function calculateTotal(items) {
let total = 0;
for (let i = 0; i < items.length; i++) {
total += parseInt(items[i][items[i].length - 1]);
}
return total;
}

//displaying the total in its html div
let totalPrice = calculateTotal(items);
document.getElementById("total-price").textContent = totalPrice;



//feeding the checkout element to the checkout box
function checkoutelement([name,sku,type,price,total]){

let code = `
<p class="t">Product name : ${name}</p>
      <label class="prodprice">${price}</label>
      
`
checkout.innerHTML+=code;

}



//adding the products to checkout box
checkoutelement(item1);
checkoutelement(item2);
checkoutelement(item3);
checkoutelement(item4);







