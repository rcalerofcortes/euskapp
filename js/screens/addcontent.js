// Screen - Add Content (Add Custom Phrases)
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
                
                <div class="form-group">
                    <label for="phrase-euskera">Phrase in Basque (Euskera)</label>
                    <input type="text" id="phrase-euskera" placeholder="Enter phrase in Basque" autocomplete="off">
                </div>
                
                <div class="form-group">
                    <label for="phrase-castellano">Translation in Spanish (Castellano)</label>
                    <input type="text" id="phrase-castellano" placeholder="Enter translation in Spanish" autocomplete="off">
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="handleAddPhrase()" style="flex: 1;">Add Phrase</button>
                    <button class="btn btn-secondary" onclick="clearAddPhraseForm()">Clear</button>
                </div>
                
                <div id="add-phrase-message" style="margin-top: 15px; display: none;"></div>
            </div>
            
            ${customPhrases.length > 0 ? renderCustomPhrasesList(customPhrases) : renderEmptyCustomPhrases()}
        </div>
    `;
    
    // Focus on first input
    document.getElementById('phrase-euskera').focus();
    
    // Allow adding with Enter on last field
    document.getElementById('phrase-castellano').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddPhrase();
        }
    });
}

function renderEmptyCustomPhrases() {
    return `
        <div style="text-align: center; padding: 40px 20px; margin-top: 30px; background: #f8f9fa; border-radius: 12px;">
            <h3 style="color: #667eea; margin-bottom: 10px;">No custom phrases yet</h3>
            <p style="color: #666;">Add your first phrase above to get started!</p>
        </div>
    `;
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
                            <div style="font-size: 14px; color: #667eea;">
                                ${phrase.castellano}
                            </div>
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
    const euskera = document.getElementById('phrase-euskera').value.trim();
    const castellano = document.getElementById('phrase-castellano').value.trim();
    const messageDiv = document.getElementById('add-phrase-message');
    
    // Validate inputs
    if (!euskera || !castellano) {
        showAddPhraseMessage('Please fill in both fields', 'error');
        return;
    }
    
    if (euskera.length < 2 || castellano.length < 2) {
        showAddPhraseMessage('Phrases must be at least 2 characters long', 'error');
        return;
    }
    
    // Save phrase
    try {
        Storage.saveCustomPhrase(euskera, castellano);
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
    document.getElementById('phrase-euskera').value = '';
    document.getElementById('phrase-castellano').value = '';
    document.getElementById('phrase-euskera').focus();
    
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
