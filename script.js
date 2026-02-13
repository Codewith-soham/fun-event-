// DOM Elements - Sections
const landingSection = document.getElementById('landingSection');
const generatorSection = document.getElementById('generatorSection');
const previewSection = document.getElementById('previewSection');

// DOM Elements - Buttons
const startCreateBtn = document.getElementById('startCreateBtn');
const previewBtn = document.getElementById('previewBtn');
const editBtn = document.getElementById('editBtn');
const generateMessageBtn = document.getElementById('generateMessageBtn');
const acceptBtn = document.getElementById('acceptBtn');
const rejectBtn = document.getElementById('rejectBtn');

// DOM Elements - Inputs
const yourNameInput = document.getElementById('yourName');
const partnerNameInput = document.getElementById('partnerName');
const proposalMessageInput = document.getElementById('proposalMessage');
const toneSelect = document.getElementById('toneSelect');
const themeSelect = document.getElementById('themeSelect');
const photoUpload = document.getElementById('photoUpload');
const musicUpload = document.getElementById('musicUpload');
const photoPreview = document.getElementById('photoPreview');
const musicPreview = document.getElementById('musicPreview');

// DOM Elements - Preview
const previewImageWrap = document.getElementById('previewImageWrap');
const previewImage = document.getElementById('previewImage');
const previewNames = document.getElementById('previewNames');
const previewMessage = document.getElementById('previewMessage');

// DOM Elements - Music Panel
const musicPanel = document.getElementById('musicPanel');
const playBtn = document.getElementById('playBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeControl = document.getElementById('volumeControl');
const volumeValue = document.getElementById('volumeValue');

// DOM Elements - Overlays
const startOverlay = document.getElementById('startOverlay');
const startButton = document.getElementById('startButton');
const successOverlay = document.getElementById('successOverlay');
const rejectOverlay = document.getElementById('rejectOverlay');

// Audio Element
const bgMusic = document.getElementById('bgMusic');

// Constants
const THEME_CLASSES = ['theme-romantic', 'theme-cute', 'theme-dark', 'theme-minimal'];

// State Variables
let uploadedPhoto = null;
let uploadedMusicUrl = null;
let isMusicPlaying = false;
let typingTimer = null;
let typingIndex = 0;
let fullMessage = '';
let rejectButtonMoveCount = 0;

// ==================== UTILITY FUNCTIONS ====================

function generateFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;
    
    heartsContainer.innerHTML = '';
    const heartCount = 80 + Math.floor(Math.random() * 21);
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        
        const size = 10 + Math.random() * 20;
        const left = Math.random() * 100;
        const delay = Math.random() * 12;
        const duration = 10 + Math.random() * 8;
        const opacity = 0.2 + Math.random() * 0.3;
        
        heart.style.left = `${left}%`;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.opacity = opacity;
        
        heartsContainer.appendChild(heart);
    }
}

function setThemeClass(theme) {
    document.body.classList.remove(...THEME_CLASSES);
    document.body.classList.add(`theme-${theme}`);
}

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

// ==================== MESSAGE GENERATION ====================

function generateRomanticMessage(tone, partnerName) {
    const templates = {
        'deep-romantic': [
            "I have been thinking about this for a while, {{partnerName}}. You make everything feel softer and brighter. I would love to see where this could go, if you are open to it.",
            "{{partnerName}}, you bring a calm and beautiful energy into my life. I would love the chance to be more than friends, at a pace that feels right for both of us.",
            "Every time we talk, I feel a little more sure about this. I care about you deeply, {{partnerName}}, and I would love to explore something meaningful together."
        ],
        'cute-playful': [
            "Okay {{partnerName}}, small confession: I like you. A lot. Want to go on a cute little date and see if we are a vibe?",
            "{{partnerName}}, you are my favorite notification. I would love to take you out sometime and see if this turns into something special.",
            "Hi {{partnerName}}, you make me smile way too easily. Want to grab coffee and let this story begin?"
        ],
        emotional: [
            "{{partnerName}}, getting to know you has been such a bright spot for me. I feel a real connection with you. If you feel the same, I would love to take you out sometime.",
            "I wanted to be honest with you, {{partnerName}}. I really like you, and I would love to see if we could be something more. No pressure, just sincerity.",
            "You mean a lot to me, {{partnerName}}. I would love to explore this feeling together, if you are open to it."
        ],
        filmy: [
            "{{partnerName}}, aaj dil ne kah diya. Every moment with you feels like a scene from a movie. Would you let me take you on a real-life date?",
            "Filmy line nahi, bas simple truth, {{partnerName}}: you have my attention and my heart. Coffee pe milte hain?",
            "{{partnerName}}, kuch toh hai tum mein. I would love to write a beautiful chapter together, starting with a date."
        ],
        'minimal-elegant': [
            "{{partnerName}}, I like you. I would love to take you out sometime, if you are open to it.",
            "You feel easy to be around, {{partnerName}}. I would like to explore this, gently and honestly.",
            "{{partnerName}}, I am interested in you. Would you like to go out together sometime?"
        ]
    };

    const list = templates[tone] || templates['deep-romantic'];
    const message = list[Math.floor(Math.random() * list.length)];
    return message.replace(/\{\{partnerName\}\}/g, partnerName);
}

