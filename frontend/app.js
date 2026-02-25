const API_URL = 'http://localhost:8080/api';

const checkinFormScreen = document.getElementById('checkin-form');
const welcomeScreen = document.getElementById('welcome-screen');
const visitorForm = document.getElementById('visitor-form');
const errorMessage = document.getElementById('error-message');
const welcomeMessage = document.getElementById('welcome-message');
const welcomeSubtext = document.getElementById('welcome-subtext');
const visitorCompanyDisplay = document.getElementById('visitor-company-display');
const checkAnotherButton = document.getElementById('check-another');

visitorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        visitorName: document.getElementById('visitorName').value.trim(),
        visitorCompany: document.getElementById('visitorCompany').value.trim() || null,
        visitingDepartment: document.getElementById('visitingDepartment').value.trim()
    };

    if (!formData.visitorName || !formData.visitingDepartment) {
        showError('Please fill in all required fields.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/checkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to check in. Please try again.');
        }

        const data = await response.json();
        showWelcomeScreen(data);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Unable to complete check-in. Please try again or contact reception.');
    }
});

checkAnotherButton.addEventListener('click', () => {
    resetForm();
    showCheckinForm();
});

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

function showWelcomeScreen(data) {
    welcomeMessage.textContent = data.message;
    
    if (data.visitorCompany) {
        visitorCompanyDisplay.textContent = `Visiting from ${data.visitorCompany}`;
        visitorCompanyDisplay.classList.add('show');
    } else {
        visitorCompanyDisplay.classList.remove('show');
    }
    
    checkinFormScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
    
    setTimeout(() => {
        resetForm();
        showCheckinForm();
    }, 8000);
}

function showCheckinForm() {
    welcomeScreen.classList.remove('active');
    checkinFormScreen.classList.add('active');
}

function resetForm() {
    visitorForm.reset();
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}
