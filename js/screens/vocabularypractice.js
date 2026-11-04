// Screen - Vocabulary practice (Study -> Vocabulary)
// Mirrors the Phrases screen, but works on the vocabulary table.
let vocabCurrentIndex = 0;
let vocabCurrentWord = null;
let vocabDirection = 'euskera-castellano'; // or 'castellano-euskera'
let vocabHasChecked = false;
let vocabViewMode = 'practice'; // 'practice' or 'review'

// Selection filter
let vocabFilter = 'random';   // 'random' | 'month' | 'week' | 'today' | 'date' | 'all'
let vocabRandomCount = 10;
let vocabPickedFrom = '';     // YYYY-MM-DD start of range when filter === 'date'
let vocabPickedTo = '';       // YYYY-MM-DD end of range when filter === 'date'
let activeWords = [];

function renderVocabularyPracticeScreen() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('study')">< Back</button>
                <h1>Vocabulary</h1>
                <div style="width: 40px;"></div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="btn ${vocabViewMode === 'practice' ? 'btn-primary' : 'btn-secondary'}"
                        onclick="switchVocabView('practice')"
                        style="flex: 1;">Practice</button>
                <button class="btn ${vocabViewMode === 'review' ? 'btn-primary' : 'btn-secondary'}"
                        onclick="switchVocabView('review')"
                        style="flex: 1;">My Correct Words</button>
            </div>

            <div id="vocab-content"></div>
        </div>
    `;

    if (vocabViewMode === 'practice') {
        renderVocabPracticeMode();
    } else {
        renderVocabReviewMode();
    }
}

function switchVocabView(mode) {
    vocabViewMode = mode;
    renderVocabularyPracticeScreen();
}

// Build the active word set from the full list according to the current filter
function buildActiveWords() {
    const all = getAllVocabulary();

    const sameDay = (dateStr, ref) => {
        if (!dateStr) return false;
        const d = new Date(dateStr);
        return d.getFullYear() === ref.getFullYear()
            && d.getMonth() === ref.getMonth()
            && d.getDate() === ref.getDate();
    };

    const now = new Date();

    switch (vocabFilter) {
        case 'all':
            activeWords = [...all];
            break;

        case 'today':
            activeWords = all.filter(w => sameDay(w.createdAt, now));
            break;

        case 'week': {
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            activeWords = all.filter(w => w.createdAt && new Date(w.createdAt) >= weekAgo);
            break;
        }

        case 'month':
            activeWords = all.filter(w => {
                if (!w.createdAt) return false;
                const d = new Date(w.createdAt);
                return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
            });
            break;

        case 'date': {
            // Date range (inclusive). Either bound may be left open.
            if (!vocabPickedFrom && !vocabPickedTo) {
                activeWords = [];
                break;
            }
            const from = vocabPickedFrom ? new Date(vocabPickedFrom + 'T00:00:00') : null;
            const to = vocabPickedTo ? new Date(vocabPickedTo + 'T23:59:59.999') : null;
            activeWords = all.filter(w => {
                if (!w.createdAt) return false;
                const d = new Date(w.createdAt);
                if (from && d < from) return false;
                if (to && d > to) return false;
                return true;
            });
            break;
        }

        case 'random':
        default: {
            const shuffled = [...all].sort(() => Math.random() - 0.5);
            const count = vocabRandomCount > 0 ? vocabRandomCount : all.length;
            activeWords = shuffled.slice(0, count);
            break;
        }
    }
}

function renderVocabPracticeMode() {
    const content = document.getElementById('vocab-content');

    content.innerHTML = `
        ${renderVocabFilterControls()}
        <div style="text-align: center; margin-bottom: 15px;">
            <button class="btn btn-secondary" onclick="vocabRestartFromBeginning()" style="font-size: 13px; padding: 6px 12px;">
                ↺ Restart from Beginning
            </button>
        </div>
        <div class="phrase-counter" id="vocab-counter"></div>
        <div class="phrase-container" id="vocab-card-content"></div>
        <div class="phrase-navigation">
            <button class="btn btn-secondary" onclick="vocabPrevious()" id="vocab-prev-btn">< Previous</button>
            <button class="btn btn-secondary" onclick="vocabNext()" id="vocab-next-btn">Next ></button>
        </div>
    `;

    buildActiveWords();
    vocabCurrentIndex = 0;
    loadWord();
}

function renderVocabFilterControls() {
    return `
        <div style="background: #f8f9fa; border-radius: 12px; padding: 15px; margin-bottom: 20px;">
            <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">Select words</label>
            <select id="vocab-filter" onchange="onVocabFilterChange(this.value)"
                    style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                <option value="random" ${vocabFilter === 'random' ? 'selected' : ''}>Random</option>
                <option value="month" ${vocabFilter === 'month' ? 'selected' : ''}>This month</option>
                <option value="week" ${vocabFilter === 'week' ? 'selected' : ''}>Last week</option>
                <option value="today" ${vocabFilter === 'today' ? 'selected' : ''}>Today</option>
                <option value="date" ${vocabFilter === 'date' ? 'selected' : ''}>Pick a date</option>
                <option value="all" ${vocabFilter === 'all' ? 'selected' : ''}>All</option>
            </select>

            ${vocabFilter === 'random' ? `
                <div style="margin-top: 10px;">
                    <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">How many</label>
                    <input type="number" id="vocab-random-count-input" min="1"
                           value="${vocabRandomCount}" onchange="onVocabRandomCountInput(this.value)"
                           style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                </div>
            ` : ''}

            ${vocabFilter === 'date' ? `
                <div style="margin-top: 10px; display: flex; gap: 10px;">
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">From</label>
                        <input type="date" id="vocab-pick-date-from" value="${vocabPickedFrom}" onchange="onVocabPickDateFrom(this.value)"
                               style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="display: block; font-size: 13px; color: #666; margin-bottom: 6px;">To</label>
                        <input type="date" id="vocab-pick-date-to" value="${vocabPickedTo}" onchange="onVocabPickDateTo(this.value)"
                               style="width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 15px;">
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function onVocabFilterChange(value) {
    vocabFilter = value;
    renderVocabPracticeMode();
}

function onVocabRandomCountInput(value) {
    const n = parseInt(value, 10);
    if (!isNaN(n) && n > 0) {
        vocabRandomCount = n;
        renderVocabPracticeMode();
    }
}

function onVocabPickDateFrom(value) {
    vocabPickedFrom = value;
    renderVocabPracticeMode();
}

function onVocabPickDateTo(value) {
    vocabPickedTo = value;
    renderVocabPracticeMode();
}

function loadWord() {
    const words = activeWords;

    if (!words || words.length === 0) {
        renderNoWordsForFilter();
        updateVocabCounter();
        updateVocabNavButtons();
        return;
    }

    if (vocabCurrentIndex >= words.length) {
        vocabCurrentIndex = 0;
    }
    if (vocabCurrentIndex < 0) {
        vocabCurrentIndex = words.length - 1;
    }

    vocabCurrentWord = words[vocabCurrentIndex];
    vocabHasChecked = false;

    // Alternate translation direction randomly
    vocabDirection = Math.random() > 0.5 ? 'euskera-castellano' : 'castellano-euskera';

    renderWordCard();
    updateVocabCounter();
    updateVocabNavButtons();
}

function renderNoWordsForFilter() {
    const content = document.getElementById('vocab-card-content');
    if (!content) return;
    content.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <div style="font-size: 48px; margin-bottom: 15px;">🔍</div>
            <h3 style="color: #667eea; margin-bottom: 10px;">No words for this selection</h3>
            <p style="color: #666;">Try a different filter or add more words.</p>
        </div>
    `;
}

