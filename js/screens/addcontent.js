// Screen - Add Content (Add Phrases / Vocabulary)
let addContentDirection = 'castellano-euskera'; // Direction shared by both tabs
let activeContentTab = 'phrases'; // 'phrases' or 'vocabulary'

function renderAddContentScreen() {
    const app = document.getElementById('app');

    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Add Content</h1>
                <div style="width: 40px;"></div>
            </div>

            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="btn ${activeContentTab === 'phrases' ? 'btn-primary' : 'btn-secondary'}"
                        onclick="switchContentTab('phrases')"
                        style="flex: 1;">Phrases</button>
                <button class="btn ${activeContentTab === 'vocabulary' ? 'btn-primary' : 'btn-secondary'}"
                        onclick="switchContentTab('vocabulary')"
                        style="flex: 1;">Vocabulary</button>
            </div>

            <div id="content-tab"></div>
        </div>
    `;

    if (activeContentTab === 'phrases') {
        renderPhrasesTab();
    } else {
        renderVocabularyTab();
    }
}

function switchContentTab(tab) {
    activeContentTab = tab;
    renderAddContentScreen();
}

function toggleAddContentDirection() {
    addContentDirection = addContentDirection === 'castellano-euskera' ? 'euskera-castellano' : 'castellano-euskera';
    renderAddContentScreen();
}

function directionToggleButton() {
    return `
        <div style="display: flex; justify-content: center; margin-bottom: 25px;">
            <button id="direction-toggle" class="btn btn-primary" onclick="toggleAddContentDirection()"
                    style="padding: 12px 24px; font-size: 16px; font-weight: 600;">
                ${addContentDirection === 'castellano-euskera' ? 'CAS → EUS' : 'EUS → CAS'}
            </button>
        </div>
    `;
}

// =====================================================
// PHRASES TAB  (unchanged behaviour)
// =====================================================

function renderPhrasesTab() {
    const container = document.getElementById('content-tab');
    const allPhrases = getAllPhrases();

    container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto;">
            <h2 style="color: #333; margin-bottom: 20px;">Add New Phrase</h2>

            ${directionToggleButton()}

            <div id="add-content-form">
                ${renderAddContentForm()}
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="handleAddPhrase()" style="flex: 1;">Add Phrase</button>
                <button class="btn btn-secondary" onclick="clearAddPhraseForm()">Clear</button>
            </div>

            <div id="add-phrase-message" style="margin-top: 15px; display: none;"></div>

            <div style="margin-top: 30px; padding: 20px; background: #f0f7ff; border-radius: 12px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 5px;">
                    ${allPhrases.length}
                </div>
                <div style="color: #666; font-size: 14px;">
                    Total phrases in database
                </div>
            </div>
        </div>

        ${allPhrases.length > 0 ? renderAllPhrasesList(allPhrases) : renderEmptyPhrases()}
    `;

    // Focus on first input
    setTimeout(() => {
        const firstInput = document.getElementById('phrase-main');
        if (firstInput) firstInput.focus();
    }, 100);
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

        <div class="form-group">
            <label for="phrase-note">Note (Optional)</label>
            <textarea id="phrase-note"
                      placeholder="Add a grammar note or explanation (e.g., why an alternative is valid)"
                      autocomplete="off"
                      style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
        </div>
    `;
}

function renderEmptyPhrases() {
    return `
        <div style="text-align: center; padding: 40px 20px; margin-top: 30px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">No phrases yet</h3>
            <p style="color: #666;">Add your first phrase above to get started!</p>
        </div>
    `;
}

function renderAllPhrasesList(phrases) {
    return `
        <div style="margin-top: 40px;">
            <h3 style="color: #333; margin-bottom: 20px;">All Phrases (${phrases.length})</h3>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${phrases.map(phrase => `
                    <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 15px; display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;">
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
                            ${phrase.note ? `
                                <div style="font-size: 12px; color: #333; margin-top: 8px; padding: 6px 8px; background: #f0f7ff; border-radius: 4px; border-left: 3px solid #667eea;">
                                    <strong style="color: #667eea;">📝</strong> ${phrase.note}
                                </div>
                            ` : ''}
                        </div>
                        <button class="btn btn-secondary" onclick="openEditPhraseModal(${phrase.id})"
                                style="padding: 6px 12px; font-size: 13px; white-space: nowrap;">
                            ✏️ Edit
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>

        <div id="edit-phrase-modal-container"></div>
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

async function handleAddPhrase() {
    const mainPhrase = document.getElementById('phrase-main').value.trim();
    const translationPhrase = document.getElementById('phrase-translation').value.trim();

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

    // Get note if provided
    const noteInput = document.getElementById('phrase-note');
    const note = noteInput ? noteInput.value.trim() : '';

    // Show loading
    showAddPhraseMessage('Adding phrase...', 'loading');

    // Save phrase to Supabase
    try {
        const result = await SupabasePhrases.addPhrase(
            euskera,
            castellano,
            euskeraAlternatives.length > 0 ? euskeraAlternatives : null,
            note || null
        );

        if (result.success) {
            // Reload phrases from Supabase
            await loadPhrasesFromSupabase();

            showAddPhraseMessage('Phrase added successfully!', 'success');

            // Clear form
            clearAddPhraseForm();

            // Refresh the screen to show new phrase
            setTimeout(() => {
                renderAddContentScreen();
            }, 1000);
        } else {
            showAddPhraseMessage('Error adding phrase: ' + (result.error || 'Unknown error'), 'error');
        }
    } catch (error) {
        showAddPhraseMessage('Error adding phrase. Please try again.', 'error');
        console.error('Error adding phrase:', error);
    }
}

function clearAddPhraseForm() {
    // Clear main fields
    const mainInput = document.getElementById('phrase-main');
    const translationInput = document.getElementById('phrase-translation');
    const noteInput = document.getElementById('phrase-note');
    if (mainInput) mainInput.value = '';
    if (translationInput) translationInput.value = '';
    if (noteInput) noteInput.value = '';

    // Clear all alternative fields
    document.getElementById('alternatives-main-container').innerHTML = '';
    document.getElementById('alternatives-translation-container').innerHTML = '';

    // Reset counters
    alternativeCounters = { main: 0, translation: 0 };

    // Focus on first input
    if (mainInput) mainInput.focus();

    const messageDiv = document.getElementById('add-phrase-message');
    if (messageDiv) messageDiv.style.display = 'none';
}

function showAddPhraseMessage(message, type) {
    showContentMessage('add-phrase-message', message, type);
}

// =====================================================
// EDIT PHRASE MODAL
// =====================================================

function openEditPhraseModal(id) {
    const phrase = getAllPhrases().find(p => p.id === id);
    if (!phrase) return;

    const container = document.getElementById('edit-phrase-modal-container');
    if (!container) return;

    const alternatives = (phrase.euskeraAlternatives || []).join(', ');

    container.innerHTML = `
        <div class="modal-overlay" onclick="if (event.target === this) closeEditPhraseModal()">
            <div class="modal-box">
                <h2 style="color: #333; margin-bottom: 20px;">Edit Phrase</h2>

                <div class="form-group">
                    <label for="edit-phrase-euskera">Euskera</label>
                    <input type="text" id="edit-phrase-euskera" autocomplete="off" value="${escapeAttr(phrase.euskera)}">
                </div>

                <div class="form-group">
                    <label for="edit-phrase-alternatives">Alternatives in Euskera (comma-separated)</label>
                    <input type="text" id="edit-phrase-alternatives" autocomplete="off"
                           placeholder="e.g. Gaur gauza asko egin duzu" value="${escapeAttr(alternatives)}">
                </div>

                <div class="form-group">
                    <label for="edit-phrase-castellano">Castellano</label>
                    <input type="text" id="edit-phrase-castellano" autocomplete="off" value="${escapeAttr(phrase.castellano)}">
                </div>

                <div class="form-group">
                    <label for="edit-phrase-note">Note (Optional)</label>
                    <textarea id="edit-phrase-note" autocomplete="off"
                              style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; resize: vertical;">${escapeHtml(phrase.note || '')}</textarea>
                </div>

                <div id="edit-phrase-message" style="margin-top: 10px; display: none;"></div>

                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="handleSaveEditPhrase(${id})" style="flex: 1;">Save</button>
                    <button class="btn btn-secondary" onclick="closeEditPhraseModal()" style="flex: 1;">Cancel</button>
                </div>
            </div>
        </div>
    `;

    const firstInput = document.getElementById('edit-phrase-euskera');
    if (firstInput) firstInput.focus();
}

function closeEditPhraseModal() {
    const container = document.getElementById('edit-phrase-modal-container');
    if (container) container.innerHTML = '';
}

async function handleSaveEditPhrase(id) {
    const euskera = document.getElementById('edit-phrase-euskera').value.trim();
    const castellano = document.getElementById('edit-phrase-castellano').value.trim();
    const note = document.getElementById('edit-phrase-note').value.trim();
    const alternatives = document.getElementById('edit-phrase-alternatives').value
        .split(',')
        .map(a => a.trim())
        .filter(a => a.length > 0);

    if (!euskera || !castellano) {
        showContentMessage('edit-phrase-message', 'Euskera and Castellano are required', 'error');
        return;
    }

    showContentMessage('edit-phrase-message', 'Saving...', 'loading');

    try {
        const result = await SupabasePhrases.updatePhrase(
            id,
            euskera,
            castellano,
            alternatives.length > 0 ? alternatives : null,
            note || null
        );

        if (result.success) {
            await loadPhrasesFromSupabase();
            closeEditPhraseModal();
            renderAddContentScreen();
        } else {
            showContentMessage('edit-phrase-message', 'Error saving: ' + (result.error || 'Unknown error'), 'error');
        }
    } catch (error) {
        showContentMessage('edit-phrase-message', 'Error saving. Please try again.', 'error');
        console.error('Error updating phrase:', error);
    }
}

// Escape helpers for safely injecting values into HTML attributes / text
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
}

// =====================================================
// VOCABULARY TAB
// =====================================================

function renderVocabularyTab() {
    const container = document.getElementById('content-tab');
    const allVocabulary = getAllVocabulary();

    container.innerHTML = `
        <div style="max-width: 500px; margin: 0 auto;">
            <h2 style="color: #333; margin-bottom: 20px;">Add New Word</h2>

            ${directionToggleButton()}

            <div id="add-vocabulary-form">
                ${renderVocabularyForm()}
            </div>

            <div style="display: flex; gap: 10px; margin-top: 20px;">
                <button class="btn btn-primary" onclick="handleAddVocabulary()" style="flex: 1;">Add Word</button>
                <button class="btn btn-secondary" onclick="clearVocabularyForm()">Clear</button>
            </div>

            <div id="add-vocabulary-message" style="margin-top: 15px; display: none;"></div>

            <div style="margin-top: 30px; padding: 20px; background: #f0f7ff; border-radius: 12px; text-align: center;">
                <div style="font-size: 24px; font-weight: bold; color: #667eea; margin-bottom: 5px;">
                    ${allVocabulary.length}
                </div>
                <div style="color: #666; font-size: 14px;">
                    Total words in database
                </div>
            </div>
        </div>

        ${allVocabulary.length > 0 ? renderAllVocabularyList(allVocabulary) : renderEmptyVocabulary()}
    `;

    // Focus on first input
    setTimeout(() => {
        const firstInput = document.getElementById('vocab-main');
        if (firstInput) firstInput.focus();
    }, 100);
}

function renderVocabularyForm() {
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const mainLang = isEusToCas ? 'Euskera' : 'Spanish';
    const transLang = isEusToCas ? 'Spanish' : 'Euskera';

    return `
        <div class="form-group">
            <label for="vocab-main">Word in ${mainLang}</label>
            <input type="text" id="vocab-main" placeholder="Enter word in ${mainLang}" autocomplete="off">
        </div>

        <div id="vocab-alternatives-main-container" style="margin-bottom: 20px;">
            <!-- Dynamic alternatives will be added here -->
        </div>

        <button type="button" class="btn btn-secondary" onclick="addVocabAlternativeField('main')"
                style="width: 100%; margin-bottom: 20px; background: #e0e0e0; color: #333;">
            + Add Alternative in ${mainLang}
        </button>

        <div class="form-group">
            <label for="vocab-translation">Translation in ${transLang}</label>
            <input type="text" id="vocab-translation" placeholder="Enter translation in ${transLang}" autocomplete="off">
        </div>

        <div id="vocab-alternatives-translation-container" style="margin-bottom: 20px;">
            <!-- Dynamic alternatives will be added here -->
        </div>

        <button type="button" class="btn btn-secondary" onclick="addVocabAlternativeField('translation')"
                style="width: 100%; margin-bottom: 20px; background: #e0e0e0; color: #333;">
            + Add Alternative in ${transLang}
        </button>

        <div class="form-group">
            <label for="vocab-example">Example phrase</label>
            <input type="text" id="vocab-example" placeholder="Enter an example phrase using the word" autocomplete="off">
        </div>

        <div class="form-group">
            <label for="vocab-note">Note (Optional)</label>
            <textarea id="vocab-note"
                      placeholder="Add a grammar note or explanation"
                      autocomplete="off"
                      style="width: 100%; min-height: 60px; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-family: inherit; resize: vertical;"></textarea>
        </div>
    `;
}

function renderEmptyVocabulary() {
    return `
        <div style="text-align: center; padding: 40px 20px; margin-top: 30px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">No words yet</h3>
            <p style="color: #666;">Add your first word above to get started!</p>
        </div>
    `;
}

function renderAllVocabularyList(words) {
    return `
        <div style="margin-top: 40px;">
            <h3 style="color: #333; margin-bottom: 20px;">All Words (${words.length})</h3>

            <div style="display: flex; flex-direction: column; gap: 10px;">
                ${words.map(word => `
                    <div style="background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 15px;">
                        <div style="flex: 1;">
                            <div style="font-size: 16px; font-weight: 600; color: #333; margin-bottom: 5px;">
                                ${word.euskera}
                            </div>
                            ${word.euskeraAlternatives && word.euskeraAlternatives.length > 0 ? `
                                <div style="font-size: 12px; color: #999; font-style: italic; margin-bottom: 5px;">
                                    Also: ${word.euskeraAlternatives.join(', ')}
                                </div>
                            ` : ''}
                            <div style="font-size: 14px; color: #667eea;">
                                ${word.castellano}
                            </div>
                            ${word.castellanoAlternatives && word.castellanoAlternatives.length > 0 ? `
                                <div style="font-size: 12px; color: #999; font-style: italic; margin-top: 3px;">
                                    Also: ${word.castellanoAlternatives.join(', ')}
                                </div>
                            ` : ''}
                            ${word.example ? `
                                <div style="font-size: 13px; color: #555; margin-top: 8px; font-style: italic;">
                                    💬 ${word.example}
                                </div>
                            ` : ''}
                            ${word.note ? `
                                <div style="font-size: 12px; color: #333; margin-top: 8px; padding: 6px 8px; background: #f0f7ff; border-radius: 4px; border-left: 3px solid #667eea;">
                                    <strong style="color: #667eea;">📝</strong> ${word.note}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

let vocabAlternativeCounters = { main: 0, translation: 0 };

function addVocabAlternativeField(type) {
    const container = document.getElementById(`vocab-alternatives-${type}-container`);
    const counter = ++vocabAlternativeCounters[type];
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const lang = type === 'main'
        ? (isEusToCas ? 'Euskera' : 'Spanish')
        : (isEusToCas ? 'Spanish' : 'Euskera');

    const fieldHtml = `
        <div class="form-group" id="vocab-alt-${type}-${counter}" style="position: relative;">
            <label for="vocab-${type}-alt-${counter}">Alternative ${counter} in ${lang}</label>
            <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" id="vocab-${type}-alt-${counter}"
                       placeholder="Enter alternative ${counter}"
                       autocomplete="off"
                       style="flex: 1;">
                <button type="button" onclick="removeVocabAlternativeField('${type}', ${counter})"
                        class="btn"
                        style="background: #f44336; color: white; padding: 8px 12px; min-width: 40px;">
                    ✕
                </button>
            </div>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', fieldHtml);
    document.getElementById(`vocab-${type}-alt-${counter}`).focus();
}

function removeVocabAlternativeField(type, counter) {
    const field = document.getElementById(`vocab-alt-${type}-${counter}`);
    if (field) {
        field.remove();
    }
}

async function handleAddVocabulary() {
    const mainWord = document.getElementById('vocab-main').value.trim();
    const translationWord = document.getElementById('vocab-translation').value.trim();

    // Validate inputs
    if (!mainWord || !translationWord) {
        showAddVocabularyMessage('Please fill in both word fields', 'error');
        return;
    }

    // Collect alternatives from dynamic fields
    const mainAlternatives = [];
    const translationAlternatives = [];

    for (let i = 1; i <= vocabAlternativeCounters.main; i++) {
        const input = document.getElementById(`vocab-main-alt-${i}`);
        if (input && input.value.trim()) {
            mainAlternatives.push(input.value.trim());
        }
    }

    for (let i = 1; i <= vocabAlternativeCounters.translation; i++) {
        const input = document.getElementById(`vocab-translation-alt-${i}`);
        if (input && input.value.trim()) {
            translationAlternatives.push(input.value.trim());
        }
    }

    // Determine which is euskera and which is castellano based on direction
    const isEusToCas = addContentDirection === 'euskera-castellano';
    const euskera = isEusToCas ? mainWord : translationWord;
    const castellano = isEusToCas ? translationWord : mainWord;
    const euskeraAlternatives = isEusToCas ? mainAlternatives : translationAlternatives;
    const castellanoAlternatives = isEusToCas ? translationAlternatives : mainAlternatives;

    // Optional fields
    const exampleInput = document.getElementById('vocab-example');
    const example = exampleInput ? exampleInput.value.trim() : '';
    const noteInput = document.getElementById('vocab-note');
    const note = noteInput ? noteInput.value.trim() : '';

    // Show loading
    showAddVocabularyMessage('Adding word...', 'loading');

    // Save word to Supabase
    try {
        const result = await SupabaseVocabulary.addVocabularyWord(
            euskera,
            castellano,
            euskeraAlternatives.length > 0 ? euskeraAlternatives : null,
            castellanoAlternatives.length > 0 ? castellanoAlternatives : null,
            example || null,
            note || null
        );

        if (result.success) {
            // Reload vocabulary from Supabase
            await loadVocabularyFromSupabase();

            showAddVocabularyMessage('Word added successfully!', 'success');

            // Clear form
            clearVocabularyForm();

            // Refresh the screen to show new word
            setTimeout(() => {
                renderAddContentScreen();
            }, 1000);
        } else {
            showAddVocabularyMessage('Error adding word: ' + (result.error || 'Unknown error'), 'error');
        }
    } catch (error) {
        showAddVocabularyMessage('Error adding word. Please try again.', 'error');
        console.error('Error adding word:', error);
    }
}

function clearVocabularyForm() {
    const mainInput = document.getElementById('vocab-main');
    const translationInput = document.getElementById('vocab-translation');
    const exampleInput = document.getElementById('vocab-example');
    const noteInput = document.getElementById('vocab-note');
    if (mainInput) mainInput.value = '';
    if (translationInput) translationInput.value = '';
    if (exampleInput) exampleInput.value = '';
    if (noteInput) noteInput.value = '';

    // Clear all alternative fields
    document.getElementById('vocab-alternatives-main-container').innerHTML = '';
    document.getElementById('vocab-alternatives-translation-container').innerHTML = '';

    // Reset counters
    vocabAlternativeCounters = { main: 0, translation: 0 };

    // Focus on first input
    if (mainInput) mainInput.focus();

    const messageDiv = document.getElementById('add-vocabulary-message');
    if (messageDiv) messageDiv.style.display = 'none';
}

function showAddVocabularyMessage(message, type) {
    showContentMessage('add-vocabulary-message', message, type);
}

// =====================================================
// SHARED HELPERS
// =====================================================

function showContentMessage(elementId, message, type) {
    const messageDiv = document.getElementById(elementId);
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.textAlign = 'center';

    if (type === 'success') {
        messageDiv.style.background = '#4caf50';
        messageDiv.style.color = 'white';
    } else if (type === 'loading') {
        messageDiv.style.background = '#667eea';
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
