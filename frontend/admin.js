const API_URL = 'http://localhost:8080/api';
const ADMIN_PASSWORD = 'admin123';

const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const logoutBtn = document.getElementById('logout-btn');
const searchInput = document.getElementById('search-input');
const dateFilter = document.getElementById('date-filter');
const clearFilterBtn = document.getElementById('clear-filter');
const visitorsTbody = document.getElementById('visitors-tbody');
const visitorCountSpan = document.getElementById('visitor-count');
const noDataDiv = document.getElementById('no-data');
const loadingDiv = document.getElementById('loading');

let allVisitors = [];
let filteredVisitors = [];
let refreshInterval;

// Check if already logged in
if (localStorage.getItem('adminLoggedIn') === 'true') {
    showDashboard();
}

// Login form handler
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_PASSWORD) {
        localStorage.setItem('adminLoggedIn', 'true');
        showDashboard();
    } else {
        showLoginError('Invalid password. Try again.');
    }
});

// Logout handler
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminLoggedIn');
    clearInterval(refreshInterval);
    showLogin();
});

// Search handler
searchInput.addEventListener('input', () => {
    filterVisitors();
});

// Date filter handler
dateFilter.addEventListener('change', () => {
    filterVisitors();
});

// Clear filter handler
clearFilterBtn.addEventListener('click', () => {
    searchInput.value = '';
    dateFilter.value = '';
    filterVisitors();
});

function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('show');
    
    setTimeout(() => {
        loginError.classList.remove('show');
    }, 3000);
}

function showLogin() {
    loginScreen.classList.add('active');
    dashboardScreen.classList.remove('active');
    document.getElementById('password').value = '';
}

function showDashboard() {
    loginScreen.classList.remove('active');
    dashboardScreen.classList.add('active');
    loadVisitors();
    
    // Auto-refresh every 30 seconds
    refreshInterval = setInterval(() => {
        loadVisitors();
    }, 30000);
}

async function loadVisitors() {
    try {
        showLoading();
        
        let url = `${API_URL}/visitors`;
        const dateValue = dateFilter.value;
        
        if (dateValue) {
            url += `?date=${dateValue}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to load visitors');
        }
        
        allVisitors = await response.json();
        filterVisitors();
        
    } catch (error) {
        console.error('Error loading visitors:', error);
        hideLoading();
        showNoData();
    }
}

function filterVisitors() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    filteredVisitors = allVisitors.filter(visitor => {
        const nameMatch = visitor.visitorName.toLowerCase().includes(searchTerm);
        const companyMatch = visitor.visitorCompany 
            ? visitor.visitorCompany.toLowerCase().includes(searchTerm)
            : 'personal visit'.includes(searchTerm);
        
        return nameMatch || companyMatch;
    });
    
    renderVisitors();
}

function renderVisitors() {
    hideLoading();
    
    if (filteredVisitors.length === 0) {
        showNoData();
        visitorCountSpan.textContent = '0';
        return;
    }
    
    hideNoData();
    visitorCountSpan.textContent = filteredVisitors.length;
    
    visitorsTbody.innerHTML = filteredVisitors.map(visitor => {
        const company = visitor.visitorCompany || 'Personal Visit';
        const checkinTime = formatDateTime(visitor.checkinTime);
        const statusClass = visitor.status === 'checked-in' ? 'status-checked-in' : 'status-checked-out';
        const statusText = visitor.status === 'checked-in' ? 'Checked In' : 'Checked Out';
        
        return `
            <tr>
                <td>${escapeHtml(visitor.visitorName)}</td>
                <td>${escapeHtml(company)}</td>
                <td>${escapeHtml(visitor.visitingDepartment)}</td>
                <td>${checkinTime}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    }).join('');
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showLoading() {
    loadingDiv.classList.add('show');
    noDataDiv.classList.remove('show');
}

function hideLoading() {
    loadingDiv.classList.remove('show');
}

function showNoData() {
    noDataDiv.classList.add('show');
    visitorsTbody.innerHTML = '';
}

function hideNoData() {
    noDataDiv.classList.remove('show');
}
