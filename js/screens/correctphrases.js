// Screen - My Correct Phrases (Review)
function renderCorrectPhrasesScreen() {
    const app = document.getElementById('app');
    const correctPhraseIds = Storage.getCorrectPhrases();
    
    // Get full phrase objects
    const allPhrases = getAllPhrases();
    const correctPhrases = allPhrases.filter(phrase => correctPhraseIds.includes(phrase.id));
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('study')">< Back</button>
                <h1>My Correct Phrases</h1>
                <div style="width: 40px;"></div>
            </div>
            
            ${correctPhrases.length > 0 ? renderCorrectPhrasesList(correctPhrases) : renderEmptyCorrectPhrases()}
        </div>
    `;
}

function renderEmptyCorrectPhrases() {
    return `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 60px; margin-bottom: 20px;">***</div>
            <h3 style="color: #667eea; margin-bottom: 15px;">No phrases yet</h3>
            <p style="color: #666; font-size: 16px; margin-bottom: 20px;">
                Start practicing phrases and the ones you get correct<br>
                will appear here for you to review anytime!
            </p>
            <button class="btn btn-primary" onclick="navigateTo('phrases')">Start Practicing</button>
        </div>
    `;
}

function renderCorrectPhrasesList(phrases) {
    const progress = Storage.getProgress();
    const username = Storage.getCurrentUser();
    const userProgress = progress[username] || {};
    
    return `
        <div style="margin-bottom: 20px;">
            <p style="color: #667eea; font-size: 18px; font-weight: 600; text-align: center;">
                You've mastered ${phrases.length} phrase${phrases.length !== 1 ? 's' : ''}!
            </p>
        </div>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
            ${phrases.map(phrase => {
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
                                ${phrase.euskeraAlternatives && phrase.euskeraAlternatives.length > 0 ? `
                                    <div style="font-size: 14px; color: #999; margin-bottom: 8px; font-style: italic;">
                                        Also: ${phrase.euskeraAlternatives.join(', ')}
                                    </div>
                                ` : ''}
                                <div style="font-size: 16px; color: #667eea;">
                                    ${phrase.castellano}
                                </div>
                                ${phrase.castellanoAlternatives && phrase.castellanoAlternatives.length > 0 ? `
                                    <div style="font-size: 14px; color: #999; margin-top: 4px; font-style: italic;">
                                        Also: ${phrase.castellanoAlternatives.join(', ')}
                                    </div>
                                ` : ''}
                                ${phrase.note ? `
                                    <div style="font-size: 13px; color: #333; margin-top: 8px; padding: 6px 8px; background: #f0f7ff; border-radius: 4px; border-left: 3px solid #667eea;">
                                        <strong style="color: #667eea;">📝</strong> ${phrase.note}
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
        
        <div style="text-align: center; margin-top: 30px;">
            <button class="btn btn-primary" onclick="navigateTo('phrases')">Practice More</button>
        </div>
    `;
}
