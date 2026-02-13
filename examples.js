// ============================================
// EXAMPLE USAGE: generateProposalMessage()
// ============================================

// Import or copy the generateProposalMessage function
// (In your case, it's already in script.js)

// ============================================
// EXAMPLE 1: Basic Usage
// ============================================

console.log('=== EXAMPLE 1: Emotional Message ===');
const emotionalMsg = generateProposalMessage('emotional', 'Emma');
console.log(emotionalMsg);
// Output: "Hey Emma, I've been thinking about this for a while now..."

console.log('\n=== EXAMPLE 2: Fun/Playful Message ===');
const funMsg = generateProposalMessage('fun', 'Jake');
console.log(funMsg);
// Output: "So Jake, I've been running a very scientific analysis..."

// ============================================
// EXAMPLE 3: Testing All Emotions
// ============================================

console.log('\n=== EXAMPLE 3: All Emotion Types ===');
const emotions = ['emotional', 'fun', 'cute', 'casual', 'confident', 'shy', 'deep', 'polite'];
const testName = 'Taylor';

emotions.forEach(emotion => {
    console.log(`\n--- ${emotion.toUpperCase()} ---`);
    console.log(generateProposalMessage(emotion, testName));
});

// ============================================
// EXAMPLE 4: Generating Multiple Options
// ============================================

console.log('\n=== EXAMPLE 4: Multiple Options ===');
function getMultipleMessages(emotion, name, count = 3) {
    const messages = [];
    for (let i = 0; i < count; i++) {
        messages.push(generateProposalMessage(emotion, name));
    }
    return messages;
}

const options = getMultipleMessages('cute', 'Sam', 3);
options.forEach((msg, index) => {
    console.log(`\nOption ${index + 1}:`);
    console.log(msg);
});

// ============================================
// EXAMPLE 5: Custom Wrapper Function
// ============================================

console.log('\n=== EXAMPLE 5: Custom Wrapper ===');
function createPersonalizedProposal(yourName, partnerName, emotion) {
    const message = generateProposalMessage(emotion, partnerName);
    return {
        from: yourName,
        to: partnerName,
        tone: emotion,
        message: message,
        timestamp: new Date().toISOString(),
        editable: true
    };
}

const proposal = createPersonalizedProposal('Chris', 'Morgan', 'confident');
console.log(JSON.stringify(proposal, null, 2));

// ============================================
// EXAMPLE 6: Validation Helper
// ============================================

console.log('\n=== EXAMPLE 6: With Validation ===');
function generateWithValidation(emotion, name) {
    // Validate inputs
    if (!name || name.trim() === '') {
        return { error: 'Partner name is required', message: null };
    }
    
    const validEmotions = ['emotional', 'fun', 'cute', 'casual', 'confident', 'shy', 'deep', 'polite'];
    if (!validEmotions.includes(emotion)) {
        return { 
            error: `Invalid emotion. Choose from: ${validEmotions.join(', ')}`, 
            message: null 
        };
    }
    
    // Generate message
    const message = generateProposalMessage(emotion, name);
    return { error: null, message };
}

// Valid call
const result1 = generateWithValidation('shy', 'Alex');
console.log('Valid:', result1);

// Invalid emotion
const result2 = generateWithValidation('aggressive', 'Alex');
console.log('Invalid emotion:', result2);

// Missing name
const result3 = generateWithValidation('cute', '');
console.log('Missing name:', result3);

// ============================================
// EXAMPLE 7: Message Statistics
// ============================================

console.log('\n=== EXAMPLE 7: Message Statistics ===');
function getMessageStats(emotion, name) {
    const message = generateProposalMessage(emotion, name);
    return {
        message,
        characterCount: message.length,
        wordCount: message.split(/\s+/).length,
        sentenceCount: (message.match(/[.!?]+/g) || []).length,
        hasEmoji: /\p{Emoji}/u.test(message),
        estimatedReadTime: Math.ceil(message.split(/\s+/).length / 200) // words per minute
    };
}