// ==================== PREVIEW RENDERING ====================

function renderPreview() {
    const yourName = yourNameInput.value.trim();
    const partnerName = partnerNameInput.value.trim();
    const message = proposalMessageInput.value.trim();
    const theme = themeSelect.value;

    if (!yourName || !partnerName || !message) {
        alert('Please fill in your name, partner name, and message.');
        return;
    }

    // Set preview content
    previewNames.textContent = 'Will you be my Valentine? 💖';
    fullMessage = message;
    previewMessage.textContent = '';
    typingIndex = 0;

    // Handle image preview
    if (uploadedPhoto) {
        previewImage.src = uploadedPhoto;
        previewImageWrap.classList.remove('hidden');
    } else {
        previewImageWrap.classList.add('hidden');
    }

    // Handle music setup
    if (uploadedMusicUrl) {
        bgMusic.src = uploadedMusicUrl;
        bgMusic.volume = Number(volumeControl.value);
        bgMusic.loop = true;
        bgMusic.load();
        musicPanel.classList.remove('hidden');
    } else {
        musicPanel.classList.add('hidden');
        bgMusic.src = '';
    }

    // Apply theme
    setThemeClass(theme);

    // Switch sections
    landingSection.classList.add('hidden');
    generatorSection.classList.add('hidden');
    previewSection.classList.remove('hidden');

    // Reset overlays
    startOverlay.classList.remove('hidden');
    successOverlay.classList.add('hidden');
    rejectOverlay.classList.add('hidden');
}

// ==================== TYPING ANIMATION ====================

function startTyping() {
    if (!fullMessage) return;

    // Clear any existing typing animation
    if (typingTimer) {
        clearInterval(typingTimer);
    }

    typingIndex = 0;
    previewMessage.textContent = '';

    typingTimer = setInterval(() => {
        previewMessage.textContent = fullMessage.slice(0, typingIndex + 1);
        typingIndex += 1;
        
        if (typingIndex >= fullMessage.length) {
            clearInterval(typingTimer);
            typingTimer = null;
        }
    }, 28);
}

// ==================== MUSIC CONTROLS ====================

function startMusic() {
    if (!bgMusic.src) return;

    bgMusic.play()
        .then(() => {
            isMusicPlaying = true;
            playBtn.textContent = '⏸';
        })
        .catch(error => {
            console.error('Audio playback failed:', error);
            alert('Please tap to enable audio playback.');
        });
}

function pauseMusic() {
    if (!bgMusic.src) return;
    
    bgMusic.pause();
    isMusicPlaying = false;
    playBtn.textContent = '▶';
}

function togglePlayPause() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        startMusic();
    }
}

function toggleMute() {
    if (!bgMusic.src) return;
    
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '🔇' : '🔊';
}

function changeVolume(value) {
    const volume = Number(value);
    bgMusic.volume = volume;
    volumeValue.textContent = `${Math.round(volume * 100)}%`;
}

// ==================== OVERLAY HANDLERS ====================

function handleAccept() {
    successOverlay.classList.remove('hidden');
}

function handleReject() {
    rejectOverlay.classList.remove('hidden');
    if (isMusicPlaying) {
        pauseMusic();
    }
}

