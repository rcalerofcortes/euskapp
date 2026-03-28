// Local storage system using localStorage
const Storage = {
    // Save current user
    setCurrentUser(username) {
        localStorage.setItem('currentUser', username);
    },

    // Get current user
    getCurrentUser() {
        return localStorage.getItem('currentUser');
    },

    // Logout
    logout() {
        localStorage.removeItem('currentUser');
    },

    // Save a new user (registration)
    registerUser(username, password) {
        const users = this.getUsers();
        if (users[username]) {
            return { success: false, message: 'User already exists' };
        }
        users[username] = { password, createdAt: new Date().toISOString() };
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    },

    // Validate login
    loginUser(username, password) {
        const users = this.getUsers();
        if (!users[username]) {
            return { success: false, message: 'User not found' };
        }
        if (users[username].password !== password) {
            return { success: false, message: 'Incorrect password' };
        }
        return { success: true };
    },

    // Get all users
    getUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : {};
    },

    // Save phrase progress
    saveProgress(phraseId, correct) {
        const username = this.getCurrentUser();
        if (!username) return;

        const progress = this.getProgress();
        if (!progress[username]) {
            progress[username] = {};
        }
        if (!progress[username][phraseId]) {
            progress[username][phraseId] = { correct: 0, incorrect: 0 };
        }

        if (correct) {
            progress[username][phraseId].correct++;
        } else {
            progress[username][phraseId].incorrect++;
        }

        localStorage.setItem('progress', JSON.stringify(progress));
        
        // Save daily progress
        this.saveDailyProgress(correct);
    },

    // Save daily progress
    saveDailyProgress(correct) {
        const username = this.getCurrentUser();
        if (!username) return;

        const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
        const dailyProgress = this.getDailyProgress();

        if (!dailyProgress[username]) {
            dailyProgress[username] = {};
        }

        if (!dailyProgress[username][today]) {
            dailyProgress[username][today] = { correct: 0, incorrect: 0, date: today };
        }

        if (correct) {
            dailyProgress[username][today].correct++;
        } else {
            dailyProgress[username][today].incorrect++;
        }

        localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
    },

    // Get daily progress
    getDailyProgress() {
        const dailyProgress = localStorage.getItem('dailyProgress');
        return dailyProgress ? JSON.parse(dailyProgress) : {};
    },

    // Get user's daily progress history
    getUserDailyHistory() {
        const username = this.getCurrentUser();
        if (!username) return [];

        const dailyProgress = this.getDailyProgress();
        const userHistory = dailyProgress[username] || {};

        // Convert to array and sort by date (most recent first)
        return Object.values(userHistory).sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
    },

    // Get progress
    getProgress() {
        const progress = localStorage.getItem('progress');
        return progress ? JSON.parse(progress) : {};
    },

    // Get user statistics
    getUserStats() {
        const username = this.getCurrentUser();
        if (!username) return null;

        const progress = this.getProgress();
        const userProgress = progress[username] || {};

        let totalCorrect = 0;
        let totalIncorrect = 0;

        Object.values(userProgress).forEach(stat => {
            totalCorrect += stat.correct;
            totalIncorrect += stat.incorrect;
        });

        return {
            totalCorrect,
            totalIncorrect,
            totalAttempts: totalCorrect + totalIncorrect
        };
    },

    // Get phrases that user has answered correctly
    getCorrectPhrases() {
        const username = this.getCurrentUser();
        if (!username) return [];

        const progress = this.getProgress();
        const userProgress = progress[username] || {};

        // Get phrase IDs that have at least one correct answer
        const correctPhraseIds = Object.keys(userProgress)
            .filter(phraseId => userProgress[phraseId].correct > 0)
            .map(id => parseInt(id));

        return correctPhraseIds;
    },

    // Reset all data (users and progress)
    resetAllData() {
        localStorage.clear();
    },

    // Reset all statistics (keep users)
    resetAllStatistics() {
        localStorage.removeItem('progress');
        localStorage.removeItem('dailyProgress');
    },

    // Reset statistics for a specific date
    resetDayStatistics(date) {
        const username = this.getCurrentUser();
        if (!username) return;

        const dailyProgress = this.getDailyProgress();
        
        if (dailyProgress[username] && dailyProgress[username][date]) {
            delete dailyProgress[username][date];
            localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
        }
    },

    // Save custom phrase
    saveCustomPhrase(euskera, castellano) {
        const customPhrases = this.getCustomPhrases();
        const newId = customPhrases.length > 0 
            ? Math.max(...customPhrases.map(p => p.id)) + 1 
            : 1000; // Start custom IDs from 1000
        
        const newPhrase = {
            id: newId,
            euskera: euskera.trim(),
            castellano: castellano.trim(),
            custom: true,
            createdAt: new Date().toISOString()
        };
        
        customPhrases.push(newPhrase);
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
        return newPhrase;
    },

    // Get custom phrases
    getCustomPhrases() {
        const phrases = localStorage.getItem('customPhrases');
        return phrases ? JSON.parse(phrases) : [];
    },

    // Delete custom phrase
    deleteCustomPhrase(id) {
        let customPhrases = this.getCustomPhrases();
        customPhrases = customPhrases.filter(p => p.id !== id);
        localStorage.setItem('customPhrases', JSON.stringify(customPhrases));
    }
};
