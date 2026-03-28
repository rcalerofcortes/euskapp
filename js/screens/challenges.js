// Screen 4 - Challenges (Coming Soon)
function renderChallengesScreen() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Challenges</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 80px; margin-bottom: 20px;">***</div>
                <h2 style="color: #667eea; margin-bottom: 15px;">Coming Soon</h2>
                <p style="color: #666; font-size: 18px;">
                    This section will be available soon.<br>
                    Here you'll be able to test your knowledge with exciting challenges!</p>
                </p>
            </div>
        </div>
    `;
}
