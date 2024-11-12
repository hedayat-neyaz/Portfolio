document.addEventListener('DOMContentLoaded', () => {
    const itemTableBody = document.getElementById('itemTableBody');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemModal = document.getElementById('itemModal');
    const closeModal = document.getElementById('closeModal');
    const itemForm = document.getElementById('itemForm');
    const modalTitle = document.getElementById('modalTitle');
    
    let editingItemId = null;
    const inventory = [];

    // Open modal to add item
    addItemBtn.addEventListener('click', () => openModal('Add Inventory Item'));

    // Close modal
    closeModal.addEventListener('click', () => closeModalFunc());

    // Add/Edit item
    itemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const itemName = document.getElementById('itemName').value;
        const itemQuantity = parseInt(document.getElementById('itemQuantity').value);
        const itemPrice = parseFloat(document.getElementById('itemPrice').value);

        if (editingItemId) {
            updateItem(editingItemId, itemName, itemQuantity, itemPrice);
        } else {
            addItem(itemName, itemQuantity, itemPrice);
        }

        itemForm.reset();
        closeModalFunc();
    });

    // Functions
    function openModal(title) {
        modalTitle.textContent = title;
        itemModal.style.display = 'flex';
    }

    function closeModalFunc() {
        itemModal.style.display = 'none';
        editingItemId = null;
    }

    function addItem(name, quantity, price) {
        const item = {
            id: Date.now(),
            name,
            quantity,
            price,
            totalValue: quantity * price
        };
        inventory.push(item);
        displayInventory();
    }

    function updateItem(id, name, quantity, price) {
        const item = inventory.find(item => item.id === id);
        if (item) {
            item.name = name;
            item.quantity = quantity;
            item.price = price;
            item.totalValue = quantity * price;
            displayInventory();
        }
    }

    function displayInventory() {
        itemTableBody.innerHTML = '';
        
        inventory.forEach((item) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${item.totalValue.toFixed(2)}</td>
                <td class="actions">
                    <button class="edit" onclick="editItem(${item.id})">Edit</button>
                    <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
            
            itemTableBody.appendChild(row);
        });
    }

    window.editItem = (id) => {
        const item = inventory.find(item => item.id === id);
        if (item) {
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemQuantity').value = item.quantity;
            document.getElementById('itemPrice').value = item.price;
            editingItemId = id;
            openModal('Edit Inventory Item');
        }
    };

    window.deleteItem = (id) => {
        const index = inventory.findIndex(item => item.id === id);
        if (index > -1) {
            inventory.splice(index, 1);
            displayInventory();
        }
    };
});