function renderWordCard() {
    const content = document.getElementById('vocab-card-content');
    const question = vocabDirection === 'euskera-castellano'
        ? vocabCurrentWord.euskera
        : vocabCurrentWord.castellano;

    const placeholder = vocabDirection === 'euskera-castellano'
        ? 'Write the translation in Spanish'
        : 'Write the translation in Basque';

    content.innerHTML = `
        <div class="phrase-card" id="vocab-card">
            <div class="phrase-question">${question}</div>
            <input
                type="text"
                class="phrase-input"
                id="vocab-user-answer"
                placeholder="${placeholder}"
                autocomplete="off"
            >
            <div class="phrase-controls">
                <button class="btn btn-secondary" onclick="clearWordAnswer()">Clear</button>
                <button class="btn btn-primary" onclick="checkWordAnswer()">Check</button>
            </div>
            <div id="vocab-feedback"></div>
        </div>
    `;

    document.getElementById('vocab-user-answer').focus();

    document.getElementById('vocab-user-answer').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !vocabHasChecked) {
            checkWordAnswer();
        }
    });
}

function clearWordAnswer() {
    const input = document.getElementById('vocab-user-answer');
    input.value = '';
    input.disabled = false;
    input.focus();

    document.getElementById('vocab-feedback').innerHTML = '';

    const card = document.getElementById('vocab-card');
    card.classList.remove('correct', 'incorrect');

    vocabHasChecked = false;
}

