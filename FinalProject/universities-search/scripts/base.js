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

//deletar
function showPage(pageId) {
  // Hide all pages
  $$('.page').forEach(page => page.style.display = 'none');
  
  // Show selected page
  const targetPage = $(`#${pageId}`);
  if (targetPage) {
    targetPage.style.display = 'block';
    appState.currentPage = pageId;
  }
}

// Navigation functions
function navigateToSearch(query = '') {
  appState.searchQuery = query;
  showPage('main-page');
  initializeMainPage();
}

function navigateToLogin() {
  showPage('login-page');
  initializeLoginPage();
}

function navigateToHome() {
  showPage('index-page');
  initializeIndexPage();
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

// Main page functionality
function initializeMainPage() {
  setupSearchFunctionality();
  setupFilters();
  renderUniversities();
  updateResultsCount();
}



// Modal functionality
function openUniversityModal(universityId) {
  const university = mockUniversities.find(u => u.id === universityId);
  if (!university) return;

  appState.selectedUniversity = university;
  
  const modal = $('#university-modal');
  const overlay = $('#modal-overlay');
  
  if (modal && overlay) {
    // Populate modal content
    populateModalContent(university);
    
    // Show modal
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeUniversityModal() {
  const modal = $('#university-modal');
  const overlay = $('#modal-overlay');
  
  if (modal && overlay) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
    appState.selectedUniversity = null;
  }
}

function populateModalContent(university) {
  const modalTitle = $('#modal-title');
  const modalContent = $('#modal-content');
  
  if (modalTitle) {
    modalTitle.textContent = university.name;
  }
  
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="space-y-6">
        <!-- Basic Info -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-center text-gray-600">
              <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>${university.location}</span>
            </div>
            
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded">${university.type}</span>
              <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">Ranking #${university.ranking}</span>
              ${university.cpt_day_one ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">CPT Day 1 Available</span>' : ''}
              ${university.mpower_eligible ? '<span class="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded">MPOWER Eligible</span>' : ''}
            </div>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-semibold text-gray-900 mb-2">Quick Stats</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Annual Tuition:</span>
                <span class="font-semibold">${university.tuition}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Acceptance Rate:</span>
                <span class="font-semibold">${university.acceptance_rate}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Programs Available:</span>
                <span class="font-semibold">${university.programs.length}+</span>
              </div>
            </div>
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <!-- International Student Features -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-4 text-lg">International Student Benefits</h4>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              ${university.cpt_day_one ? 
                '<svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' :
                '<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
              }
              <span class="${university.cpt_day_one ? 'text-gray-900' : 'text-gray-500'}">CPT from Day One</span>
            </div>
            
            <div class="flex items-center space-x-3">
              ${university.mpower_eligible ? 
                '<svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>' :
                '<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
              }
              <span class="${university.mpower_eligible ? 'text-gray-900' : 'text-gray-500'}">MPOWER Financing</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-gray-900">English Proficiency Support</span>
            </div>
            
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span class="text-gray-900">International Student Services</span>
            </div>
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <!-- Available Programs -->
        <div>
          <h4 class="font-semibold text-gray-900 mb-4 text-lg">Popular Programs</h4>
          <div class="flex flex-wrap gap-2">
            ${university.programs.map(program => `<span class="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded">${program}</span>`).join('')}
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <!-- Action Buttons -->
        <div class="flex space-x-4 pt-4">
          <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
            <svg class="h-4 w-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
            Visit Official Website
          </button>
          <button class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded transition-colors duration-200">
            Add to Favorites
          </button>
        </div>
      </div>
    `;
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
  window.location.href = "pages/search.html";
}