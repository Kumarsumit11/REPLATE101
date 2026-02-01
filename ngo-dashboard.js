// NGO DASHBOARD JavaScript
window.addEventListener('load', () => {
    loadUserData();
});

function loadUserData() {
    const ngoData = JSON.parse(localStorage.getItem('ngoData') || '{}');
    
    if (ngoData.ngoName) {
        document.getElementById('userName').textContent = ngoData.ngoName;
        document.getElementById('ngoName').textContent = ngoData.ngoName;
        document.getElementById('ngoPhone').textContent = ngoData.phoneNumber || 'Not provided';
        document.getElementById('ngoEmail').textContent = ngoData.email || 'Not provided';
        document.getElementById('ngoAddress').textContent = ngoData.address || 'Not provided';
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

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}