// FoodShare - Working JavaScript with Donation Functionality
// Global variables
let currentUser = null;
let foodLocations = [];

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main initialization function
function initializeApp() {
    console.log('FoodShare app initializing...');

    // Initialize counters
    initializeCounters();

    // Initialize forms
    initializeForms();

    // Initialize animations
    initializeAnimations();

    // Load sample data
    loadSampleData();
}

// Counter animations
function initializeCounters() {
    const counters = [
        { id: 'mealsSaved', target: 1247, duration: 2000 },
        { id: 'totalDonations', target: 89, duration: 1500 },
        { id: 'mealsServed', target: 3421, duration: 2500 },
        { id: 'co2Saved', target: 567, duration: 1800 },
        { id: 'activeUsers', target: 234, duration: 1200 }
    ];

    counters.forEach(counter => {
        animateCounter(counter.id, counter.target, counter.duration);
    });
}

function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let start = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(start).toLocaleString();
    }, 16);
}

// Form initialization and handling
function initializeForms() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Add form validation
    addFormValidation();
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Demo login - accept any email/password
    currentUser = {
        name: email.split('@')[0],
        email: email,
        user_type: userType,
        id: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('foodshare_user', JSON.stringify(currentUser));

    // Update UI
    updateUIForLoggedInUser(currentUser);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    modal.hide();

    showNotification(`Welcome back, ${currentUser.name}!`, 'success');
}

function handleRegister(e) {
    e.preventDefault();

    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value;
    const location = document.getElementById('registerLocation').value;
    const userType = document.querySelector('input[name="userType"]:checked').value;

    // Validation
    if (!name || !email || !password || !phone || !location) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Demo registration - accept any data
    currentUser = {
        name: name,
        email: email,
        phone: phone,
        location: location,
        user_type: userType,
        id: Date.now()
    };

    // Save to localStorage
    localStorage.setItem('foodshare_user', JSON.stringify(currentUser));

    // Update UI
    updateUIForLoggedInUser(currentUser);

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();

    showNotification(`Welcome to FoodShare, ${currentUser.name}!`, 'success');
}

