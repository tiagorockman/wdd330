// University Finder - Complete JavaScript Implementation


// Utility functions
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}



// Index page functionality
// function initializeIndexPage() {
//   const searchInput = $('#index-search-input');
//   const searchButton = $('#index-search-button');
//   const signInButton = $('#index-signin-button');

//   if (searchInput) {
//     searchInput.addEventListener('keypress', (e) => {
//       if (e.key === 'Enter') {
//         navigateToSearch(searchInput.value);
//       }
//     });
//   }

//   if (searchButton) {
//     searchButton.addEventListener('click', () => {
//       navigateToSearch(searchInput ? searchInput.value : '');
//     });
//   }

//   if (signInButton) {
//     signInButton.addEventListener('click', navigateToLogin);
//   }
// }

// Login page functionality
function initializeLoginPage() {
  const loginForm = $('#login-form');
  const googleLoginButton = $('#google-login-button');
  const backToHomeButton = $('#back-to-home');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Mock login - in real app, this would authenticate
      appState.user = { email: $('#login-email').value };
      navigateToSearch();
    });
  }

  if (googleLoginButton) {
    googleLoginButton.addEventListener('click', () => {
      // Mock Google login
      appState.user = { email: 'user@gmail.com' };
      navigateToSearch();
    });
  }

  if (backToHomeButton) {
    backToHomeButton.addEventListener('click', navigateToHome);
  }
}


// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains('dark');
  
  if (isDark) {
    body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Toast notification system
function showToast(message, type = 'info') {
  const toastContainer = $('#toast-container') || createToastContainer();
  
  const toast = createElement('div', `toast toast-${type} opacity-0 transform translate-y-2 transition-all duration-300`);
  toast.innerHTML = `
    <div class="flex items-center space-x-2">
      <span>${message}</span>
      <button onclick="dismissToast(this)" class="ml-2 text-gray-400 hover:text-gray-600">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
  }, 100);
  
  // Auto dismiss after 5 seconds
  setTimeout(() => {
    dismissToast(toast.querySelector('button'));
  }, 5000);
}

function createToastContainer() {
  const container = createElement('div', 'fixed top-4 right-4 z-50 space-y-2');
  container.id = 'toast-container';
  document.body.appendChild(container);
  return container;
}

function dismissToast(button) {
  const toast = button.closest('.toast');
  toast.classList.add('opacity-0', 'translate-y-2');
  setTimeout(() => {
    toast.remove();
  }, 300);
}

// Initialize application
function initializeApp() {
  // Check for saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }
  
  // Set up global event listeners
  setupGlobalEventListeners();
  
  // Initialize the current page
  const currentPage = window.location.hash.slice(1) || 'index';
  showPage(currentPage + '-page');
  
  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    const page = window.location.hash.slice(1) || 'index';
    showPage(page + '-page');
  });
}

function setupGlobalEventListeners() {
  // Modal overlay click to close
  const overlay = $('#modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeUniversityModal();
      }
    });
  }
  
  // Close modal button
  const closeModalButton = $('#close-modal-button');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeUniversityModal);
  }
  
  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appState.selectedUniversity) {
      closeUniversityModal();
    }
  });
  
  // Theme toggle button
  const themeToggle = $('#theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
}

// Utility functions for form validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}
/*
function showFormError(fieldId, message) {
  const field = $(fieldId);
  const errorElement = $(`${fieldId}-error`) || createElement('div', 'text-red-500 text-sm mt-1');
  errorElement.id = `${fieldId}-error`;
  errorElement.textContent = message;
  
  if
  */

function findUniversities(){
  const searchValue = document.getElementById("home-search");
  localStorage.setItem("searchValue", searchValue.value);
  navigateToSearch();
}

function navigateToHome(){
   const basePath = window.location.pathname.split('/').includes('wdd330') ? '/wdd330' : '';
  window.location.href = `${basePath}/index.html`;
}

function navigateToLogin(){
   const basePath = window.location.pathname.split('/').includes('wdd330') ? '/wdd330' : '';
    location.href = `${basePath}/pages/login.html`;
}

function navigateToSearch(){
  const basePath = window.location.pathname.split('/').includes('wdd330') ? '/wdd330' : '';
   window.location.href = `${basePath}/pages/search.html`;
}