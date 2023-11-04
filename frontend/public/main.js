function addItem() {
  const itemName = document.getElementById('itemName').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const itemQuantity = document.getElementById('itemQuantity').value;
  const itemPrice = document.getElementById('itemPrice').value;

  const newItem = {
    name: itemName,
    description: itemDescription,
    quantity: itemQuantity,
    price: itemPrice,
  };

  fetch('/api/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Item added:', data);
      const inventoryList = document.getElementById('inventoryList');
      const listItem = document.createElement('li');
      listItem.innerHTML = `Name: ${data.name}, Quantity: ${data.quantity}
        <button onclick="updateItemQuantity(${data.id})">Update</button>`;
      inventoryList.appendChild(listItem);
    })
    .catch((error) => {
      console.error('Error adding item:', error);
    });
}

function updateItemQuantity(itemId) {
  console.log('Update button clicked for item ID:', itemId);
  fetch(`/api/inventory/${itemId}`, {
    method: 'PUT',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Item updated:', data);

      const inventoryList = document.getElementById('inventoryList');
      const itemElement = Array.from(inventoryList.children).find((item) =>
        item.innerHTML.includes(`ID: ${itemId}`)
      );
      if (itemElement) {
        const quantityElement = itemElement.querySelector('.quantity');
        quantityElement.textContent = `Quantity: ${data.quantity}`;
      }
      location.reload();
    })
    .catch((error) => {
      console.error('Error updating item:', error);
    });
}


document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/inventory')
    .then((response) => response.json())
    .then((data) => {
      const inventoryList = document.getElementById('inventoryList');
      data.inventory.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `Name: ${item.name}, Quantity: <span class="quantity">${item.quantity}</span>
          <button onclick="updateItemQuantity(${item.id})">Update</button>`;
        inventoryList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error('Error fetching inventory:', error);
    });
});
