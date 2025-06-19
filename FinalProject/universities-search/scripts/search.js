// Mock data for universities
var universities = [];
//const Url = "https://college-api-wxz6.onrender.com/api";
const Url = "http://localhost:3000/api";
//  [
//   {
//     id: 1,
//     name: "University of Southern California",
//     location: "Los Angeles, CA",
//     tuition: "$63,468/year",
//     ranking: 25,
//     type: "Private",
//     acceptance_rate: "11%",
//     cpt_day_one: true,
//     mpower_eligible: true,
//     image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
//     programs: ["Computer Science", "Business", "Engineering", "Medicine", "Film"]
//   },
//   {
//     id: 2,
//     name: "Arizona State University",
//     location: "Tempe, AZ",
//     tuition: "$31,200/year",
//     ranking: 117,
//     type: "Public",
//     acceptance_rate: "88%",
//     cpt_day_one: true,
//     mpower_eligible: false,
//     image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
//     programs: ["Business", "Engineering", "Computer Science", "Psychology"]
//   },
//   {
//     id: 3,
//     name: "Northeastern University",
//     location: "Boston, MA",
//     tuition: "$59,100/year",
//     ranking: 49,
//     type: "Private",
//     acceptance_rate: "18%",
//     cpt_day_one: true,
//     mpower_eligible: true,
//     image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
//     programs: ["Computer Science", "Business", "Engineering", "Health Sciences"]
//   },
//   {
//     id: 4,
//     name: "University of Illinois Chicago",
//     location: "Chicago, IL",
//     tuition: "$35,000/year",
//     ranking: 82,
//     type: "Public",
//     acceptance_rate: "79%",
//     cpt_day_one: false,
//     mpower_eligible: true,
//     image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
//     programs: ["Medicine", "Engineering", "Business", "Public Health"]
//   }
// ];

