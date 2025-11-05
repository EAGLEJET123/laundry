 // Mobile Menu Toggle
    document.querySelector('.mobile-toggle').addEventListener('click', function() {
        document.querySelector('.mobile-menu').classList.toggle('active');
    });
    
    // Close menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            document.querySelector('.mobile-menu').classList.remove('active');
        }
    });
    
    // Add scrolling animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
// Pricing Calculator Functionality
        document.getElementById('calculate-btn').addEventListener('click', function() {
            const serviceType = document.getElementById('service-type').value;
            const weight = parseFloat(document.getElementById('item-weight').value) || 5;
            const location = document.getElementById('location').value;
            
            // Base prices in Naira
            let price = 0;
            
            switch(serviceType) {
                case 'wash_fold':
                    price = weight * 300; // ₦300 per kg
                    break;
                case 'dryclean':
                    price = weight * 1200; // ₦1200 per item
                    break;
                case 'ironing':
                    price = weight * 300; // ₦300 per item
                    break;
                case 'stain':
                    price = 800 + (weight * 200); // Base + per item
                    break;
            }
            
            // Location premium
            if (location === 'lagos' || location === 'abuja') {
                price += 500; // Premium for major cities
            }
            
            // Display result
            document.querySelector('.result-price').textContent = `₦ ${price.toLocaleString('en-NG')}`;
        });
        
        // Initialize calculator
        document.getElementById('calculate-btn').click();
      
        // WhatsApp Order Functionality
        document.getElementById('place-order-btn').addEventListener('click', function() {
            const serviceType = document.getElementById('service-type').value;
            const weight = document.getElementById('item-weight').value;
            const location = document.getElementById('location').value;
            const price = document.querySelector('.result-price').textContent;
            
            // Get service name from value
            const serviceNames = {
                'wash_fold': 'Wash & Fold',
                'dryclean': 'Dry Cleaning',
                'ironing': 'Ironing Service',
                'stain': 'Stain Removal'
            };
            
            const serviceName = serviceNames[serviceType] || 'Laundry Service';
            
            // Create WhatsApp message - FIXED SYNTAX
            const message = encodeURIComponent(
                `NEW LAUNDRY ORDER:\n\n` +
                `Service: ${serviceName}\n` +
                `Items/Weight: ${weight}\n` +
                `Location: ${location}\n` +
                `Estimated Price: ${price}\n\n` +
                `ORDER DETAILS:\n` +
                `[Customer Name]: \n` +
                `[Pickup Address]: \n` +
                `[Preferred Date]: \n` +
                `[Special Instructions]: `
            );
            
            // Replace with your WhatsApp business number (remove spaces)
            const whatsappNumber = '2348123456789'; 
            
            // Open WhatsApp - FIXED SYNTAX
            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
            
            // Show notification
            const notification = document.getElementById('orderNotification');
            notification.style.display = 'block';
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
            
            // Save to order history
            saveToOrderHistory(serviceName, weight, location, price);
        });
        
        // Order History Functions
        function saveToOrderHistory(service, quantity, location, price) {
            // Get existing orders or initialize
            let orders = JSON.parse(localStorage.getItem('laundryOrders')) || [];
            
            // Create new order object
            const newOrder = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                service,
                quantity,
                location,
                price,
                status: 'SENT'
            };
            
            // Add to orders array
            orders.unshift(newOrder);
            
            // Save to localStorage
            localStorage.setItem('laundryOrders', JSON.stringify(orders));
            
            // Update order count
            updateOrderCount();
            
            // Refresh history if modal is open
            if (document.getElementById('orderHistoryModal').style.display === 'block') {
                displayOrderHistory();
            }
        }
        
        function updateOrderCount() {
            const orders = JSON.parse(localStorage.getItem('laundryOrders')) || [];
            const countElement = document.querySelector('.order-count');
            countElement.textContent = orders.length;
        }
        
        // Initialize order count
        document.addEventListener('DOMContentLoaded', updateOrderCount);
        
        // Order History Modal Functions
        // Order History Modal Functions
document.getElementById('orderHistoryIcon').addEventListener('click', function(e) {
    e.preventDefault();
    const modal = document.getElementById('orderHistoryModal');
    modal.classList.add('show'); // Slide in
    displayOrderHistory();
});

// Close modal functionality
document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('orderHistoryModal').classList.remove('show'); // Slide out
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('orderHistoryModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});
function displayOrderHistory() {
    const orderListContainer = document.getElementById('orderHistoryList');
    const orders = JSON.parse(localStorage.getItem('laundryOrders')) || [];

    // Clear previous display
    orderListContainer.innerHTML = '';

    if (orders.length === 0) {
        orderListContainer.innerHTML = `
            <p style="text-align:center; color:gray;">No orders yet.</p>
        `;
        return;
    }

    orders.forEach(order => {
        const item = document.createElement('div');
        item.classList.add('order-item');
        item.innerHTML = `
            <div class="order-header">
                <span>${order.service}</span>
                <span class="order-status">${order.status}</span>
            </div>
            <div class="order-details">
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Quantity:</strong> ${order.quantity}</p>
                <p><strong>Location:</strong> ${order.location}</p>
                <p><strong>Price:</strong> ${order.price}</p>
            </div>
        `;
        orderListContainer.appendChild(item);
    });
}

// Function to scroll to an element
function scrollToElement(el_id) {
  // Get the element by its ID
  const el = document.getElementById(el_id);
  // Use scrollIntoView with smooth behavior
  el.scrollIntoView({
    behavior: "smooth"
  });
}

// Example: Call the function when a link is clicked
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const el_id = this.getAttribute('href').substring(1);
    scrollToElement(el_id);
  });
});
