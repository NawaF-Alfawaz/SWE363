// List of orders (replace this with your own list of orders)
const orders = [
    { id: 1234, date: '2022-03-27', total: 24.99, items: 2, details: 'Additional order details here...' },
    { id: 1235, date: '2022-03-26', total: 12.99, items: 1, details: 'Additional order details here...' },
    { id: 1235, date: '2022-03-26', total: 12.99, items: 1, details: 'Additional order details here...' },
    { id: 1235, date: '2022-03-26', total: 12.99, items: 1, details: 'Additional order details here...' },
    { id: 1236, date: '2022-03-25', total: 35.99, items: 3, details: 'Additional order details here...' }
  ];
  
  // Get the container element to hold the order cards
  const ordersContainer = document.getElementById('ordersContainer');
  
  // Loop through the orders and create a card for each order
  orders.forEach(order => {
    // Create the card element
    const card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.setAttribute('id', 'card-order');
  
    // Create the card body element
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    // Create the card title element with title and date
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');

    // Add title and date to the same paragraph
    const titleAndDate = document.createElement('p');
    titleAndDate.textContent = `Order #${order.id}`;
    titleAndDate.style.display = 'flex';
    titleAndDate.style.justifyContent = 'space-between';
    titleAndDate.style.alignItems = 'center';
    cardTitle.appendChild(titleAndDate);

    const date = document.createElement('span');
    date.textContent = order.date;
    date.style.marginLeft = '1rem';
    date.style.fontSize = '1rem';
    titleAndDate.appendChild(date);
  
    // Create the card text element for total price
    const cardText1 = document.createElement('p');
    cardText1.classList.add('card-text');
    cardText1.textContent = `Total: $${order.total.toFixed(2)}`;
  
    // Create the card text element for number of items
    const cardText2 = document.createElement('p');
    cardText2.classList.add('card-text');
    cardText2.textContent = `Items: ${order.items}`;
  
    // Create the card button for order details modal
    const cardButton = document.createElement('button');
    cardButton.classList.add('btn', 'btn-primary');
    cardButton.setAttribute('type', 'button');
    cardButton.setAttribute('data-bs-toggle', 'modal');
    cardButton.setAttribute('data-bs-target', '#orderModal');
    cardButton.addEventListener('click', () => {
      const orderDetails = document.getElementById('orderDetails');
      orderDetails.textContent = order.details;
    });
    cardButton.textContent = 'Order Details';
  
    // Append the card title, card text, and card button to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText1);
    cardBody.appendChild(cardText2);
    cardBody.appendChild(cardButton);
  
    // Append the card body to the card
    card.appendChild(cardBody);
  
    // Append the card to the container
    ordersContainer.appendChild(card);
  });
