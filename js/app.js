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
function navigateTo(route) {
    if (!routes[route]) {
        console.error(`Ruta no encontrada: ${route}`);
        return;
    }
    
    // Verify authentication
    const user = Storage.getCurrentUser();
    
    if (!user && route !== 'login') {
        // If no user is logged in and it's not the login screen, redirect to login
        currentRoute = 'login';
        routes['login']();
        return;
    }
    
    if (user && route === 'login') {
        // If user is already logged in and tries to go to login, redirect to menu
        currentRoute = 'menu';
        routes['menu']();
        return;
    }
    
    currentRoute = route;
    routes[route]();
}

// Initialize the application
function initApp() {
    const user = Storage.getCurrentUser();
    
    if (user) {
        navigateTo('menu');
    } else {
        navigateTo('login');
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);