function moveRejectButton() {
    rejectButtonMoveCount++;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonWidth = rejectBtn.offsetWidth;
    const buttonHeight = rejectBtn.offsetHeight;
    
    // Calculate safe boundaries (keep button within viewport with padding)
    const maxX = viewportWidth - buttonWidth - 40;
    const maxY = viewportHeight - buttonHeight - 40;
    
    // Generate random position
    const randomX = Math.max(20, Math.floor(Math.random() * maxX));
    const randomY = Math.max(20, Math.floor(Math.random() * maxY));
    
    // Apply fixed positioning to move the button
    rejectBtn.style.position = 'fixed';
    rejectBtn.style.left = `${randomX}px`;
    rejectBtn.style.top = `${randomY}px`;
    rejectBtn.style.transition = 'all 0.3s ease';
    rejectBtn.style.zIndex = '10';
    
    // After 8 attempts, convert to Accept button
    if (rejectButtonMoveCount >= 8) {
        rejectBtn.textContent = 'Fine, Accept then! 😅';
        rejectBtn.style.background = 'linear-gradient(135deg, #22c55e, #86efac)';
        rejectBtn.style.color = '#052e16';
        
        // Remove hover listener and replace click handler
        rejectBtn.onmouseenter = null;
        rejectBtn.onclick = handleAccept;
    }
}

// ==================== FILE UPLOAD HANDLERS ====================

async function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        photoUpload.value = '';
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be under 2MB.');
        photoUpload.value = '';
        return;
    }

    try {
        uploadedPhoto = await fileToBase64(file);
        photoPreview.innerHTML = `<img src="${uploadedPhoto}" alt="Preview">`;
    } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to load image.');
    }
}


function handleMusicUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Check type
    if (!file.type.startsWith('audio/')) {
        alert('Please select a valid audio file.');
        musicUpload.value = '';
        return;
    }

    // Limit size
    if (file.size > 5 * 1024 * 1024) {
        alert('Audio file too large (max 5MB).');
        musicUpload.value = '';
        return;
    }

    // Revoke previous URL
    if (uploadedMusicUrl) URL.revokeObjectURL(uploadedMusicUrl);

    // Create new URL for playback
    uploadedMusicUrl = URL.createObjectURL(file);
    bgMusic.src = uploadedMusicUrl;
    bgMusic.load();
    bgMusic.loop = true;
    musicPreview.textContent = `Music loaded: ${file.name}`;
    playBtn.textContent = '▶';
    isMusicPlaying = false;

    console.log("Music ready:", file.name, uploadedMusicUrl);
}

// ==================== NAVIGATION HANDLERS ====================

function handleStartCreate() {
    landingSection.classList.add('hidden');
    generatorSection.classList.remove('hidden');
}

function handleGenerateMessage() {
    const partnerName = partnerNameInput.value.trim();
    
    if (!partnerName) {
        alert('Please enter your partner\'s name first.');
        partnerNameInput.focus();
        return;
    }

    proposalMessageInput.value = generateRomanticMessage(toneSelect.value, partnerName);
}

function handleThemeChange() {
    setThemeClass(themeSelect.value);
}

function handleStartOverlay() {
    startOverlay.classList.add('hidden');
    startMusic();
    startTyping();
}

function handleEditProposal() {
    previewSection.classList.add('hidden');
    generatorSection.classList.remove('hidden');
    startOverlay.classList.add('hidden');
    successOverlay.classList.add('hidden');
    rejectOverlay.classList.add('hidden');
    pauseMusic();
}

// ==================== EVENT LISTENERS ====================

// Navigation
startCreateBtn.addEventListener('click', handleStartCreate);
previewBtn.addEventListener('click', renderPreview);
editBtn.addEventListener('click', handleEditProposal);

// Generator
generateMessageBtn.addEventListener('click', handleGenerateMessage);
themeSelect.addEventListener('change', handleThemeChange);

// File Uploads
photoUpload.addEventListener('change', handlePhotoUpload);
musicUpload.addEventListener('change', handleMusicUpload);

// Overlays
startButton.addEventListener('click', handleStartOverlay);
acceptBtn.addEventListener('click', handleAccept);
rejectBtn.addEventListener('click', handleReject);
rejectBtn.addEventListener('mouseenter', moveRejectButton);

// Music Controls
playBtn.addEventListener('click', togglePlayPause);
muteBtn.addEventListener('click', toggleMute);
volumeControl.addEventListener('input', event => changeVolume(event.target.value));

// ==================== INITIALIZATION ====================

generateFloatingHearts();
changeVolume(volumeControl.value);
setThemeClass('romantic');