// Application state
let appState = {
  searchQuery: '',
  filteredUniversities: [...universities],
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


async function initializeSearchPage() {
  initialLodaData();

}

function initialLodaData(){
    const path = `${Url}/colleges`;
    
    fetch(path).then(response=> {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data =>{
      universities = data;
      appState.filteredUniversities = [...universities];
        setupSearchFunctionality();
        setupFilters();
        renderUniversities();
        updateResultsCount();
    })
    .catch(error => {
        throw new Error(`Could not load ${path}`)
    })
  
}

function setupSearchFunctionality() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const backToHomeButton = document.getElementById('back-to-home');

  if (searchInput) {
    searchInput.value = appState.searchQuery;
    searchInput.addEventListener('keypress', async (e) => {
      if (e.key === 'Enter') {
        await performSearch();
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
    typeSelect.addEventListener('change', async (e) => {
      appState.filters.type = e.target.value;
      await performSearch();
    });
  }

  if (tuitionSelect) {
    tuitionSelect.addEventListener('change', async (e) => {
      appState.filters.tuitionRange = e.target.value;
     await performSearch();
    });
  }

  if (cptCheckbox) {
    cptCheckbox.addEventListener('change', async (e) => {
      appState.filters.cptDayOne = e.target.checked;
      await performSearch();
    });
  }

  if (mpowerCheckbox) {
    mpowerCheckbox.addEventListener('change', async (e) => {
      appState.filters.mpowerEligible = e.target.checked;
     await performSearch();
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

async function performSearch() {
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    appState.searchQuery = searchInput.value;
  }

  // First try local filtering if you have universities data loaded
  if (universities && universities.length > 0) {
    let filtered = [...universities];

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
        const tuition = parseInt(uni.Tuition_and_fees?.replace(/[^0-9]/g, ''));
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

    // Apply ranking filter
    if (appState.filters.ranking && appState.filters.ranking !== 'any') {
      filtered = filtered.filter(uni => {
        const rank = parseInt(uni.ranking);
        switch (appState.filters.ranking) {
          case 'top50':
            return rank <= 50;
          case 'top100':
            return rank <= 100;
          case 'top200':
            return rank <= 200;
          case 'ranked':
            return !isNaN(rank);
          default:
            return true;
        }
      });
    }

    // If we have enough results locally, use them
    if (filtered.length >= 10) {
      appState.filteredUniversities = filtered;
      renderUniversities();
      updateResultsCount();
      return;
    }
  }

  // If we don't have enough local results or no local data, search backend
  try {
    await searchWithFilters();
  } catch (error) {
    console.error('Backend search failed, using local results:', error);
    // Fallback to local results even if less than 10
    if (universities && universities.length > 0) {
      // Use the filtered results from above
      renderUniversities();
      updateResultsCount();
    }
  }
}

async function searchWithFilters() {
  try {
    // Prepare query parameters
    const params = new URLSearchParams();
    
    // Add search query if exists
    if (appState.searchQuery && appState.searchQuery.trim()) {
      params.append('query', appState.searchQuery.trim());
    }
    
    // Add filters
    if (appState.filters.state && appState.filters.state !== 'all') {
      params.append('state', appState.filters.state);
    }
    
    if (appState.filters.type && appState.filters.type !== 'all') {
      params.append('type', appState.filters.type);
    }
    
    if (appState.filters.tuitionRange && appState.filters.tuitionRange !== 'any') {
      params.append('tuitionRange', appState.filters.tuitionRange);
    }
    
    if (appState.filters.cptDayOne) {
      params.append('cptDayOne', 'true');
    }
    
    if (appState.filters.mpowerEligible) {
      params.append('mpowerEligible', 'true');
    }
    
    if (appState.filters.ranking && appState.filters.ranking !== 'any') {
      params.append('ranking', appState.filters.ranking);
    }
    
    // Make API call
    const response = await fetch(`${Url}/colleges/filter?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update app state with results from backend
    universities = data;
    appState.filteredUniversities = [...universities];
    
    // Re-render the UI
    renderUniversities();
    updateResultsCount();
    
  } catch (error) {
    console.error('Error searching with filters:', error);
    // Optionally show user-friendly error message
    alert('Failed to search universities. Please try again.');
  }
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

function capitalizeFirst(string){
  if (!string) {
    return "";
  }
  return string.toLowerCase().replace(/(^|\s)\w/g, (match) => match.toUpperCase());
}
function createUniversityCard(university) {
  const card = createElement('div', 'bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200');
  
  const fee = university.Tuition_and_fees != null ? 
                                                    new Intl.NumberFormat('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0
                                                      }).format(university.Tuition_and_fees)
                                                  :
                                                  "No information";


  card.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h3 class="font-bold text-lg text-gray-900 mb-2">${capitalizeFirst(university.name)}</h3>
          <div class="flex items-center text-gray-600 mb-2 gap-2">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span class="text-sm">${capitalizeFirst(university.city)},${university.state}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Ranking</div>
          <div class="font-bold text-blue-600">#${university.URank ?? "0"}</div>
        </div>
      </div>
      
      <div class="flex flex-wrap gap-4 mb-4">
        <span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${university.type == 2? "Private" : university.type == 1 ? "Public" : "Community College"}</span>
        ${university.CPT == null || university.CPT == 0 ?  '' : '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">CPT Day 1</span>'}
        ${university.mpowerfinance == null || university.mpowerfinance == 0 ? '' : '<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">MPOWER</span>'}
      </div>
      
      <div class="space-y-3 mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-600 gap-2">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
            <span class="text-sm">Tuition</span>
          </div>
          <span class="font-semibold text-gray-900">${ fee }</span>
        </div>

        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center text-gray-600 ">
            <svg class="h-4 w-4 mr-1 .gap-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="text-sm">Acceptance</span>
          </div>
          <span class="font-semibold text-gray-900 ">${university.hi_offer}%</span>
        </div>
        
        <div class="flex items-center justify-between">
          <div class="flex items-center text-gray-600 gap-2">
            <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
            <span class="text-sm">Programs</span>
          </div>
          <span class="font-semibold text-gray-900">${0}+</span>
        </div>
      </div>
      
      <button class="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200 btn gap-2 " 
              onclick="openUniversityModal(${university.objectid})">
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

// Modal functionality
function openUniversityModal(universityId) {
  const university = universities.find(u => u.id === universityId);
  if (!university) return;

  appState.selectedUniversity = university;
  
  const modal = document.querySelector('#university-modal');
  const overlay = document.getElementsByClassName('modal-overlay');
  
  if (modal && overlay) {
    // Populate modal content
    populateModalContent(university);
    
    // Show modal
    modal.classList.remove('hidden');
    //overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeUniversityModal() {
  const modal = document.querySelector('#university-modal');
  const overlay = document.getElementsByClassName('modal-overlay');
  
  if (modal && overlay) {
    modal.classList.add('hidden');
   // overlay.classList.add('hidden');
    document.body.style.overflow = 'auto';
    appState.selectedUniversity = null;
  }
}

function populateModalContent(university) {
  const modalTitle = document.querySelector('#modal-title');
  const modalContent = document.querySelector('#modal-body');
  
  if (modalTitle) {
    modalTitle.textContent = university.name;
  }
  
  if (modalContent) {
    modalContent.innerHTML = `
      <div class="space-y-6">
        <!-- Basic Info -->
        <div class="grid md-grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="flex items-center text-gray-600 gap-2">
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
          <div class="grid md-grid-cols-2 gap-4">
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
          <button class="flex-1  flex flex-nowrap content-center align-icenter bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200">
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