// Screen 3.1 - Phrases (Practice)
let currentPhraseIndex = 0;
let currentPhrase = null;
let translationDirection = 'euskera-castellano'; // o 'castellano-euskera'
let hasChecked = false;
let phrasesViewMode = 'practice'; // 'practice' or 'review'

function renderPhrasesScreen() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('study')">< Back</button>
                <h1>Phrases</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="btn ${phrasesViewMode === 'practice' ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="switchPhrasesView('practice')" 
                        style="flex: 1;">Practice</button>
                <button class="btn ${phrasesViewMode === 'review' ? 'btn-primary' : 'btn-secondary'}" 
                        onclick="switchPhrasesView('review')" 
                        style="flex: 1;">My Correct Phrases</button>
            </div>
            
            <div id="phrases-content"></div>
        </div>
    `;
    
    if (phrasesViewMode === 'practice') {
        renderPracticeMode();
    } else {
        renderReviewMode();
    }
}

function switchPhrasesView(mode) {
    phrasesViewMode = mode;
    renderPhrasesScreen();
}

function renderPracticeMode() {
    const content = document.getElementById('phrases-content');
    
    content.innerHTML = `
        <div class="phrase-counter" id="phrase-counter"></div>
        <div class="phrase-container" id="phrase-content"></div>
        <div class="phrase-navigation">
            <button class="btn btn-secondary" onclick="previousPhrase()" id="prev-btn">< Previous</button>
            <button class="btn btn-secondary" onclick="nextPhrase()" id="next-btn">Next ></button>
        </div>
    `;
    
    loadPhrase();
}

function renderReviewMode() {
    const content = document.getElementById('phrases-content');
    const correctPhraseIds = Storage.getCorrectPhrases();
    const allPhrases = getAllPhrases();
    const correctPhrases = allPhrases.filter(phrase => correctPhraseIds.includes(phrase.id));
    
    if (correctPhrases.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">***</div>
                <h3 style="color: #667eea; margin-bottom: 15px;">No phrases yet</h3>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                    Start practicing phrases and the ones you get correct<br>
                    will appear here for you to review anytime!
                </p>
                <button class="btn btn-primary" onclick="switchPhrasesView('practice')">Start Practicing</button>
            </div>
        `;
        return;
    }
    
    const progress = Storage.getProgress();
    const username = Storage.getCurrentUser();
    const userProgress = progress[username] || {};
    
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p style="color: #667eea; font-size: 18px; font-weight: 600; text-align: center;">
                You've mastered ${correctPhrases.length} phrase${correctPhrases.length !== 1 ? 's' : ''}!
            </p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
            ${correctPhrases.map(phrase => {
                const stats = userProgress[phrase.id] || { correct: 0, incorrect: 0 };
                const total = stats.correct + stats.incorrect;
                const accuracy = total > 0 ? ((stats.correct / total) * 100).toFixed(0) : 0;
                
                return `
                    <div class="phrase-review-card">
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px;">
                            <div style="flex: 1;">
                                <div style="font-size: 18px; font-weight: 600; color: #333; margin-bottom: 8px;">
                                    ${phrase.euskera}
                                </div>
                                <div style="font-size: 16px; color: #667eea;">
                                    ${phrase.castellano}
                                </div>
                            </div>
                            <div style="text-align: right; margin-left: 15px;">
                                <div style="font-size: 24px; font-weight: bold; color: #4caf50;">
                                    ${accuracy}%
                                </div>
                                <div style="font-size: 12px; color: #666;">
                                    accuracy
                                </div>
                            </div>
                        </div>
                        
                        <div style="display: flex; gap: 20px; font-size: 14px; color: #666; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                            <div>
                                <span style="color: #4caf50; font-weight: 600;">${stats.correct}</span> correct
                            </div>
                            <div>
                                <span style="color: #f44336; font-weight: 600;">${stats.incorrect}</span> incorrect
                            </div>
                            <div>
                                <span style="font-weight: 600;">${total}</span> total attempts
                            </div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function loadPhrase() {
    const phrases = getAllPhrases();
    
    if (currentPhraseIndex >= phrases.length) {
        currentPhraseIndex = 0;
    }
    if (currentPhraseIndex < 0) {
        currentPhraseIndex = phrases.length - 1;
    }
    
    currentPhrase = phrases[currentPhraseIndex];
    hasChecked = false;
    
    // Alternate translation direction randomly
    translationDirection = Math.random() > 0.5 ? 'euskera-castellano' : 'castellano-euskera';
    
    renderPhraseCard();
    updateCounter();
    updateNavigationButtons();
}

function renderPhraseCard() {
    const content = document.getElementById('phrase-content');
    const question = translationDirection === 'euskera-castellano' 
        ? currentPhrase.euskera 
        : currentPhrase.castellano;
    
    const placeholder = translationDirection === 'euskera-castellano'
        ? 'Write the translation in Spanish'
        : 'Write the translation in Basque';
    
    content.innerHTML = `
        <div class="phrase-card" id="phrase-card">
            <div class="phrase-question">${question}</div>
            <input 
                type="text" 
                class="phrase-input" 
                id="user-answer" 
                placeholder="${placeholder}"
                autocomplete="off"
            >
            <div class="phrase-controls">
                <button class="btn btn-secondary" onclick="clearAnswer()">Clear</button>
                <button class="btn btn-primary" onclick="checkAnswer()">Check</button>
            </div>
            <div id="feedback"></div>
        </div>
    `;
    
    // Focus on the input
    document.getElementById('user-answer').focus();
    
    // Allow checking with Enter
    document.getElementById('user-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !hasChecked) {
            checkAnswer();
        }
    });
}

function clearAnswer() {
    const input = document.getElementById('user-answer');
    input.value = '';
    input.disabled = false;
    input.focus();
    
    // Clear feedback if it exists
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = '';
    
    // Remove correct/incorrect classes
    const card = document.getElementById('phrase-card');
    card.classList.remove('correct', 'incorrect');
    
    hasChecked = false;
}

function checkAnswer() {
    if (hasChecked) return;
    
    const userAnswer = document.getElementById('user-answer').value.trim();
    
    if (!userAnswer) {
        alert('Please write an answer');
        return;
    }
    
    const correctAnswer = translationDirection === 'euskera-castellano'
        ? currentPhrase.castellano
        : currentPhrase.euskera;
    
    const alternatives = translationDirection === 'euskera-castellano'
        ? (currentPhrase.castellanoAlternatives || [])
        : (currentPhrase.euskeraAlternatives || []);
    
    const isCorrect = compareAnswers(userAnswer, correctAnswer, alternatives);
    const card = document.getElementById('phrase-card');
    const feedback = document.getElementById('feedback');
    
    hasChecked = true;
    
    // Save progress
    Storage.saveProgress(currentPhrase.id, isCorrect);
    
    if (isCorrect) {
        // Correct answer
        card.classList.add('correct');
        
        // Build list of all possible correct answers
        const allCorrectAnswers = [correctAnswer, ...alternatives];
        
        // Find which answer matches the user's (normalized comparison)
        const normalize = (str) => {
            return removeAccents(str)
                .toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, '')
                .trim()
                .replace(/\s+/g, ' ');
        };
        
        const normalizedUserAnswer = normalize(userAnswer);
        const matchedAnswer = allCorrectAnswers.find(ans => normalize(ans) === normalizedUserAnswer);
        
        // Get the other alternatives (excluding the one user wrote)
        const otherAnswers = allCorrectAnswers.filter(ans => normalize(ans) !== normalizedUserAnswer);
        
        const alternativesText = otherAnswers.length > 0 
            ? `<div style="margin-top: 8px;">
                <em>Also correct: ${otherAnswers.join(', ')}</em>
               </div>`
            : '';
        
        feedback.innerHTML = `
            <div class="phrase-feedback correct">
                <strong>Correct!</strong>
                ${alternativesText}
            </div>
        `;
    } else {
        // Incorrect answer
        card.classList.add('incorrect');
        const alternativesText = alternatives.length > 0 
            ? `<div style="margin-top: 8px;">
                <strong>Alternative answers:</strong> ${alternatives.join(', ')}
               </div>`
            : '';
        
        feedback.innerHTML = `
            <div class="phrase-feedback incorrect">
                <strong>Incorrect!</strong>
                <div style="margin-top: 10px;">
                    <strong>Correct answer:</strong> ${correctAnswer}
                </div>
                ${alternativesText}
            </div>
        `;
    }
    
    // Disable the input
    document.getElementById('user-answer').disabled = true;
}

function nextPhrase() {
    currentPhraseIndex++;
    loadPhrase();
}

function previousPhrase() {
    currentPhraseIndex--;
    loadPhrase();
}

function updateCounter() {
    const counter = document.getElementById('phrase-counter');
    const total = getAllPhrases().length;
    counter.textContent = `Phrase ${currentPhraseIndex + 1} of ${total}`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const total = getAllPhrases().length;
    
    // Always enable both buttons (infinite loop)
    prevBtn.disabled = false;
    nextBtn.disabled = false;
}
