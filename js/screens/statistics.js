// Screen - Statistics (Daily Progress)
function renderStatisticsScreen() {
    const app = document.getElementById('app');
    const history = Storage.getUserDailyHistory();
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <button class="back-button" onclick="navigateTo('menu')">< Back</button>
                <h1>Statistics</h1>
                <div style="width: 40px;"></div>
            </div>
            
            <h2 class="text-center mb-20" style="color: #333;">Your Daily Progress</h2>
            
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <button class="btn btn-danger" onclick="handleResetAllStatistics()" style="flex: 1; background: #ff9800; font-size: 14px;">Reset All Statistics</button>
            </div>
            
            ${history.length > 0 ? renderDailyHistory(history) : renderEmptyState()}
        </div>
    `;
}

function renderEmptyState() {
    return `
        <div style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 60px; margin-bottom: 20px;">***</div>
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
    const total = day.correct + day.incorrect;
    const accuracy = total > 0 ? ((day.correct / total) * 100).toFixed(1) : 0;
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
            
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; text-align: center; margin-bottom: 15px;">
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #4caf50;">${day.correct}</div>
                    <div style="font-size: 12px; color: #666;">Correct</div>
                </div>
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #f44336;">${day.incorrect}</div>
                    <div style="font-size: 12px; color: #666;">Incorrect</div>
                </div>
                <div>
                    <div style="font-size: 20px; font-weight: bold; color: #333;">${total}</div>
                    <div style="font-size: 12px; color: #666;">Total</div>
                </div>
            </div>
            
            <div style="text-align: center; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                <button class="btn btn-secondary" onclick="handleResetDayStatistics('${day.date}')" style="font-size: 12px; padding: 8px 15px;">Reset This Day</button>
            </div>
        </div>
    `;
}

function calculateTotalStats(history) {
    let totalCorrect = 0;
    let totalIncorrect = 0;
    
    history.forEach(day => {
        totalCorrect += day.correct;
        totalIncorrect += day.incorrect;
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
    const confirmation = confirm('WARNING: This will delete ALL your statistics and progress permanently. Your user account will remain. Are you sure?');
    
    if (confirmation) {
        const doubleCheck = confirm('This action cannot be undone. Delete all statistics?');
        
        if (doubleCheck) {
            Storage.resetAllStatistics();
            alert('All statistics have been deleted successfully');
            renderStatisticsScreen();
        }
    }
}

function handleResetDayStatistics(date) {
    const dateLabel = formatDate(date);
    const confirmation = confirm(`Are you sure you want to delete statistics for ${dateLabel}?`);
    
    if (confirmation) {
        Storage.resetDayStatistics(date);
        alert(`Statistics for ${dateLabel} have been deleted`);
        renderStatisticsScreen();
    }
}
