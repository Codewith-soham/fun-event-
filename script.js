// Get DOM elements
const formSection = document.getElementById('formSection');
const proposalSection = document.getElementById('proposalSection');
const celebrationSection = document.getElementById('celebrationSection');
const mainContainer = document.getElementById('mainContainer');

const yourNameInput = document.getElementById('yourName');
const partnerNameInput = document.getElementById('partnerName');
const proposalMessageInput = document.getElementById('proposalMessage');
const themeSelect = document.getElementById('themeSelect');
const emotionSelect = document.getElementById('emotionSelect');

const generateBtn = document.getElementById('generateBtn');
const generateMessageBtn = document.getElementById('generateMessageBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const restartBtn = document.getElementById('restartBtn');

const coupleNames = document.getElementById('coupleNames');
const customMessage = document.getElementById('customMessage');
const celebrationCouples = document.getElementById('celebrationCouples');

// ===== EMOTION-BASED MESSAGE GENERATOR =====

/**
 * Generates a proposal message based on the selected emotion/tone
 * @param {string} emotion - The emotion type (emotional, fun, cute, etc.)
 * @param {string} name - The partner's name
 * @returns {string} - Generated proposal message
 */
function generateProposalMessage(emotion, name) {
    // Message templates for each emotion type
    const messageTemplates = {
        emotional: [
            `Hey ${name}, I've been thinking about this for a while now. You make my days brighter just by being yourself. I really care about you, and I'd love to see where this could go. Would you like to give us a chance?`,
            `${name}, getting to know you has been one of the best parts of my life. You inspire me and make me want to be better. I have feelings for you that I can't ignore anymore. Would you be open to exploring this with me?`,
            `I need to be honest with you, ${name}. Every moment we spend together means so much to me. You've become someone truly special in my life. I'd really like to take this friendship to something more, if you feel the same way.`
        ],
        fun: [
            `So ${name}, I've been running a very scientific analysis, and the data shows I really like you. Like, a LOT. Want to go on this adventure together and see what happens? 😊`,
            `Okay ${name}, confession time: I think you're pretty amazing. Like, maybe-we-should-hang-out-more-and-make-this-official amazing. What do you say?`,
            `${name}, I'm just gonna say it—you're awesome and I'd be silly not to shoot my shot. Want to grab coffee sometime and maybe... make this a thing? 😄`
        ],
        cute: [
            `Hi ${name} 🥺 I really enjoy spending time with you. You make me smile even on my worst days. Would you maybe want to be more than friends? No pressure at all!`,
            `${name}, you're genuinely one of the sweetest people I know. I find myself thinking about you a lot lately. Would you be interested in going on a date with me sometime? 💕`,
            `Hey ${name}, I know this might be sudden, but I think you're really special. You make my heart happy whenever we talk. Would you like to see where this could go?`
        ],
        casual: [
            `Hey ${name}, so I've been wanting to tell you—I think you're really cool and I like spending time with you. Would you want to hang out more often, maybe as something more than friends?`,
            `${name}, I'll be straight with you. I like you, and I think we vibe well together. Want to see if there's something here worth exploring?`,
            `Yo ${name}, I'm just gonna put it out there—I'm into you. No big dramatic speech, just genuine interest. What do you think?`
        ],
        confident: [
            `${name}, I believe in being direct. I think you're incredible, and I'd like to take you out sometime. I think we could have something really great together. What do you say?`,
            `Hey ${name}, I know what I want, and that's to get to know you better. You've caught my attention in the best way. Would you be interested in going on a date with me?`,
            `${name}, I'm not one to beat around the bush. I find you fascinating, and I'd love the opportunity to take you out. Are you free this weekend?`
        ],
        shy: [
            `Hi ${name}... this is kind of hard for me to say, but I think you're really amazing. I've liked you for a while now, and I was wondering if you'd maybe want to go out sometime? It's okay if not! 😊`,
            `${name}, I'm a bit nervous saying this, but I wanted you to know that I have feelings for you. You're always so kind and genuine. Would you be interested in maybe trying a date? No worries if not!`,
            `Um, ${name}? I've been working up the courage to tell you this. I really like you and I think you're wonderful. Would you possibly want to get coffee together sometime? I understand if you need time to think about it.`
        ],
        deep: [
            `${name}, I believe that meaningful connections are rare. Since we've met, I've felt something I can't quite explain. You challenge me, inspire me, and make me see the world differently. I'd be honored if you'd consider building something beautiful with me.`,
            `Dear ${name}, there's a depth to you that I find incredibly compelling. Our conversations stay with me long after they end. I feel like we connect on a level that's uncommon, and I'd love to explore that further with you. Would you be open to that?`,
            `${name}, I don't take feelings like this lightly. What I feel for you is genuine and profound. You've touched my life in ways that matter, and I believe we could create something really meaningful together. Would you give me the chance to show you?`
        ],
        polite: [
            `Hello ${name}, I wanted to express something that's been on my mind. I have a great deal of respect and admiration for you. If you're comfortable with the idea, I would be delighted to take you out sometime. Please feel free to take your time considering it.`,
            `Dear ${name}, I hope this doesn't make you uncomfortable, but I wanted to let you know that I've developed feelings for you. I think highly of you and would appreciate the opportunity to get to know you better, if you're interested. There's absolutely no pressure.`,
            `${name}, I wanted to approach this respectfully. I find myself drawn to your character and personality. If you're open to it, I would love to take you to dinner sometime and see if there's a mutual connection. Please know that I value your friendship regardless of your answer.`
        ]
    };

    // Get templates for the selected emotion
    const templates = messageTemplates[emotion];
    
    // If emotion not found, return a default message
    if (!templates) {
        return `Hey ${name}, I really like spending time with you and I think you're wonderful. Would you like to go out with me sometime?`;
    }
    
    // Return a random template from the selected emotion
    const randomIndex = Math.floor(Math.random() * templates.length);
    return templates[randomIndex];
}

// Generate Message button click handler
generateMessageBtn.addEventListener('click', function() {
    const partnerName = partnerNameInput.value.trim();
    const selectedEmotion = emotionSelect.value;
    
    // Validate partner name
    if (!partnerName) {
        alert('Please enter your partner\'s name first!');
        partnerNameInput.focus();
        return;
    }
    
    // Generate and populate the message
    const generatedMessage = generateProposalMessage(selectedEmotion, partnerName);
    proposalMessageInput.value = generatedMessage;
    
    // Add a subtle animation to show the message was generated
    proposalMessageInput.style.backgroundColor = '#f0f9ff';
    setTimeout(() => {
        proposalMessageInput.style.backgroundColor = '';
    }, 500);
});

// Theme change functionality
themeSelect.addEventListener('change', function() {
    const selectedTheme = this.value;
    // Remove all theme classes
    document.body.classList.remove('pink', 'dark', 'lavender');
    // Add selected theme class
    document.body.classList.add(selectedTheme);
});

// Generate Proposal button click handler
generateBtn.addEventListener('click', function() {
    // Get input values
    const yourName = yourNameInput.value.trim();
    const partnerName = partnerNameInput.value.trim();
    const message = proposalMessageInput.value.trim();

    // Validate inputs
    if (!yourName || !partnerName || !message) {
        alert('Please fill in all fields!');
        return;
    }

    // Set proposal content
    coupleNames.textContent = `${yourName} ❤️ ${partnerName}`;
    customMessage.textContent = message;

    // Hide form and show proposal
    formSection.classList.add('hidden');
    proposalSection.classList.remove('hidden');
});

// Yes button click handler
yesBtn.addEventListener('click', function() {
    // Get the couple names for celebration
    celebrationCouples.textContent = coupleNames.textContent;

    // Hide proposal and show celebration
    proposalSection.classList.add('hidden');
    celebrationSection.classList.remove('hidden');
});

// No button hover handler - move button randomly
noBtn.addEventListener('mouseenter', function() {
    moveButtonRandomly();
});

// Function to move No button to random position within container
function moveButtonRandomly() {
    const containerRect = mainContainer.getBoundingClientRect();
    const buttonRect = noBtn.getBoundingClientRect();
    
    // Calculate maximum positions to keep button inside container
    const maxX = containerRect.width - buttonRect.width - 40; // 40px padding
    const maxY = containerRect.height - buttonRect.height - 40;
    
    // Generate random positions
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply absolute positioning
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Restart button click handler
restartBtn.addEventListener('click', function() {
    // Reset all inputs
    yourNameInput.value = '';
    partnerNameInput.value = '';
    proposalMessageInput.value = '';
    themeSelect.value = 'pink';
    
    // Reset theme
    document.body.classList.remove('pink', 'dark', 'lavender');
    document.body.classList.add('pink');
    
    // Reset No button position
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    
    // Show form, hide others
    celebrationSection.classList.add('hidden');
    proposalSection.classList.add('hidden');
    formSection.classList.remove('hidden');
});

// Initialize with default theme
document.body.classList.add('pink');
