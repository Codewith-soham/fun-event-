// ===== PROPOSAL VIEW PAGE SCRIPT =====

// Get DOM elements
const loadingSection = document.getElementById('loadingSection');
const errorSection = document.getElementById('errorSection');
const proposalDisplay = document.getElementById('proposalDisplay');
const acceptSection = document.getElementById('acceptSection');
const rejectSection = document.getElementById('rejectSection');

const photoContainer = document.getElementById('photoContainer');
const proposalPhoto = document.getElementById('proposalPhoto');
const displayNames = document.getElementById('displayNames');
const displayMessage = document.getElementById('displayMessage');
const musicToggle = document.getElementById('musicToggle');
const responseButtons = document.getElementById('responseButtons');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');

const proposalMusic = document.getElementById('proposalMusic');

// Store proposal data
let proposalData = null;
let isMusicPlaying = false;

// ===== LOAD PROPOSAL FROM URL =====

/**
 * Load and decode proposal data from URL parameters
 */
function loadProposal() {
    try {
        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const encodedData = urlParams.get('data');

        if (!encodedData) {
            showError();
            return;
        }

        // Decode Base64 data
        const jsonString = decodeURIComponent(atob(encodedData));
        proposalData = JSON.parse(jsonString);

        // Validate data
        if (!proposalData.yourName || !proposalData.partnerName || !proposalData.message) {
            showError();
            return;
        }

        // Display proposal
        displayProposal();

    } catch (error) {
        console.error('Error loading proposal:', error);
        showError();
    }
}

/**
 * Display the proposal with all data
 */
function displayProposal() {
    // Set theme
    if (proposalData.theme) {
        document.body.classList.remove('pink', 'dark', 'lavender');
        document.body.classList.add(proposalData.theme);
    }

    // Display names
    displayNames.textContent = `${proposalData.yourName} ❤️ ${proposalData.partnerName}`;

    // Display message
    displayMessage.textContent = proposalData.message;

    // Display photo if available
    if (proposalData.photo) {
        proposalPhoto.src = proposalData.photo;
        photoContainer.style.display = 'block';
    } else {
        photoContainer.style.display = 'none';
    }

    // Setup music if available
    if (proposalData.music) {
        proposalMusic.src = proposalData.music;
        musicToggle.classList.remove('hidden');
        
        // Auto-load music (muted for browser policy compliance)
        proposalMusic.muted = true;
        proposalMusic.load();
    }

    // Hide loading, show proposal
    loadingSection.classList.add('hidden');
    proposalDisplay.classList.remove('hidden');
}

/**
 * Show error message
 */
function showError() {
    loadingSection.classList.add('hidden');
    errorSection.classList.remove('hidden');
}

// ===== MUSIC CONTROL =====

/**
 * Toggle music play/pause and mute/unmute
 */
function toggleMusic() {
    if (!proposalData.music) return;

    if (isMusicPlaying) {
        // Mute music
        proposalMusic.muted = true;
        musicToggle.textContent = '🔇 Unmute Music';
        musicToggle.classList.remove('playing');
        isMusicPlaying = false;
    } else {
        // Unmute and play music
        proposalMusic.muted = false;
        proposalMusic.play().catch(error => {
            console.error('Error playing music:', error);
            alert('Unable to play music. Please interact with the page first.');
        });
        musicToggle.textContent = '🔊 Mute Music';
        musicToggle.classList.add('playing');
        isMusicPlaying = true;
    }
}

// Music toggle button handler
musicToggle.addEventListener('click', toggleMusic);

// ===== RESPONSE HANDLERS =====

/**
 * Handle accept response (YES button)
 */
function handleAccept() {
    // Hide proposal display
    proposalDisplay.classList.add('hidden');
    
    // Show accept response with animation
    acceptSection.classList.remove('hidden');
    
    // Keep music playing if it was playing
    if (isMusicPlaying) {
        proposalMusic.volume = 0.7; // Lower volume for celebration
    }
}

/**
 * Handle reject response (NO button)
 */
function handleReject() {
    // Hide proposal display
    proposalDisplay.classList.add('hidden');
    
    // Show reject response
    rejectSection.classList.remove('hidden');
    
    // Stop music if playing
    if (isMusicPlaying) {
        proposalMusic.pause();
        isMusicPlaying = false;
    }
}

// Accept button handler
acceptBtn.addEventListener('click', handleAccept);

// Reject button handler - move it around on hover (fun feature!)
rejectBtn.addEventListener('mouseenter', function() {
    // Random chance to move the button (80% chance)
    if (Math.random() < 0.8) {
        moveRejectButton();
    }
});

/**
 * Move reject button to random position
 */
function moveRejectButton() {
    const container = proposalDisplay.getBoundingClientRect();
    const button = rejectBtn.getBoundingClientRect();
    
    // Calculate safe positions
    const maxX = container.width - button.width - 40;
    const maxY = container.height - button.height - 40;
    
    // Generate random positions
    const randomX = Math.max(20, Math.random() * maxX);
    const randomY = Math.max(20, Math.random() * maxY);
    
    // Apply absolute positioning
    rejectBtn.style.position = 'absolute';
    rejectBtn.style.left = randomX + 'px';
    rejectBtn.style.top = randomY + 'px';
    rejectBtn.style.transition = 'all 0.3s ease';
}

// If user is persistent and actually clicks NO
rejectBtn.addEventListener('click', handleReject);

// ===== INITIALIZE =====

// Load proposal when page loads
window.addEventListener('DOMContentLoaded', loadProposal);
