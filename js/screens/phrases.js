// Screen 3.1 - Phrases (Practice)
let currentPhraseIndex = 0;
let currentPhrase = null;
let translationDirection = 'euskera-castellano'; // o 'castellano-euskera'
let hasChecked = false;
let phrasesViewMode = 'practice'; // 'practice' or 'review'

// Phrase selection filter
let currentFilter = 'random';   // 'random' | 'month' | 'week' | 'today' | 'date' | 'all'
let randomCount = 10;           // how many phrases when filter === 'random'
let pickedFrom = '';            // YYYY-MM-DD start of range when filter === 'date'
let pickedTo = '';              // YYYY-MM-DD end of range when filter === 'date'
let activePhrases = [];         // the phrases currently being practised (after filtering)

// Build the active phrase set from the full list according to the current filter
function buildActivePhrases() {
    const all = getAllPhrases();

    const sameDay = (dateStr, ref) => {
        if (!dateStr) return false;
        const d = new Date(dateStr);
        return d.getFullYear() === ref.getFullYear()
            && d.getMonth() === ref.getMonth()
            && d.getDate() === ref.getDate();
    };

    const now = new Date();

    switch (currentFilter) {
        case 'all':
            activePhrases = [...all];
            break;

        case 'today':
            activePhrases = all.filter(p => sameDay(p.createdAt, now));
            break;

        case 'week': {
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            activePhrases = all.filter(p => p.createdAt && new Date(p.createdAt) >= weekAgo);
            break;
        }

        case 'month':
            activePhrases = all.filter(p => {
                if (!p.createdAt) return false;
                const d = new Date(p.createdAt);
                return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
            });
            break;

        case 'date': {
            // Date range (inclusive). Either bound may be left open.
            if (!pickedFrom && !pickedTo) {
                activePhrases = [];
                break;
            }
            const from = pickedFrom ? new Date(pickedFrom + 'T00:00:00') : null;
            const to = pickedTo ? new Date(pickedTo + 'T23:59:59.999') : null;
            activePhrases = all.filter(p => {
                if (!p.createdAt) return false;
                const d = new Date(p.createdAt);
                if (from && d < from) return false;
                if (to && d > to) return false;
                return true;
            });
            break;
        }

        case 'random':
        default: {
            // Shuffle a copy, then take the requested amount
            const shuffled = [...all].sort(() => Math.random() - 0.5);
            const count = randomCount > 0 ? randomCount : all.length;
            activePhrases = shuffled.slice(0, count);
            break;
        }
    }
}

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
        ${renderFilterControls()}
        <div style="text-align: center; margin-bottom: 15px;">
            <button class="btn btn-secondary" onclick="restartFromBeginning()" style="font-size: 13px; padding: 6px 12px;">
                ↺ Restart from Beginning
            </button>
        </div>
        <div class="phrase-counter" id="phrase-counter"></div>
        <div class="phrase-container" id="phrase-content"></div>
        <div class="phrase-navigation">
            <button class="btn btn-secondary" onclick="previousPhrase()" id="prev-btn">< Previous</button>
            <button class="btn btn-secondary" onclick="nextPhrase()" id="next-btn">Next ></button>
        </div>
    `;

    // Build the active set and start practising
    buildActivePhrases();
    currentPhraseIndex = 0;
    loadPhrase();
}

function renderFilterControls() {
    return `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">Select phrases</label>
            <select id="phrase-filter" onchange="onFilterChange(this.value)"
                    style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                <option value="random" ${currentFilter === 'random' ? 'selected' : ''}>Random</option>
                <option value="month" ${currentFilter === 'month' ? 'selected' : ''}>This month</option>
                <option value="week" ${currentFilter === 'week' ? 'selected' : ''}>Last week</option>
                <option value="today" ${currentFilter === 'today' ? 'selected' : ''}>Today</option>
                <option value="date" ${currentFilter === 'date' ? 'selected' : ''}>Pick a date</option>
                <option value="all" ${currentFilter === 'all' ? 'selected' : ''}>All</option>
            </select>

            ${currentFilter === 'random' ? `
                <div style="margin-top: 10px;">
                    <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">How many</label>
                    <input type="number" id="random-count-input" min="1"
                           value="${randomCount}" onchange="onRandomCountInput(this.value)"
                           style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                </div>
            ` : ''}

            ${currentFilter === 'date' ? `
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">From</label>
                        <input type="date" id="pick-date-from" value="${pickedFrom}" onchange="onPickDateFrom(this.value)"
                               style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">To</label>
                        <input type="date" id="pick-date-to" value="${pickedTo}" onchange="onPickDateTo(this.value)"
                               style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function onFilterChange(value) {
    currentFilter = value;
    renderPracticeMode();
}

function onRandomCountInput(value) {
    const n = parseInt(value, 10);
    if (!isNaN(n) && n > 0) {
        randomCount = n;
        renderPracticeMode();
    }
}

function onPickDateFrom(value) {
    pickedFrom = value;
    renderPracticeMode();
}

function onPickDateTo(value) {
    pickedTo = value;
    renderPracticeMode();
}

async function renderReviewMode() {
    const content = document.getElementById('phrases-content');
    
    // Show loading
    content.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 40px; margin-bottom: 20px;">⏳</div>
            <p style="color: #666;">Loading your progress...</p>
        </div>
    `;
    
    // Get correct phrases from Supabase
    const result = await SupabaseProgress.getCorrectPhrases();
    
    if (!result.success) {
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
                <h3 style="color: #f44336; margin-bottom: 15px;">Error loading progress</h3>
                <p style="color: #666; font-size: 16px;">Please try again later</p>
            </div>
        `;
        return;
    }
    
    const correctPhrasesData = result.data || [];
    
    if (correctPhrasesData.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">📚</div>
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
    
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p style="color: #667eea; font-size: 18px; font-weight: 600; text-align: center;">
                You've mastered ${correctPhrasesData.length} phrase${correctPhrasesData.length !== 1 ? 's' : ''}!
            </p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
            ${correctPhrasesData.map(item => {
                const phrase = item.phrases; // Supabase join returns nested object
                const stats = {
                    correct: item.correct_count,
                    incorrect: item.incorrect_count
                };
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
    const phrases = activePhrases;

    // No phrases match the current filter
    if (!phrases || phrases.length === 0) {
        renderNoPhrasesForFilter();
        updateCounter();
        updateNavigationButtons();
        return;
    }

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

function renderNoPhrasesForFilter() {
    const content = document.getElementById('phrase-content');
    if (!content) return;
    content.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
            <h3 style="color: #667eea; margin-bottom: 10px;">No phrases for this selection</h3>
            <p style="color: #666;">Try a different filter or add more phrases.</p>
        </div>
    `;
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
    
    // Save progress to Supabase (async but don't wait)
    saveProgressAsync(currentPhrase.id, isCorrect);
    
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
        
        const noteText = currentPhrase.note 
            ? `<div style="margin-top: 12px; padding: 10px; background: #f0f7ff; border-left: 3px solid #667eea; border-radius: 4px; color: #333;">
                <strong style="color: #667eea;">📝 Note:</strong> ${currentPhrase.note}
               </div>`
            : '';
        
        feedback.innerHTML = `
            <div class="phrase-feedback correct">
                <strong>Correct!</strong>
                ${alternativesText}
                ${noteText}
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
        
        const noteText = currentPhrase.note 
            ? `<div style="margin-top: 12px; padding: 10px; background: #fff4e6; border-left: 3px solid #ff9800; border-radius: 4px; color: #333;">
                <strong style="color: #ff9800;">📝 Note:</strong> ${currentPhrase.note}
               </div>`
            : '';
        
        feedback.innerHTML = `
            <div class="phrase-feedback incorrect">
                <strong>Incorrect!</strong>
                <div style="margin-top: 10px;">
                    <strong>Correct answer:</strong> ${correctAnswer}
                </div>
                ${alternativesText}
                ${noteText}
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

function restartFromBeginning() {
    if (confirm('Restart from the first phrase?')) {
        currentPhraseIndex = 0;
        loadPhrase();
    }
}

// Async function to save progress to Supabase
async function saveProgressAsync(phraseId, isCorrect) {
    try {
        // Save phrase progress
        await SupabaseProgress.saveProgress(phraseId, isCorrect);
        
        // Save daily progress
        await SupabaseDailyProgress.saveDailyProgress(isCorrect);
        
        console.log('Progress saved successfully');
    } catch (error) {
        console.error('Error saving progress:', error);
        // Don't show error to user, fail silently
    }
}

function updateCounter() {
    const counter = document.getElementById('phrase-counter');
    if (!counter) return;
    const total = activePhrases.length;
    if (total === 0) {
        counter.textContent = 'No phrases selected';
    } else {
        counter.textContent = `Phrase ${currentPhraseIndex + 1} of ${total}`;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (!prevBtn || !nextBtn) return;

    // Disable navigation when the filter yields no phrases
    const disabled = activePhrases.length === 0;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
}
