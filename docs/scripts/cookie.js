
let cookieName = 'cookie_consent';
var consent = getStoredConsent();

window.onload = () =>{
    init();
}

         



 function init() {
    // Show banner if no consent given
    if (!consent) {
        setTimeout(() => showBanner(), 1000);
    }
    
    // Update status
    //  updateStatus();
    
    // Load saved preferences
    loadPreferences();
}

 function  showBanner() {
    const banner = document.getElementById('cookieBanner');
    banner.classList.add('show');
}

 function  hideBanner() {
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('show');
}

 function  showSettings() {
    const modal = document.getElementById('cookieModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

 function  hideSettings() {
    const modal = document.getElementById('cookieModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

 function  getStoredConsent() {
    try {
        const stored = localStorage.getItem(cookieName);
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
}

 function storeConsent(consent) {
    try {
        localStorage.setItem(cookieName, JSON.stringify({
            ...consent,
            timestamp: new Date().toISOString(),
            version: '1.0'
        }));
        consent = consent;
        updateStatus();
    } catch (e) {
        console.error('Failed to store cookie consent:', e);
    }
}

function   acceptAll() {
    const consent = {
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true
    };
    
    storeConsent(consent);
    hideBanner();
    enableCookies(consent);
    showNotification('All cookies accepted! 🍪', 'success');
}

 function  acceptNecessary() {
    const consent = {
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false
    };
    
    storeConsent(consent);
    hideBanner();
    enableCookies(consent);
    showNotification('Only necessary cookies accepted.', 'info');
}

function  rejectAll() {
    const consent = {
        necessary: true, // Always required
        analytics: false,
        marketing: false,
        functional: false
    };
    
    storeConsent(consent);
    hideSettings();
    hideBanner();
    enableCookies(consent);
    showNotification('Cookie preferences saved.', 'info');
}

 function   savePreferences() {
    const consent = {
        necessary: true, // Always true
        analytics: document.getElementById('analytics-toggle').checked,
        marketing: document.getElementById('marketing-toggle').checked,
        functional: document.getElementById('functional-toggle').checked
    };
    
    storeConsent(consent);
    hideSettings();
    hideBanner();
    enableCookies(consent);
    showNotification('Cookie preferences saved! ✅', 'success');
}

function  loadPreferences() {
    if (!consent) return;
    
    const toggles = {
        'analytics-toggle': consent.analytics,
        'marketing-toggle': consent.marketing,
        'functional-toggle': consent.functional
    };
    
    Object.entries(toggles).forEach(([id, checked]) => {
        const element = document.getElementById(id);
        if (element) element.checked = checked;
    });
}


function showCookieSettings() {
    showSettings();
}

function rejectAllCookies() {
    rejectAll();
}

function acceptAllCookies() {
    acceptAll();
}

function acceptNecessaryCookies() {
    acceptNecessary();
}


function closeCookieSettings() {
    hideSettings();
}