const stats = getMessageStats('fun', 'Jordan');
console.log(JSON.stringify(stats, null, 2));

// ============================================
// EXAMPLE 8: Batch Generation
// ============================================

console.log('\n=== EXAMPLE 8: Batch Generation ===');
function generateForMultiplePeople(emotion, names) {
    return names.map(name => ({
        name,
        message: generateProposalMessage(emotion, name)
    }));
}

const recipients = ['Alice', 'Bob', 'Charlie'];
const messages = generateForMultiplePeople('casual', recipients);
console.log(messages);

// ============================================
// EXAMPLE 9: Interactive CLI Simulator
// ============================================

console.log('\n=== EXAMPLE 9: Simulated Interactive Flow ===');
function simulateUserFlow() {
    // Simulating user inputs
    const userInputs = {
        yourName: 'Alex',
        partnerName: 'Riley',
        selectedEmotion: 'cute'
    };
    
    console.log(`You: ${userInputs.yourName}`);
    console.log(`Partner: ${userInputs.partnerName}`);
    console.log(`Tone: ${userInputs.selectedEmotion}`);
    console.log('\nGenerating message...\n');
    
    const message = generateProposalMessage(userInputs.selectedEmotion, userInputs.partnerName);
    console.log('Generated Message:');
    console.log('-------------------');
    console.log(message);
    console.log('-------------------');
    console.log('\nYou can now edit this message before sending!');
}

simulateUserFlow();

// ============================================
// EXAMPLE 10: Integration with UI Event
// ============================================

console.log('\n=== EXAMPLE 10: UI Integration Pattern ===');
function handleGenerateClick(formData) {
    const { partnerName, emotion } = formData;
    
    // Validate
    if (!partnerName) {
        return { success: false, error: 'Please enter partner name' };
    }
    
    // Generate
    const message = generateProposalMessage(emotion, partnerName);
    
    // Return for UI update
    return {
        success: true,
        data: {
            message,
            emotion,
            timestamp: Date.now(),
            isEditable: true
        }
    };
}

// Simulate form submission
const formData = { partnerName: 'Casey', emotion: 'deep' };
const response = handleGenerateClick(formData);
console.log(JSON.stringify(response, null, 2));

// ============================================
// OUTPUT EXAMPLES
// ============================================

console.log('\n\n=== SAMPLE OUTPUTS FOR EACH EMOTION ===\n');

const sampleOutputs = {
    emotional: "Hey Sarah, I've been thinking about this for a while now. You make my days brighter just by being yourself. I really care about you, and I'd love to see where this could go. Would you like to give us a chance?",
    
    fun: "So Jamie, I've been running a very scientific analysis, and the data shows I really like you. Like, a LOT. Want to go on this adventure together and see what happens? 😊",
    
    cute: "Hi Morgan 🥺 I really enjoy spending time with you. You make me smile even on my worst days. Would you maybe want to be more than friends? No pressure at all!",
    
    casual: "Hey Jordan, so I've been wanting to tell you—I think you're really cool and I like spending time with you. Would you want to hang out more often, maybe as something more than friends?",
    
    confident: "Taylor, I believe in being direct. I think you're incredible, and I'd like to take you out sometime. I think we could have something really great together. What do you say?",
    
    shy: "Hi Riley... this is kind of hard for me to say, but I think you're really amazing. I've liked you for a while now, and I was wondering if you'd maybe want to go out sometime? It's okay if not! 😊",
    
    deep: "Casey, I believe that meaningful connections are rare. Since we've met, I've felt something I can't quite explain. You challenge me, inspire me, and make me see the world differently. I'd be honored if you'd consider building something beautiful with me.",
    
    polite: "Hello Cameron, I wanted to express something that's been on my mind. I have a great deal of respect and admiration for you. If you're comfortable with the idea, I would be delighted to take you out sometime. Please feel free to take your time considering it."
};

Object.entries(sampleOutputs).forEach(([emotion, message]) => {
    console.log(`${emotion.toUpperCase()}:`);
    console.log(message);
    console.log('');
});