function checkWordAnswer() {
    if (vocabHasChecked) return;

    const userAnswer = document.getElementById('vocab-user-answer').value.trim();

    if (!userAnswer) {
        alert('Please write an answer');
        return;
    }

    const correctAnswer = vocabDirection === 'euskera-castellano'
        ? vocabCurrentWord.castellano
        : vocabCurrentWord.euskera;

    const alternatives = vocabDirection === 'euskera-castellano'
        ? (vocabCurrentWord.castellanoAlternatives || [])
        : (vocabCurrentWord.euskeraAlternatives || []);

    const isCorrect = compareAnswers(userAnswer, correctAnswer, alternatives);
    const card = document.getElementById('vocab-card');
    const feedback = document.getElementById('vocab-feedback');

    vocabHasChecked = true;

    // Save progress to Supabase (async, don't wait)
    saveWordProgressAsync(vocabCurrentWord.id, isCorrect);

    const exampleText = vocabCurrentWord.example
        ? `<div style="margin-top: 10px;"><em>Example: ${vocabCurrentWord.example}</em></div>`
        : '';

    if (isCorrect) {
        card.classList.add('correct');

        const allCorrectAnswers = [correctAnswer, ...alternatives];
        const normalize = (str) => {
            return removeAccents(str)
                .toLowerCase()
                .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, '')
                .trim()
                .replace(/\s+/g, ' ');
        };
        const normalizedUserAnswer = normalize(userAnswer);
        const otherAnswers = allCorrectAnswers.filter(ans => normalize(ans) !== normalizedUserAnswer);

        const alternativesText = otherAnswers.length > 0
            ? `<div style="margin-top: 8px;"><em>Also correct: ${otherAnswers.join(', ')}</em></div>`
            : '';

        const noteText = vocabCurrentWord.note
            ? `<div style="margin-top: 12px; padding: 10px; background: #f0f7ff; border-left: 3px solid #667eea; border-radius: 4px; color: #333;">
                <strong style="color: #667eea;">📝 Note:</strong> ${vocabCurrentWord.note}
               </div>`
            : '';

        feedback.innerHTML = `
            <div class="phrase-feedback correct">
                <strong>Correct!</strong>
                ${alternativesText}
                ${exampleText}
                ${noteText}
            </div>
        `;
    } else {
        card.classList.add('incorrect');

        const alternativesText = alternatives.length > 0
            ? `<div style="margin-top: 8px;"><strong>Alternative answers:</strong> ${alternatives.join(', ')}</div>`
            : '';

        const noteText = vocabCurrentWord.note
            ? `<div style="margin-top: 12px; padding: 10px; background: #fff4e6; border-left: 3px solid #ff9800; border-radius: 4px; color: #333;">
                <strong style="color: #ff9800;">📝 Note:</strong> ${vocabCurrentWord.note}
               </div>`
            : '';

        feedback.innerHTML = `
            <div class="phrase-feedback incorrect">
                <strong>Incorrect!</strong>
                <div style="margin-top: 10px;">
                    <strong>Correct answer:</strong> ${correctAnswer}
                </div>
                ${alternativesText}
                ${exampleText}
                ${noteText}
            </div>
        `;
    }

    document.getElementById('vocab-user-answer').disabled = true;
}

function vocabNext() {
    vocabCurrentIndex++;
    loadWord();
}

function vocabPrevious() {
    vocabCurrentIndex--;
    loadWord();
}

function vocabRestartFromBeginning() {
    if (confirm('Restart from the first word?')) {
        vocabCurrentIndex = 0;
        loadWord();
    }
}

async function saveWordProgressAsync(vocabularyId, isCorrect) {
    try {
        await SupabaseVocabularyProgress.saveProgress(vocabularyId, isCorrect);
        await SupabaseDailyProgress.saveDailyProgress(isCorrect);
        console.log('Vocabulary progress saved successfully');
    } catch (error) {
        console.error('Error saving vocabulary progress:', error);
    }
}

function updateVocabCounter() {
    const counter = document.getElementById('vocab-counter');
    if (!counter) return;
    const total = activeWords.length;
    if (total === 0) {
        counter.textContent = 'No words selected';
    } else {
        counter.textContent = `Word ${vocabCurrentIndex + 1} of ${total}`;
    }
}

function updateVocabNavButtons() {
    const prevBtn = document.getElementById('vocab-prev-btn');
    const nextBtn = document.getElementById('vocab-next-btn');
    if (!prevBtn || !nextBtn) return;

    const disabled = activeWords.length === 0;
    prevBtn.disabled = disabled;
    nextBtn.disabled = disabled;
}

async function renderVocabReviewMode() {
    const content = document.getElementById('vocab-content');

    content.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 40px; margin-bottom: 20px;">⏳</div>
            <p style="color: #666;">Loading your progress...</p>
        </div>
    `;

    const result = await SupabaseVocabularyProgress.getCorrectWords();

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

    const correctWordsData = result.data || [];

    if (correctWordsData.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 60px; margin-bottom: 20px;">📚</div>
                <h3 style="color: #667eea; margin-bottom: 15px;">No words yet</h3>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                    Start practicing words and the ones you get correct<br>
                    will appear here for you to review anytime!
                </p>
                <button class="btn btn-primary" onclick="switchVocabView('practice')">Start Practicing</button>
            </div>
        `;
        return;
    }

    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <p style="color: #667eea; font-size: 18px; font-weight: 600; text-align: center;">
                You've mastered ${correctWordsData.length} word${correctWordsData.length !== 1 ? 's' : ''}!
            </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 15px;">
            ${correctWordsData.map(item => {
                const word = item.vocabulary; // Supabase join returns nested object
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
                                    ${word.euskera}
                                </div>
                                <div style="font-size: 16px; color: #667eea;">
                                    ${word.castellano}
                                </div>
                                ${word.example ? `
                                    <div style="font-size: 13px; color: #555; margin-top: 6px; font-style: italic;">
                                        💬 ${word.example}
                                    </div>
                                ` : ''}
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
