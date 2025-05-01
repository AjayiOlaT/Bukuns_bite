document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const yourWhatsAppNumber = '2448138813159'; // Your number

    // --- Get HTML Elements ---
    const orderButton = document.getElementById('order-button');
    const productItems = document.querySelectorAll('.product-item'); // All product divs
    const customerNameInput = document.getElementById('customer-name');
    const customerPhoneInput = document.getElementById('customer-phone');
    const customerAddressInput = document.getElementById('customer-address');

    // --- Modal Elements ---
    const modal = document.getElementById('product-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalPrice = document.getElementById('modal-price');
    const modalDescription = document.getElementById('modal-description');
    const closeModalButton = document.querySelector('.modal-close-button');
    const clickableProducts = document.querySelectorAll('.product-clickable'); // Clickable product divs

    // --- Function to Open Modal ---
    function openModal(productElement) {
        // Get data from the clicked product's data-* attributes
        const name = productElement.getAttribute('data-product-name');
        const price = productElement.getAttribute('data-price');
        const image = productElement.getAttribute('data-image');
        const description = productElement.getAttribute('data-description');

        // Populate modal content
        modalTitle.textContent = name;
        modalPrice.textContent = `Price: ${price}`; // Add 'Price: ' prefix
        modalImage.src = image;
        modalImage.alt = name; // Set alt text
        modalDescription.textContent = description;

        // Show the modal
        modal.style.display = 'block';
    }

    // --- Function to Close Modal ---
    function closeModal() {
        modal.style.display = 'none';
    }

    // --- Event Listeners for Modal ---
    // 1. Open modal when a product is clicked
    clickableProducts.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent clicks on the input field from opening the modal
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'label') {
                 openModal(item);
            }
        });
    });

    // 2. Close modal when the close button (X) is clicked
    closeModalButton.addEventListener('click', closeModal);

    // 3. Close modal when clicking outside the modal content (on the overlay)
    window.addEventListener('click', (event) => {
        if (event.target == modal) { // If the click target IS the modal background itself
            closeModal();
        }
    });

    // --- Event Listener for WhatsApp Order Button (Existing Logic) ---
    orderButton.addEventListener('click', () => {
        let orderSummary = "Hello! I'd like to place a Kulikuli order:\n\n*Order Items:*\n";
        let totalQuantity = 0;

        // Loop through each product item on the main page to get quantities
        productItems.forEach(item => {
            const productName = item.getAttribute('data-product-name'); // Use data attribute
            const quantityInput = item.querySelector('input[type="number"]');
            const quantity = parseInt(quantityInput.value, 10);

            if (quantity > 0) {
                orderSummary += `- ${productName}: ${quantity}\n`;
                totalQuantity += quantity;
            }
        });

        if (totalQuantity === 0) {
            alert("Please select the quantity for at least one product.");
            return;
        }

        const customerName = customerNameInput.value.trim();
        const customerPhone = customerPhoneInput.value.trim();
        const customerAddress = customerAddressInput.value.trim();

        if (!customerName || !customerPhone || !customerAddress) {
            alert("Please fill in your Name, Phone Number, and Delivery Address.");
            return;
        }

        orderSummary += `\n*Customer Details:*\n`;
        orderSummary += `Name: ${customerName}\n`;
        orderSummary += `Phone: ${customerPhone}\n`;
        orderSummary += `Address: ${customerAddress}\n`;
        orderSummary += `\nLooking forward to hearing from you!`;

        const encodedMessage = encodeURIComponent(orderSummary);
        const whatsappURL = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, '_blank');
    });
});
