// Screen 2 - Main Menu (Choose Activity)
async function renderMenuScreen() {
    const app = document.getElementById('app');
    
    // Get current user from Supabase
    const user = await SupabaseAuth.getCurrentUser();
    
    if (!user) {
        navigateTo('login');
        return;
    }
    
    const displayName = user.email.split('@')[0]; // Use part before @ as display name
    
    app.innerHTML = `
        <div class="screen">
            <div class="header">
                <h1>Hello, ${displayName}!</h1>
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
                <div class="box" onclick="navigateTo('addcontent')">
                    <h2>Add Content</h2>
                    <p>Add your own phrases</p>
                </div>
            </div>
            
            <div class="boxes-container" style="grid-template-columns: 1fr; margin-top: 20px;">
                <div class="box" onclick="navigateTo('statistics')">
                    <h2>Statistics</h2>
                    <p>View your daily progress</p>
                </div>
            </div>
            
            <div class="text-center" style="margin-top: 30px;">
                <button class="btn btn-danger" onclick="handleResetData()" style="background: #ff9800; padding: 10px 20px; font-size: 14px;">Reset My Progress</button>
            </div>
        </div>
    `;
}

async function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        const result = await SupabaseAuth.signOut();
        if (result.success) {
            navigateTo('login');
        } else {
            alert('Error logging out. Please try again.');
        }
    }
}

async function handleResetData() {
    const confirmation = confirm('WARNING: This will delete YOUR progress data. Are you sure?');
    
    if (confirmation) {
        const doubleCheck = confirm('This action cannot be undone. Delete your progress?');
        
        if (doubleCheck) {
            // TODO: Implement delete user progress from Supabase
            alert('Feature coming soon: Delete progress from cloud database');
        }
    }
}
