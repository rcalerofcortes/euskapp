// Screen - Statistics (Daily Progress)
async function renderStatisticsScreen() {
    const app = document.getElementById('app');
    
    // Show loading
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Statistics</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <h2 class="text-center mb-20" style="color: #333;">Your Daily Progress</h2>
            
            <div style="text-align: center; padding: 60px 20px;">
                <div style="font-size: 40px; margin-bottom: 20px;">⏳</div>
                <p style="color: #666;">Loading your statistics...</p>
            </div>
        </div>
    `;
    
    // Get daily history from Supabase
    const result = await SupabaseDailyProgress.getDailyHistory();
    
    if (!result.success) {
        app.innerHTML = `
            <div class="screen">
                <div class="header">
                    <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                    <h1>Statistics</h1>
                    <div style="width: 40px;"></div>
                </div>
                
                <h2 class="text-center mb-20" style="color: #333;">Your Daily Progress</h2>
                
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
                    <h3 style="color: #f44336; margin-bottom: 15px;">Error loading statistics</h3>
                    <p style="color: #666; font-size: 16px;">Please try again later</p>
                </div>
            </div>
        `;
        return;
    }
    
    const history = result.data || [];
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Statistics</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <h2 class="text-center mb-20" style="color: #333;">Your Daily Progress</h2>
            
            ${history.length > 0 ? renderDailyHistory(history) : renderEmptyState()}
        </div>
    `;
}

function renderEmptyState() {
    return `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 60px; margin-bottom: 20px;">📊</div>
            <h3 style="color: #667eea; margin-bottom: 15px;">No data yet</h3>
            <p style="color: #666; font-size: 16px;">
                Start practicing to see your daily progress here!
            </p>
        </div>
    `;
}

function renderDailyHistory(history) {
    const totalStats = calculateTotalStats(history);
    
    return `
        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
            <h3 style="color: #667eea; margin-bottom: 15px; text-align: center;">Overall Statistics</h3>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; text-align: center;">
                <div>
                    <div style="font-size: 32px; font-weight: bold; color: #4caf50;">${totalStats.totalCorrect}</div>
                    <div style="color: #666; font-size: 14px;">Correct</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold; color: #f44336;">${totalStats.totalIncorrect}</div>
                    <div style="color: #666; font-size: 14px;">Incorrect</div>
                </div>
                <div>
                    <div style="font-size: 32px; font-weight: bold; color: #667eea;">${totalStats.accuracy}%</div>
                    <div style="color: #666; font-size: 14px;">Accuracy</div>
                </div>
            </div>
        </div>
        
        <h3 style="color: #333; margin-bottom: 20px;">Daily Activity</h3>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
            ${history.map(day => renderDayCard(day)).join('')}
        </div>
    `;
}

function renderDayCard(day) {
    const correct = day.correct_count || day.correct || 0;
    const incorrect = day.incorrect_count || day.incorrect || 0;
    const total = correct + incorrect;
    const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;
    const date = formatDate(day.date);
    const isToday = day.date === new Date().toISOString().split('T')[0];
    
    return `
        <div style="background: white; border: 2px solid ${isToday ? '#667eea' : '#e0e0e0'}; border-radius: 12px; padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <div>
                    <h4 style="color: #333; margin-bottom: 5px;">${date}</h4>
                    ${isToday ? '<span style="background: #667eea; color: white; padding: 3px 10px; border-radius: 12px; font-size: 12px;">Today</span>' : ''}
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 24px; font-weight: bold; color: #667eea;">${accuracy}%</div>
                    <div style="font-size: 12px; color: #666;">Accuracy</div>
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center;">
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #4caf50;">${correct}</div>
                    <div style="font-size: 12px; color: #666;">Correct</div>
                </div>
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #f44336;">${incorrect}</div>
                    <div style="font-size: 12px; color: #666;">Incorrect</div>
                </div>
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #333;">${total}</div>
                    <div style="font-size: 12px; color: #666;">Total</div>
                </div>
            </div>
        </div>
    `;
}

function calculateTotalStats(history) {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    
    history.forEach(day => {
        totalCorrect += day.correct_count || day.correct || 0;
        totalIncorrect += day.incorrect_count || day.incorrect || 0;
    });
    
    const total = totalCorrect + totalIncorrect;
    const accuracy = total > 0 ? ((totalCorrect / total) * 100).toFixed(1) : 0;
    
    return {
        totalCorrect,
        totalIncorrect,
        accuracy
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Reset time part for comparison
    today.setHours(0, 0, 0, 0);
    yesterday.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    
    if (date.getTime() === today.getTime()) {
        return 'Today';
    } else if (date.getTime() === yesterday.getTime()) {
        return 'Yesterday';
    } else {
        // Format: "Mon, Mar 28, 2026"
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}

function handleResetAllStatistics() {
    alert('Feature coming soon: Reset statistics will be implemented in a future update');
    // TODO: Implement delete all statistics from Supabase
}

function handleResetDayStatistics(date) {
    alert('Feature coming soon: Reset day statistics will be implemented in a future update');
    // TODO: Implement delete specific day statistics from Supabase
}
