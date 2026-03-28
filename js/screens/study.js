// Screen 3 - Study (Categories)
function renderStudyScreen() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Study</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <h2 class="text-center mb-20" style="color: #333;">Choose a category</h2>
            
            <div class="boxes-container">
                <div class="box" onclick="navigateTo('phrases')">
                    <h2>Phrases</h2>
                    <p>Practice common phrases</p>
                </div>
                
                <div class="box" style="opacity: 0.5; cursor: not-allowed;" title="Coming soon">
                    <h2>Verbs</h2>
                    <p>Coming soon</p>
                </div>
                
                <div class="box" style="opacity: 0.5; cursor: not-allowed;" title="Coming soon">
                    <h2>Vocabulary</h2>
                    <p>Coming soon</p>
                </div>
                
                <div class="box" style="opacity: 0.5; cursor: not-allowed;" title="Coming soon">
                    <h2>Review</h2>
                    <p>Coming soon</p>
                </div>
            </div>
            </div>
        </div>
    `;
}