function updateUIForLoggedInUser(user) {
    // Update navigation
    const navButtons = document.querySelector('.d-flex');
    if (navButtons) {
        navButtons.innerHTML = `
            <div class="dropdown">
                <button class="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    <i class="fas fa-user me-1"></i>${user.name}
                </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#dashboard"><i class="fas fa-tachometer-alt me-2"></i>Dashboard</a></li>
                    <li><a class="dropdown-item" href="#profile"><i class="fas fa-user-edit me-2"></i>Profile</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li>
                </ul>
            </div>
        `;
    }

    // Update hero buttons based on user type
    const heroButtons = document.querySelector('.hero-section .d-flex');
    if (heroButtons) {
        if (user.user_type === 'donor') {
            heroButtons.innerHTML = `
                <button class="btn btn-warning btn-lg px-4" onclick="showDonateForm()">
                    <i class="fas fa-plus me-2"></i>Donate Food
                </button>
                <button class="btn btn-outline-light btn-lg px-4" onclick="showDashboard()">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </button>
            `;
        } else {
            heroButtons.innerHTML = `
                <button class="btn btn-warning btn-lg px-4" onclick="showFindFood()">
                    <i class="fas fa-search me-2"></i>Find Food
                </button>
                <button class="btn btn-outline-light btn-lg px-4" onclick="showDashboard()">
                    <i class="fas fa-tachometer-alt me-2"></i>Dashboard
                </button>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('foodshare_user');
    currentUser = null;
    location.reload();
}

// Load sample data
function loadSampleData() {
    foodLocations = [
        {
            id: 1,
            name: "Shimla Community Kitchen",
            address: "Mall Road, Shimla, Himachal Pradesh",
            lat: 31.1048,
            lng: 77.1734,
            food: "Fresh vegetables and traditional food",
            quantity: "45 servings",
            expiry: "2024-01-15",
            donor: "Community Kitchen Shimla",
            distance: "0 km"
        },
        {
            id: 2,
            name: "Manali Food Bank",
            address: "Old Manali, Manali, Himachal Pradesh",
            lat: 32.2396,
            lng: 77.1887,
            food: "Fruits, dairy products and bread",
            quantity: "30 servings",
            expiry: "2024-01-16",
            donor: "Manali Food Bank",
            distance: "115 km"
        },
        {
            id: 3,
            name: "Dharamshala NGO Center",
            address: "McLeod Ganj, Dharamshala, Himachal Pradesh",
            lat: 32.2190,
            lng: 76.3234,
            food: "Prepared meals and snacks",
            quantity: "25 servings",
            expiry: "2024-01-14",
            donor: "Dharamshala NGO",
            distance: "85 km"
        }
    ];
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function addFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                    this.classList.remove('is-invalid');
                }
            });
        });
    });
}

// Page navigation functions
function showDonateForm() {
    if (!currentUser) {
        showNotification('Please login to donate food', 'error');
        return;
    }

    // Create and show donate modal
    showDonateModal();
}

function showFindFood() {
    // Scroll to map section
    document.getElementById('map-section').scrollIntoView({ behavior: 'smooth' });
}

function showDashboard() {
    if (!currentUser) {
        showNotification('Please login to access dashboard', 'error');
        return;
    }

    // Create and show dashboard
    showDashboardModal();
}

// Modal creation functions
function showDonateModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-plus me-2"></i>Donate Food
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="donateForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Food Name/Type *</label>
                                <input type="text" class="form-control" id="foodName" placeholder="e.g., Fresh Vegetables" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Quantity *</label>
                                <input type="text" class="form-control" id="foodQuantity" placeholder="e.g., 50 servings" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Description *</label>
                            <textarea class="form-control" id="foodDescription" rows="3" placeholder="Describe the food items, their condition, etc." required></textarea>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Expiry Date *</label>
                                <input type="date" class="form-control" id="foodExpiry" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Pickup Location *</label>
                                <input type="text" class="form-control" id="foodLocation" placeholder="Full address for pickup" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Food Type</label>
                            <select class="form-select" id="foodType">
                                <option value="vegetables">Fresh Vegetables</option>
                                <option value="fruits">Fresh Fruits</option>
                                <option value="dairy">Dairy Products</option>
                                <option value="bakery">Bakery Items</option>
                                <option value="prepared">Prepared Meals</option>
                                <option value="canned">Canned Goods</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Additional Notes</label>
                            <textarea class="form-control" id="additionalNotes" rows="2" placeholder="Any special instructions for pickup, handling, etc."></textarea>
                        </div>

                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Note:</strong> By submitting this form, you agree to make the donated food available for pickup by verified recipients.
                        </div>

                        <div class="d-grid">
                            <button type="submit" class="btn btn-success btn-lg">
                                <i class="fas fa-paper-plane me-2"></i>Submit Donation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Set default expiry date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('foodExpiry').value = tomorrow.toISOString().split('T')[0];

    // Handle form submission
    document.getElementById('donateForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const donationData = {
            foodName: document.getElementById('foodName').value,
            quantity: document.getElementById('foodQuantity').value,
            description: document.getElementById('foodDescription').value,
            expiryDate: document.getElementById('foodExpiry').value,
            location: document.getElementById('foodLocation').value,
            foodType: document.getElementById('foodType').value,
            additionalNotes: document.getElementById('additionalNotes').value,
            donorName: currentUser.name,
            donorEmail: currentUser.email,
            timestamp: new Date().toISOString()
        };

        // Validate required fields
        if (!donationData.foodName || !donationData.quantity || !donationData.description ||
            !donationData.expiryDate || !donationData.location) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return;
        }

        // Show success message
        showDonationSuccessModal(donationData, bsModal);
    });
}

function showDonationSuccessModal(donationData, bsModal) {
    const successModal = document.createElement('div');
    successModal.className = 'modal fade';
    successModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title">
                        <i class="fas fa-check-circle me-2"></i>Donation Submitted Successfully!
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <i class="fas fa-heart fa-4x text-success mb-3"></i>
                        <h4>Thank you for your generous donation!</h4>
                        <p class="text-muted">Your donation will help feed people in need in your community.</p>
                    </div>

                    <div class="row">
                        <div class="col-sm-6">
                            <strong>Food:</strong><br>
                            ${donationData.foodName}
                        </div>
                        <div class="col-sm-6">
                            <strong>Quantity:</strong><br>
                            ${donationData.quantity}
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col-sm-6">
                            <strong>Location:</strong><br>
                            ${donationData.location}
                        </div>
                        <div class="col-sm-6">
                            <strong>Pickup By:</strong><br>
                            ${new Date(donationData.expiryDate).toLocaleDateString()}
                        </div>
                    </div>

                    <div class="alert alert-success mt-3">
                        <i class="fas fa-info-circle me-2"></i>
                        A notification has been sent to nearby recipients. You should receive pickup requests soon!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" onclick="shareDonation()">
                        <i class="fas fa-share me-2"></i>Share
                    </button>
                    <button type="button" class="btn btn-primary" onclick="makeAnotherDonation()">
                        <i class="fas fa-plus me-2"></i>Donate More
                    </button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);
    const bsSuccessModal = new bootstrap.Modal(successModal);
    bsSuccessModal.show();

    // Store donation in localStorage for demo purposes
    storeDonation(donationData);

    // Close the original modal
    bsModal.hide();
}

function storeDonation(donationData) {
    // Get existing donations
    let donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');

    // Add new donation
    donations.push(donationData);

    // Keep only last 10 donations
    if (donations.length > 10) {
        donations = donations.slice(-10);
    }

    // Save back to localStorage
    localStorage.setItem('foodshare_donations', JSON.stringify(donations));

    // Update counters
    updateCounters();
}

function updateCounters() {
    const donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');
    const totalDonations = donations.length;
    const mealsSaved = totalDonations * 15; // Estimate 15 meals per donation

    // Update counters with animation
    animateCounter('totalDonations', totalDonations, 1000);
    animateCounter('mealsSaved', mealsSaved, 1500);
}

function shareDonation() {
    if (navigator.share) {
        navigator.share({
            title: 'FoodShare Donation',
            text: 'I just donated food through FoodShare! Join the movement to reduce food waste.',
            url: window.location.origin
        });
    } else {
        // Fallback - copy to clipboard
        const text = `I just donated food through FoodShare! Join the movement to reduce food waste. ${window.location.origin}`;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Donation details copied to clipboard!', 'success');
        });
    }
}

function makeAnotherDonation() {
    // Close modal and reset form
    const modal = document.querySelector('.modal.show');
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();

    // Show donate form again
    setTimeout(() => {
        showDonateForm();
    }, 500);
}

function showDashboardModal() {
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Dashboard</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div id="dashboardContent">
                        <div class="text-center">
                            <div class="loading-spinner"></div>
                            <p>Loading dashboard...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Load dashboard data
    loadDashboardData();
}

function loadDashboardData() {
    const dashboardContent = document.getElementById('dashboardContent');

    if (currentUser.user_type === 'donor') {
        const donations = JSON.parse(localStorage.getItem('foodshare_donations') || '[]');
        const userDonations = donations.filter(d => d.donorEmail === currentUser.email);

        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">${userDonations.length}</div>
                        <div class="stat-label">Total Donations</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">${userDonations.length}</div>
                        <div class="stat-label">Active</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Claimed</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h6>Your Recent Donations</h6>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Item</th>
                                    <th>Quantity</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${userDonations.slice(-5).map(donation => `
                                    <tr>
                                        <td>${donation.foodName}</td>
                                        <td>${donation.quantity}</td>
                                        <td>${new Date(donation.timestamp).toLocaleDateString()}</td>
                                        <td><span class="badge bg-success">Active</span></td>
                                    </tr>
                                `).join('') || '<tr><td colspan="4" class="text-center">No donations yet</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    } else {
        dashboardContent.innerHTML = `
            <div class="row">
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Total Requests</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Accepted</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="dashboard-stat">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12">
                    <h6>Available Food Near You</h6>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Food Item</th>
                                    <th>Donor</th>
                                    <th>Location</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${foodLocations.slice(0, 3).map(location => `
                                    <tr>
                                        <td>${location.food}</td>
                                        <td>${location.donor}</td>
                                        <td>${location.address}</td>
                                        <td>
                                            <button class="btn btn-sm btn-success" onclick="requestFood(${location.id})">Request</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

function requestFood(foodId) {
    if (!currentUser) {
        showNotification('Please login to request food', 'error');
        return;
    }

    const food = foodLocations.find(f => f.id === foodId);
    if (!food) {
        showNotification('Food item not found', 'error');
        return;
    }

    showNotification(`Request sent for ${food.food}! The donor will contact you soon.`, 'success');
}

// Initialize animations
function initializeAnimations() {
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .card').forEach(card => {
        observer.observe(card);
    });
}

// Make functions available globally
window.showDonateForm = showDonateForm;
window.showFindFood = showFindFood;
window.showDashboard = showDashboard;
window.logout = logout;
window.requestFood = requestFood;
window.shareDonation = shareDonation;
window.makeAnotherDonation = makeAnotherDonation;
