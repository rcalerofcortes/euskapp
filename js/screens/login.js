// Screen 1 - Login/Registration
console.log('login.js loaded');

function renderLoginScreen() {
    console.log('Rendering login screen');
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="screen">
            <div class="form-container">
                <h1 class="text-center mb-20" style="color: #667eea;">EuskApp</h1>
                <p class="text-center mb-20" style="color: #666;">Learn Basque the easy way</p>
                
                <div id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password">
                    </div>
                    <div id="error-message" style="color: #f44336; margin-bottom: 15px; display: none;"></div>
                    <div id="success-message" style="color: #4caf50; margin-bottom: 15px; display: none;"></div>
                    <div class="form-buttons">
                        <button class="btn btn-primary" onclick="handleLogin()">Login</button>
                        <button class="btn btn-secondary" onclick="handleRegister()">Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Focus on the email input
    document.getElementById('email').focus();

    // Allow login with Enter
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
}

async function handleLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    // Show loading state
    const loginBtn = document.querySelector('.btn-primary');
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Logging in...';
    loginBtn.disabled = true;

    const result = await SupabaseAuth.signIn(email, password);
    
    loginBtn.textContent = originalText;
    loginBtn.disabled = false;

    if (result.success) {
        navigateTo('menu');
    } else {
        showError(result.error || 'Login failed. Please check your credentials.');
    }
}

async function handleRegister() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }

    // Validate email format
    if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
    }

    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }

    // Show loading state
    const registerBtn = document.querySelector('.btn-secondary');
    const originalText = registerBtn.textContent;
    registerBtn.textContent = 'Creating account...';
    registerBtn.disabled = true;

    console.log('🔵 Attempting to register user:', email);

    try {
        const result = await SupabaseAuth.signUp(email, password, {
            created_at: new Date().toISOString()
        });
        
        console.log('🔵 Registration result:', result);
        
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;

        if (result.success) {
            if (result.user) {
                console.log('✅ User created:', result.user.id);
                showSuccess('Account created! Please check your email to confirm your account, then login.');
            } else {
                console.warn('⚠️ Success but no user data returned');
                showSuccess('Account created! You can now login.');
            }
        } else {
            console.error('❌ Registration failed:', result.error);
            showError(result.error || 'Registration failed. Email may already be in use.');
        }
    } catch (error) {
        console.error('❌ Registration exception:', error);
        registerBtn.textContent = originalText;
        registerBtn.disabled = false;
        showError('Error creating account. Please try again.');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    const successDiv = document.getElementById('success-message');
    
    // Hide success message if showing
    if (successDiv) successDiv.style.display = 'none';
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide the error after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    const errorDiv = document.getElementById('error-message');
    
    // Hide error message if showing
    if (errorDiv) errorDiv.style.display = 'none';
    
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    // Hide the success after 7 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 7000);
}
