// Screen - Add Content (Add Custom Phrases)
let addContentDirection = 'castellano-euskera'; // Direction for adding content

function renderAddContentScreen() {
    const app = document.getElementById('app');
    const customPhrases = Storage.getCustomPhrases();
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Add Content</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <div style="max-width: 500px; margin: 0 auto;">
                <h2 style="color: #333; margin-bottom: 20px;">Add New Phrase</h2>
                
                <!-- Direction Selector -->
                <div style="display: flex; justify-content: center; margin-bottom: 25px;">
                    <button id="direction-toggle" class="btn btn-primary" onclick="toggleAddContentDirection()" 
                            style="padding: 12px 24px; font-size: 16px; font-weight: 600;">
                        ${addContentDirection === 'castellano-euskera' ? 'CAS → EUS' : 'EUS → CAS'}
                    </button>
                </div>
                
                <div id="add-content-form">
                    ${renderAddContentForm()}
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="handleAddPhrase()" style="flex: 1;">Add Phrase</button>
                    <button class="btn btn-secondary" onclick="clearAddPhraseForm()">Clear</button>
                </div>
                
                <div id="add-phrase-message" style="margin-top: 15px; display: none;"></div>
                
                <div style="margin-top: 30px; padding-top: 30px; border-top: 2px solid #e0e0e0;">
                    <button class="btn btn-primary" onclick="handleUpdateDataFile()" style="width: 100%; background: #4caf50; margin-bottom: 10px;">
                        💾 Update data.js File (${getAllPhrases().length} phrases)
                    </button>
                    <p style="color: #666; font-size: 13px; text-align: center; margin-bottom: 20px;">
                        Updates the data.js file in your project with all phrases
                    </p>
                    
                    <button class="btn btn-primary" onclick="handleDownloadDataFile()" style="width: 100%; background: #ff9800;">
                        📥 Download data.js (Backup)
                    </button>
                    <p style="color: #666; font-size: 13px; text-align: center; margin-top: 10px;">
                        Download a backup copy of data.js with all ${getAllPhrases().length} phrases
                    </p>
                </div>
            </div>
            
            ${customPhrases.length > 0 ? renderCustomPhrasesList(customPhrases) : renderEmptyCustomPhrases()}
        </div>
    `;
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = document.getElementById('phrase-main');
        if (firstInput) firstInput.focus();
    }, 100);
}

function toggleAddContentDirection() {
    addContentDirection = addContentDirection === 'castellano-euskera' ? 'euskera-castellano' : 'castellano-euskera';
    renderAddContentScreen();
}

function renderAddContentForm() {
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const mainLang = isEusToCas ? 'Euskera' : 'Spanish';
    const transLang = isEusToCas ? 'Spanish' : 'Euskera';
    
    return `
        <div class="form-group">
            <label for="phrase-main">Phrase in ${mainLang}</label>
            <input type="text" id="phrase-main" placeholder="Enter phrase in ${mainLang}" autocomplete="off">
        </div>
        
        <div id="alternatives-main-container" style="margin-bottom: 20px;">
            <!-- Dynamic alternatives will be added here -->
        </div>
        
        <button type="button" class="btn btn-secondary" onclick="addAlternativeField('main')" 
                style="width: 100%; margin-bottom: 20px; background: #e0e0e0; color: #333;">
            + Add Alternative in ${mainLang}
        </button>
        
        <div class="form-group">
            <label for="phrase-translation">Translation in ${transLang}</label>
            <input type="text" id="phrase-translation" placeholder="Enter translation in ${transLang}" autocomplete="off">
        </div>
        
        <div id="alternatives-translation-container" style="margin-bottom: 20px;">
            <!-- Dynamic alternatives will be added here -->
        </div>
        
        <button type="button" class="btn btn-secondary" onclick="addAlternativeField('translation')" 
                style="width: 100%; margin-bottom: 20px; background: #e0e0e0; color: #333;">
            + Add Alternative in ${transLang}
        </button>
    `;
}

function renderEmptyCustomPhrases() {
    return `
        <div style="text-align: center; padding: 40px 20px; margin-top: 30px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">No custom phrases yet</h3>
            <p style="color: #666;">Add your first phrase above to get started!</p>
        </div>
    `;
}

let alternativeCounters = { main: 0, translation: 0 };

function addAlternativeField(type) {
    const container = document.getElementById(`alternatives-${type}-container`);
    const counter = ++alternativeCounters[type];
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const lang = type === 'main' 
        ? (isEusToCas ? 'Euskera' : 'Spanish')
        : (isEusToCas ? 'Spanish' : 'Euskera');
    
    const fieldHtml = `
        <div class="form-group" id="alt-${type}-${counter}" style="position: relative;">
            <label for="phrase-${type}-alt-${counter}">Alternative ${counter} in ${lang}</label>
            <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" id="phrase-${type}-alt-${counter}" 
                       placeholder="Enter alternative ${counter}" 
                       autocomplete="off" 
                       style="flex: 1;">
                <button type="button" onclick="removeAlternativeField('${type}', ${counter})" 
                        class="btn" 
                        style="background: #f44336; color: white; padding: 8px 12px; min-width: 40px;">
                    ✕
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', fieldHtml);
    document.getElementById(`phrase-${type}-alt-${counter}`).focus();
}

