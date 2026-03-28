// Screen 2 - Main Menu (Choose Activity)
function renderMenuScreen() {
    const app = document.getElementById('app');
    const username = Storage.getCurrentUser();
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <h1>Hello, ${username}!</h1>
                <button class="logout-button" onclick="handleLogout()">Logout</button>
            </div>
            
            <h2 class="text-center mb-20" style="color: #333;">Choose an activity</h2>
            
            <div class="boxes-container">
                <div class="box" onclick="navigateTo('study')">
                    <h2>Study</h2>
                    <p>Learn new phrases and vocabulary</p>
                </div>
                
                <div class="box" onclick="navigateTo('challenges')">
                    <h2>Challenges</h2>
                    <p>Test your knowledge</p>
                </div>
            </div>
            
            <div class="boxes-container" style="grid-template-columns: 1fr; margin-top: 20px;">
                <div class="box" onclick="navigateTo('statistics')">
                    <h2>Statistics</h2>
                    <p>View your daily progress</p>
                </div>
            </div>
            
            <div class="text-center" style="margin-top: 30px;">
                <button class="btn btn-danger" onclick="handleResetData()" style="background: #ff9800; padding: 10px 20px; font-size: 14px;">Reset All Data</button>
            </div>
        </div>
    `;
}

function getUserStatsHTML() {
    const stats = Storage.getUserStats();
    
    if (!stats || stats.totalAttempts === 0) {
        return '<p style="color: #666;">You haven\'t practiced yet. Start now!</p>';
    }
    
    const accuracy = ((stats.totalCorrect / stats.totalAttempts) * 100).toFixed(1);
    
    return `
        <h3 style="color: #667eea; margin-bottom: 10px;">Your Statistics</h3>
        <p style="color: #333;">Correct: <strong>${stats.totalCorrect}</strong></p>
        <p style="color: #333;">Incorrect: <strong>${stats.totalIncorrect}</strong></p>
        <p style="color: #333;">Accuracy: <strong>${accuracy}%</strong></p>
    `;
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        Storage.logout();
        navigateTo('login');
    }
}

function handleResetData() {
    const confirmation = confirm('WARNING: This will delete ALL users, progress, and data permanently. Are you sure?');
    
    if (confirmation) {
        const doubleCheck = confirm('This action cannot be undone. Delete everything?');
        
        if (doubleCheck) {
            Storage.resetAllData();
            alert('All data has been deleted successfully');
            navigateTo('login');
        }
    }
}
