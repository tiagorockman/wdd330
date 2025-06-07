// Mock data for universities
const mockUniversities = [
  {
    id: 1,
    name: "University of Southern California",
    location: "Los Angeles, CA",
    tuition: "$63,468/year",
    ranking: 25,
    type: "Private",
    acceptance_rate: "11%",
    cpt_day_one: true,
    mpower_eligible: true,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    programs: ["Computer Science", "Business", "Engineering", "Medicine", "Film"]
  },
  {
    id: 2,
    name: "Arizona State University",
    location: "Tempe, AZ",
    tuition: "$31,200/year",
    ranking: 117,
    type: "Public",
    acceptance_rate: "88%",
    cpt_day_one: true,
    mpower_eligible: false,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    programs: ["Business", "Engineering", "Computer Science", "Psychology"]
  },
  {
    id: 3,
    name: "Northeastern University",
    location: "Boston, MA",
    tuition: "$59,100/year",
    ranking: 49,
    type: "Private",
    acceptance_rate: "18%",
    cpt_day_one: true,
    mpower_eligible: true,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    programs: ["Computer Science", "Business", "Engineering", "Health Sciences"]
  },
  {
    id: 4,
    name: "University of Illinois Chicago",
    location: "Chicago, IL",
    tuition: "$35,000/year",
    ranking: 82,
    type: "Public",
    acceptance_rate: "79%",
    cpt_day_one: false,
    mpower_eligible: true,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    programs: ["Medicine", "Engineering", "Business", "Public Health"]
  }
];

// Application state
let appState = {
  currentPage: 'index',
  searchQuery: '',
  filteredUniversities: [...mockUniversities],
  selectedUniversity: null,
  filters: {
    state: '',
    type: '',
    tuitionRange: '',
    cptDayOne: false,
    mpowerEligible: false,
    ranking: ''
  },
  user: null
};

window.onload = () =>{
  initializeSearchPage();
}


function initializeSearchPage() {
  setupSearchFunctionality();
  setupFilters();
  renderUniversities();
  updateResultsCount();
}

function setupSearchFunctionality() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const backToHomeButton = document.getElementById('back-to-home');

  if (searchInput) {
    searchInput.value = appState.searchQuery;
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener('click', performSearch);
  }

  if (backToHomeButton) {
    backToHomeButton.addEventListener('click', navigateToHome);
  }
}

function setupFilters() {
  const typeSelect = document.querySelector('#type-filter');
  const tuitionSelect = document.querySelector('#tuition-filter');
  const cptCheckbox = document.querySelector('#cpt-filter');
  const mpowerCheckbox = document.querySelector('#mpower-filter');
  const applyFiltersButton = document.querySelector('#apply-filters-button');

  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      appState.filters.type = e.target.value;
      performSearch();
    });
  }

  if (tuitionSelect) {
    tuitionSelect.addEventListener('change', (e) => {
      appState.filters.tuitionRange = e.target.value;
      performSearch();
    });
  }

  if (cptCheckbox) {
    cptCheckbox.addEventListener('change', (e) => {
      appState.filters.cptDayOne = e.target.checked;
      performSearch();
    });
  }

  if (mpowerCheckbox) {
    mpowerCheckbox.addEventListener('change', (e) => {
      appState.filters.mpowerEligible = e.target.checked;
      performSearch();
    });
  }

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener('click', performSearch);
  }
}

function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (innerHTML) element.innerHTML = innerHTML;
  return element;
}

function performSearch() {
  const searchInput = document.querySelector('#main-search-input');
  if (searchInput) {
    appState.searchQuery = searchInput.value;
  }

  let filtered = [...mockUniversities];

  // Apply search query filter
  if (appState.searchQuery.trim()) {
    const query = appState.searchQuery.toLowerCase();
    filtered = filtered.filter(uni => 
      uni.name.toLowerCase().includes(query) ||
      uni.location.toLowerCase().includes(query) ||
      uni.programs.some(program => program.toLowerCase().includes(query))
    );
  }

  // Apply type filter
  if (appState.filters.type && appState.filters.type !== 'all') {
    filtered = filtered.filter(uni => uni.type === appState.filters.type);
  }

  // Apply tuition range filter
  if (appState.filters.tuitionRange && appState.filters.tuitionRange !== 'any') {
    filtered = filtered.filter(uni => {
      const tuition = parseInt(uni.tuition.replace(/[^0-9]/g, ''));
      switch (appState.filters.tuitionRange) {
        case 'under30k':
          return tuition < 30000;
        case '30k-50k':
          return tuition >= 30000 && tuition <= 50000;
        case 'over50k':
          return tuition > 50000;
        default:
          return true;
      }
    });
  }

  // Apply CPT Day One filter
  if (appState.filters.cptDayOne) {
    filtered = filtered.filter(uni => uni.cpt_day_one);
  }

  // Apply MPOWER filter
  if (appState.filters.mpowerEligible) {
    filtered = filtered.filter(uni => uni.mpower_eligible);
  }

  appState.filteredUniversities = filtered;
  renderUniversities();
  updateResultsCount();
}

function renderUniversities() {
  const container = document.querySelector('#universities-container');
  if (!container) return;

  container.innerHTML = '';

  if (appState.filteredUniversities.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 text-center py-12">
        <p class="text-xl text-gray-500 mb-2">No universities found</p>
        <p class="text-gray-400">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  appState.filteredUniversities.forEach(university => {
    const card = createUniversityCard(university);
    container.appendChild(card);
  });
}

function createUniversityCard(university) {
  const card = createElement('div', 'bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200');
  
  card.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${university.name}</h3>
          <div class="flex items-center text-gray-600 mb-2">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-sm">${university.location}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Ranking</div>
          <div class="font-bold text-blue-600">#${university.ranking}</div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-4 mb-4">
        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${university.type}</span>
        ${university.cpt_day_one ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">CPT Day 1</span>' : ''}
        ${university.mpower_eligible ? '<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">MPOWER</span>' : ''}
      </div>
      
      <div class="space-y-3 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            <span class="text-sm">Tuition</span>
          </div>
          <span class="font-semibold text-gray-900">${university.tuition}</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="text-sm">Acceptance</span>
          </div>
          <span class="font-semibold text-gray-900">${university.acceptance_rate}</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-600">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
            <span class="text-sm">Programs</span>
          </div>
          <span class="font-semibold text-gray-900">${university.programs.length}+</span>
        </div>
      </div>
      
      <button class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200 btn" 
              onclick="openUniversityModal(${university.id})">
        View Details
      </button>
    </div>
  `;
  
  return card;
}

function updateResultsCount() {
  const countElement = document.querySelector('#results-count');
  if (countElement) {
    countElement.textContent = `Found ${appState.filteredUniversities.length} Universities`;
  }
}