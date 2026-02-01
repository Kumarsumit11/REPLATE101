// ========================================
// RESTAURANT DASHBOARD - Interactive Features
// ========================================

// Load user data on page load
window.addEventListener('load', () => {
    loadUserData();
    loadStats();
});

// Load user data from localStorage
function loadUserData() {
    const restaurantData = JSON.parse(localStorage.getItem('restaurantData') || '{}');
    
    if (restaurantData.restaurantName) {
        document.getElementById('userName').textContent = restaurantData.restaurantName;
        document.getElementById('restaurantName').textContent = restaurantData.restaurantName;
        document.getElementById('restaurantPhone').textContent = restaurantData.phoneNumber || 'Not provided';
        document.getElementById('restaurantEmail').textContent = restaurantData.email || 'Not provided';
        document.getElementById('restaurantAddress').textContent = restaurantData.address || 'Not provided';
    }
}

// Load statistics
function loadStats() {
    // Simulate loading stats (in real app, this would come from backend)
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    
    document.getElementById('totalDonations').textContent = donations.length + 3;
    document.getElementById('activeDonations').textContent = donations.length;
    document.getElementById('foodSaved').textContent = (donations.length * 15 + 45) + ' kg';
    document.getElementById('co2Saved').textContent = (donations.length * 8 + 24) + ' kg';
}

// Sidebar navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show selected page
        const pageId = this.dataset.page;
        document.getElementById(pageId).classList.add('active');
    });
});

// Donation Modal
function openDonationModal() {
    document.getElementById('donationModal').classList.add('active');
}

function closeDonationModal() {
    document.getElementById('donationModal').classList.remove('active');
    document.getElementById('donationForm').reset();
}

// Handle donation form submission
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const foodItem = document.getElementById('foodItem').value;
    const quantity = document.getElementById('quantity').value;
    const description = document.getElementById('description').value;
    const pickupTime = document.getElementById('pickupTime').value;
    
    // Create donation object
    const donation = {
        id: Date.now(),
        foodItem,
        quantity,
        description,
        pickupTime,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
    
    // Update UI
    alert('Food donation listed successfully!');
    closeDonationModal();
    loadStats();
    loadDonations();
});

// Load donations
function loadDonations() {
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const donationsGrid = document.getElementById('donationsGrid');
    
    if (donations.length === 0) {
        donationsGrid.innerHTML = '<p class="empty-state">No active donations. Click "List New Food" to get started!</p>';
        return;
    }
    
    donationsGrid.innerHTML = donations.map(donation => `
        <div class="stat-card">
            <div>
                <h3>${donation.foodItem}</h3>
                <p><strong>Quantity:</strong> ${donation.quantity} kg</p>
                <p><strong>Status:</strong> <span class="status-badge success">Active</span></p>
            </div>
        </div>
    `).join('');
}

// Close modal on outside click
document.getElementById('donationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDonationModal();
    }
});

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Load donations when donations page is active
document.querySelector('[data-page="donations"]').addEventListener('click', loadDonations);