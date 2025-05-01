document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const yourWhatsAppNumber = '2448138813159'; // IMPORTANT: Your WhatsApp number with country code (no '+' or spaces)

    // --- Get HTML Elements ---
    const orderButton = document.getElementById('order-button');
    const productItems = document.querySelectorAll('.product-item'); // Gets all product divs
    const customerNameInput = document.getElementById('customer-name');
    const customerPhoneInput = document.getElementById('customer-phone');
    const customerAddressInput = document.getElementById('customer-address');

    // --- Add Event Listener to Button ---
    orderButton.addEventListener('click', () => {
        let orderSummary = "Hello! I'd like to place a Kulikuli order:\n\n*Order Items:*\n";
        let totalQuantity = 0;

        // --- Loop through each product ---
        productItems.forEach(item => {
            const productName = item.getAttribute('data-product-name'); // Get product name from data attribute
            const quantityInput = item.querySelector('input[type="number"]'); // Find the quantity input within this product item
            const quantity = parseInt(quantityInput.value, 10); // Get the quantity as a number

            if (quantity > 0) {
                orderSummary += `- ${productName}: ${quantity}\n`;
                totalQuantity += quantity;
            }
        });

        // --- Validate if any product was selected ---
        if (totalQuantity === 0) {
            alert("Please select the quantity for at least one product.");
            return; // Stop the function here
        }

        // --- Get Customer Details ---
        const customerName = customerNameInput.value.trim();
        const customerPhone = customerPhoneInput.value.trim();
        const customerAddress = customerAddressInput.value.trim();

        // --- Validate Customer Details ---
        if (!customerName || !customerPhone || !customerAddress) {
            alert("Please fill in your Name, Phone Number, and Delivery Address.");
            return; // Stop the function here
        }

        // --- Add Customer Details to Summary ---
        orderSummary += `\n*Customer Details:*\n`;
        orderSummary += `Name: ${customerName}\n`;
        orderSummary += `Phone: ${customerPhone}\n`;
        orderSummary += `Address: ${customerAddress}\n`;
        orderSummary += `\nLooking forward to hearing from you!`; // Optional closing message

        // --- Construct WhatsApp URL ---
        const encodedMessage = encodeURIComponent(orderSummary); // Encode the message for the URL
        const whatsappURL = `https://wa.me/${yourWhatsAppNumber}?text=${encodedMessage}`;

        // --- Redirect to WhatsApp ---
        window.open(whatsappURL, '_blank'); // Open WhatsApp in a new tab/window
    });
});
