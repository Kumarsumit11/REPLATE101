// INDIVIDUAL DASHBOARD JavaScript
window.addEventListener('load', () => {
    loadUserData();
});

function loadUserData() {
    const individualData = JSON.parse(localStorage.getItem('individualData') || '{}');
    
    if (individualData.fullName) {
        document.getElementById('userName').textContent = individualData.fullName;
        document.getElementById('fullName').textContent = individualData.fullName;
        document.getElementById('userPhone').textContent = individualData.phoneNumber || 'Not provided';
        document.getElementById('userEmail').textContent = individualData.email || 'Not provided';
        document.getElementById('userCity').textContent = individualData.city || 'Not provided';
    }
}

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const pageId = this.dataset.page;
        document.getElementById(pageId).classList.add('active');
    });
});

function openDonateModal() {
    alert('Donation feature coming soon!');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}