function removeAlternativeField(type, counter) {
    const field = document.getElementById(`alt-${type}-${counter}`);
    if (field) {
        field.remove();
    }
}

function renderCustomPhrasesList(phrases) {
    return `
        <div style="margin-top: 40px;">
            <h3 style="color: #333; margin-bottom: 20px;">Your Custom Phrases (${phrases.length})</h3>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${phrases.map(phrase => `
                    <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 5px;">
                                ${phrase.euskera}
                            </div>
                            ${phrase.euskeraAlternatives && phrase.euskeraAlternatives.length > 0 ? `
                                <div style="font-size: 12px; color: #999; font-style: italic; margin-bottom: 5px;">
                                    Also: ${phrase.euskeraAlternatives.join(', ')}
                                </div>
                            ` : ''}
                            <div style="font-size: 14px; color: #667eea;">
                                ${phrase.castellano}
                            </div>
                            ${phrase.castellanoAlternatives && phrase.castellanoAlternatives.length > 0 ? `
                                <div style="font-size: 12px; color: #999; font-style: italic; margin-top: 3px;">
                                    Also: ${phrase.castellanoAlternatives.join(', ')}
                                </div>
                            ` : ''}
                        </div>
                        <button class="btn btn-danger" onclick="handleDeletePhrase(${phrase.id})" style="background: #f44336; padding: 8px 15px; font-size: 12px;">
                            Delete
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function handleAddPhrase() {
    const mainPhrase = document.getElementById('phrase-main').value.trim();
    const translationPhrase = document.getElementById('phrase-translation').value.trim();
    const messageDiv = document.getElementById('add-phrase-message');
    
    // Validate inputs
    if (!mainPhrase || !translationPhrase) {
        showAddPhraseMessage('Please fill in both main fields', 'error');
        return;
    }
    
    if (mainPhrase.length < 2 || translationPhrase.length < 2) {
        showAddPhraseMessage('Phrases must be at least 2 characters long', 'error');
        return;
    }
    
    // Collect alternatives from dynamic fields
    const mainAlternatives = [];
    const translationAlternatives = [];
    
    for (let i = 1; i <= alternativeCounters.main; i++) {
        const input = document.getElementById(`phrase-main-alt-${i}`);
        if (input && input.value.trim()) {
            mainAlternatives.push(input.value.trim());
        }
    }
    
    for (let i = 1; i <= alternativeCounters.translation; i++) {
        const input = document.getElementById(`phrase-translation-alt-${i}`);
        if (input && input.value.trim()) {
            translationAlternatives.push(input.value.trim());
        }
    }
    
    // Determine which is euskera and which is castellano based on direction
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const euskera = isEusToCas ? mainPhrase : translationPhrase;
    const castellano = isEusToCas ? translationPhrase : mainPhrase;
    const euskeraAlternatives = isEusToCas ? mainAlternatives : translationAlternatives;
    const castellanoAlternatives = isEusToCas ? translationAlternatives : mainAlternatives;
    
    // Save phrase
    try {
        Storage.saveCustomPhrase(euskera, castellano, euskeraAlternatives, castellanoAlternatives);
        showAddPhraseMessage('Phrase added successfully!', 'success');
        
        // Clear form
        clearAddPhraseForm();
        
        // Refresh the screen to show new phrase
        setTimeout(() => {
            renderAddContentScreen();
        }, 1000);
    } catch (error) {
        showAddPhraseMessage('Error adding phrase. Please try again.', 'error');
    }
}

function clearAddPhraseForm() {
    // Clear main fields
    const mainInput = document.getElementById('phrase-main');
    const translationInput = document.getElementById('phrase-translation');
    if (mainInput) mainInput.value = '';
    if (translationInput) translationInput.value = '';
    
    // Clear all alternative fields
    document.getElementById('alternatives-main-container').innerHTML = '';
    document.getElementById('alternatives-translation-container').innerHTML = '';
    
    // Reset counters
    alternativeCounters = { main: 0, translation: 0 };
    
    // Focus on first input
    if (mainInput) mainInput.focus();
    
    const messageDiv = document.getElementById('add-phrase-message');
    messageDiv.style.display = 'none';
}

function showAddPhraseMessage(message, type) {
    const messageDiv = document.getElementById('add-phrase-message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.textAlign = 'center';
    
    if (type === 'success') {
        messageDiv.style.background = '#4caf50';
        messageDiv.style.color = 'white';
    } else {
        messageDiv.style.background = '#f44336';
        messageDiv.style.color = 'white';
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function handleDeletePhrase(id) {
    if (confirm('Are you sure you want to delete this phrase?')) {
        Storage.deleteCustomPhrase(id);
        renderAddContentScreen();
    }
}

function handleDownloadDataFile() {
    const allPhrases = getAllPhrases();
    
    // Generate the data.js file content
    const fileContent = `// Database of phrases in Basque and Spanish
const phrasesData = ${JSON.stringify(allPhrases, null, 4).replace(/"(\w+)":/g, '$1:')};

// Function to get all phrases
function getAllPhrases() {
    const customPhrases = Storage.getCustomPhrases();
    return [...phrasesData, ...customPhrases];
}

// Function to get a random phrase
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrasesData.length);
    return phrasesData[randomIndex];
}

// Function to get a phrase by ID
function getPhraseById(id) {
    return phrasesData.find(phrase => phrase.id === id);
}

// Function to remove accents from a string
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Function to compare answers (case insensitive, without accents, punctuation, and extra spaces)
// Supports checking against alternative translations if provided
function compareAnswers(userAnswer, correctAnswer, alternatives = []) {
    const normalize = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_\`~()¿?¡!]/g, '') // Remove punctuation
            .trim()
            .replace(/\s+/g, ' '); // Replace multiple spaces with single space
    };
    
    const normalizedUser = normalize(userAnswer);
    
    // Check main answer
    if (normalizedUser === normalize(correctAnswer)) {
        return true;
    }
    
    // Check alternative answers
    if (alternatives && alternatives.length > 0) {
        return alternatives.some(alt => normalizedUser === normalize(alt));
    }
    
    return false;
}

// Function to find differences between two strings
function findDifferences(userAnswer, correctAnswer) {
    // Normalize both answers for comparison
    const normalizeForComparison = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_\`~()¿?¡!]/g, '') // Remove punctuation
            .trim();
    };
    
    const userWords = normalizeForComparison(userAnswer).split(/\s+/);
    const correctWords = normalizeForComparison(correctAnswer).split(/\s+/);
    
    const differences = [];
    
    // Compare word by word
    const maxLength = Math.max(userWords.length, correctWords.length);
    
    for (let i = 0; i < maxLength; i++) {
        if (userWords[i] !== correctWords[i]) {
            if (i < userWords.length && i < correctWords.length) {
                differences.push('Word ' + (i + 1) + ': you wrote "' + userWords[i] + '" but it should be "' + correctWords[i] + '"');
            } else if (i >= userWords.length) {
                differences.push('Missing word "' + correctWords[i] + '"');
            } else {
                differences.push('Extra word "' + userWords[i] + '"');
            }
        }
    }
    
    return differences;
}
`;

    // Create blob and download
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert(`Downloaded data.js with ${allPhrases.length} phrases!\\n\\nYou can now replace the file in:\\njs/data.js`);
}

function generateDataFileContent() {
    const allPhrases = getAllPhrases();
    
    // Generate the data.js file content
    return `// Database of phrases in Basque and Spanish
const phrasesData = ${JSON.stringify(allPhrases, null, 4).replace(/"(\w+)":/g, '$1:')};

// Function to get all phrases
function getAllPhrases() {
    const customPhrases = Storage.getCustomPhrases();
    return [...phrasesData, ...customPhrases];
}

// Function to get a random phrase
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrasesData.length);
    return phrasesData[randomIndex];
}

// Function to get a phrase by ID
function getPhraseById(id) {
    return phrasesData.find(phrase => phrase.id === id);
}

// Function to remove accents from a string
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
}

// Function to compare answers (case insensitive, without accents, punctuation, and extra spaces)
// Supports checking against alternative translations if provided
function compareAnswers(userAnswer, correctAnswer, alternatives = []) {
    const normalize = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_\\\`~()¿?¡!]/g, '') // Remove punctuation
            .trim()
            .replace(/\\s+/g, ' '); // Replace multiple spaces with single space
    };
    
    const normalizedUser = normalize(userAnswer);
    
    // Check main answer
    if (normalizedUser === normalize(correctAnswer)) {
        return true;
    }
    
    // Check alternative answers
    if (alternatives && alternatives.length > 0) {
        return alternatives.some(alt => normalizedUser === normalize(alt));
    }
    
    return false;
}

// Function to find differences between two strings
function findDifferences(userAnswer, correctAnswer) {
    // Normalize both answers for comparison
    const normalizeForComparison = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\\/#!$%\\^&\\*;:{}=\\-_\\\`~()¿?¡!]/g, '') // Remove punctuation
            .trim();
    };
    
    const userWords = normalizeForComparison(userAnswer).split(/\\s+/);
    const correctWords = normalizeForComparison(correctAnswer).split(/\\s+/);
    
    const differences = [];
    
    // Compare word by word
    const maxLength = Math.max(userWords.length, correctWords.length);
    
    for (let i = 0; i < maxLength; i++) {
        if (userWords[i] !== correctWords[i]) {
            if (i < userWords.length && i < correctWords.length) {
                differences.push(\\\`Word \\\${i + 1}: you wrote "\\\${userWords[i]}" but it should be "\\\${correctWords[i]}"\\\`);
            } else if (i >= userWords.length) {
                differences.push(\\\`Missing word "\\\${correctWords[i]}"\\\`);
            } else {
                differences.push(\\\`Extra word "\\\${userWords[i]}"\\\`);
            }
        }
    }
    
    return differences;
}
`;
}

async function handleUpdateDataFile() {
    const allPhrases = getAllPhrases();
    const newContent = generateDataFileContent();
    
    // Create a download that user can use to replace the file
    const blob = new Blob([newContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show instructions
    const message = `✅ Downloaded updated data.js with ${allPhrases.length} phrases!

📁 To update your project:
1. Find the downloaded 'data.js' file
2. Replace the file at: js/data.js
3. Reload the page

The file now includes all your custom phrases!`;
    
    alert(message);
}
