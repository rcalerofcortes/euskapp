// Screen 1 - Login/Registration
function renderLoginScreen() {
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="screen">
            <div class="form-container">
                <h1 class="text-center mb-20" style="color: #667eea;">EuskApp</h1>
                <p class="text-center mb-20" style="color: #666;">Learn Basque the easy way</p>
                
                <div id="login-form">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input type="text" id="username" placeholder="Enter your username">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password">
                    </div>
                    <div id="error-message" style="color: #f44336; margin-bottom: 15px; display: none;"></div>
                    <div class="form-buttons">
                        <button class="btn btn-primary" onclick="handleLogin()">Login</button>
                        <button class="btn btn-secondary" onclick="handleRegister()">Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Focus on the username input
    document.getElementById('username').focus();

    // Allow login with Enter
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');

    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }

    const result = Storage.loginUser(username, password);
    
    if (result.success) {
        Storage.setCurrentUser(username);
        navigateTo('menu');
    } else {
        showError(result.message);
    }
}

function handleRegister() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');

    if (!username || !password) {
        showError('Please fill in all fields');
        return;
    }

    if (password.length < 4) {
        showError('Password must be at least 4 characters');
        return;
    }

    const result = Storage.registerUser(username, password);
    
    if (result.success) {
        Storage.setCurrentUser(username);
        navigateTo('menu');
    } else {
        showError(result.message);
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide the error after 3 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}
