// Navigation system and route management
const routes = {
    'login': renderLoginScreen,
    'menu': renderMenuScreen,
    'study': renderStudyScreen,
    'phrases': renderPhrasesScreen,
    'addcontent': renderAddContentScreen,
    'challenges': renderChallengesScreen,
    'statistics': renderStatisticsScreen
};

let currentRoute = 'login';

// Navigate to a screen
async function navigateTo(route) {
    if (!routes[route]) {
        console.error(`Ruta no encontrada: ${route}`);
        return;
    }
    
    // Verify authentication
    const session = await SupabaseAuth.getSession();
    
    if (!session && route !== 'login') {
        // If no user is logged in and it's not the login screen, redirect to login
        currentRoute = 'login';
        routes['login']();
        return;
    }
    
    if (session && route === 'login') {
        // If user is already logged in and tries to go to login, redirect to menu
        currentRoute = 'menu';
        await routes['menu']();
        return;
    }
    
    currentRoute = route;
    const result = routes[route]();
    
    // If the route returns a promise (async function), await it
    if (result instanceof Promise) {
        await result;
    }
}

// Initialize the application
async function initApp() {
    console.log('Initializing EuskApp...');
    
    try {
        // Check if Supabase modules are available
        if (typeof SupabaseAuth === 'undefined') {
            throw new Error('SupabaseAuth not loaded');
        }
        if (typeof loadPhrasesFromSupabase === 'undefined') {
            throw new Error('loadPhrasesFromSupabase not loaded');
        }
        
        console.log('Loading phrases from Supabase...');
        // Load phrases from Supabase
        await loadPhrasesFromSupabase();
        console.log('Phrases loaded successfully');
        
        console.log('Checking authentication session...');
        const session = await SupabaseAuth.getSession();
        console.log('Session:', session ? 'Found' : 'Not found');
        
        if (session) {
            await navigateTo('menu');
        } else {
            navigateTo('login');
        }
        
        console.log('✅ App initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
        
        // Show error message to user
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div style="padding: 40px; text-align: center; font-family: Arial, sans-serif;">
                    <h1 style="color: #f44336; font-size: 48px; margin-bottom: 20px;">⚠️</h1>
                    <h2 style="color: #333; margin-bottom: 15px;">Error Loading Application</h2>
                    <p style="color: #666; margin-bottom: 20px;">
                        ${error.message || 'Unknown error occurred'}
                    </p>
                    <p style="color: #999; font-size: 14px;">
                        Please check the browser console (F12) for more details.
                    </p>
                    <button onclick="location.reload()" 
                            style="margin-top: 20px; padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
                        Reload Page
                    </button>
                </div>
            `;
        }
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initApp();
});
