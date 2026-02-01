// ========================================
// INDIVIDUAL REGISTRATION - Interactive Features
// ========================================

let currentStep = 1;

// Move to next step
function nextStep(step) {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }
    
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
    
    // Show next step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Move to previous step
function prevStep(step) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Show previous step
    currentStep = step;
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Validate current step
function validateStep(step) {
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
    
    let isValid = true;
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
    });
    
    if (!isValid) {
        alert('Please fill in all required fields before proceeding.');
    }
    
    return isValid;
}

// Show/hide family size based on purpose
document.getElementById('purpose')?.addEventListener('change', function() {
    const familySizeGroup = document.getElementById('familySizeGroup');
    if (this.value === 'receive' || this.value === 'both') {
        familySizeGroup.style.display = 'block';
        document.getElementById('familySize').required = true;
    } else {
        familySizeGroup.style.display = 'none';
        document.getElementById('familySize').required = false;
    }
});

// Form submission
document.getElementById('individualForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (!termsCheckbox.checked) {
        alert('Please accept the Terms & Conditions to continue.');
        return;
    }
    
    // Collect form data
    const formData = new FormData(this);
    const data = {};
    
    // Get all form values
    formData.forEach((value, key) => {
        if (key === 'dietary') {
            if (!data.dietary) data.dietary = [];
            data.dietary.push(value);
        } else {
            data[key] = value;
        }
    });
    
    // Store in localStorage (simulating backend)
    localStorage.setItem('individualData', JSON.stringify(data));
    
    // Show success message
    alert('Registration successful! Redirecting to your dashboard...');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'individual-dashboard.html';
    }, 1500);
});

// Input formatting
document.getElementById('phoneNumber')?.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
});

document.getElementById('pincode')?.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
});

document.getElementById('aadhaar')?.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 12);
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});