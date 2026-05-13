// Supabase Configuration and Client
// This file initializes the Supabase client and provides helper functions

// Prevent multiple execution
if (typeof window.SUPABASE_INITIALIZED === 'undefined') {
    console.log('Loading supabase-client.js...');

    // Supabase credentials
    const SUPABASE_URL = 'https://uizqufaegpqeehasqxks.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpenF1ZmFlZ3BxZWVoYXNxeGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzY0MTIsImV4cCI6MjA5NDIxMjQxMn0.61V2_0Ya3pimD1Y3PiFVPIW4SHlenC13mJJ_OW1XIsk';

    // Check if Supabase library is loaded
    if (typeof window.supabase === 'undefined') {
        console.error('❌ CRITICAL ERROR: Supabase library not loaded!');
        console.error('Make sure the CDN script is included and loaded before this file.');
        alert('Error: Could not load Supabase library. Please check your internet connection and refresh the page.');
        throw new Error('Supabase library not available');
    }

    console.log('✅ Supabase library detected');

    // Initialize Supabase client
    let supabase;
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase client created successfully');
    } catch (error) {
        console.error('❌ Error creating Supabase client:', error);
        alert('Error initializing Supabase. Please refresh the page.');
        throw error;
    }

    // Export for use in other files
    window.supabaseClient = supabase;

// =====================================================
// AUTHENTICATION FUNCTIONS
// =====================================================

const SupabaseAuth = {
    // Sign up a new user
    async signUp(email, password, metadata = {}) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: metadata // Additional user metadata
                }
            });
            
            if (error) throw error;
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in an existing user
    async signIn(email, password) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            
            if (error) throw error;
            return { success: true, user: data.user, session: data.session };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out current user
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            return user;
        } catch (error) {
            console.error('Get user error:', error);
            return null;
        }
    },

    // Get current session
    async getSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            return session;
        } catch (error) {
            console.error('Get session error:', error);
            return null;
        }
    },

    // Listen to auth state changes
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange((event, session) => {
            callback(event, session);
        });
    }
};

// =====================================================
// DATABASE FUNCTIONS - PHRASES
// =====================================================

const SupabasePhrases = {
    // Get all phrases
    async getAllPhrases() {
        try {
            const { data, error } = await supabase
                .from('phrases')
                .select('*')
                .order('id', { ascending: true });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get phrases error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get a phrase by ID
    async getPhraseById(id) {
        try {
            const { data, error } = await supabase
                .from('phrases')
                .select('*')
                .eq('id', id)
                .single();
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get phrase error:', error);
            return { success: false, error: error.message };
        }
    },

    // Add a new phrase
    async addPhrase(euskera, castellano, euskeraAlternatives = null, note = null) {
        try {
            const { data, error } = await supabase
                .from('phrases')
                .insert([
                    { 
                        euskera, 
                        castellano,
                        euskera_alternatives: euskeraAlternatives,
                        note 
                    }
                ])
                .select();
            
            if (error) throw error;
            return { success: true, data: data[0] };
        } catch (error) {
            console.error('Add phrase error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// DATABASE FUNCTIONS - USER PROGRESS
// =====================================================

const SupabaseProgress = {
    // Get user's progress for all phrases
    async getUserProgress() {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id);
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get user progress error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get progress for a specific phrase
    async getPhraseProgress(phraseId) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('user_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('phrase_id', phraseId)
                .single();
            
            if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows
            return { success: true, data: data || null };
        } catch (error) {
            console.error('Get phrase progress error:', error);
            return { success: false, error: error.message };
        }
    },

    // Save or update phrase progress
    async saveProgress(phraseId, isCorrect) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            // Get existing progress
            const existingProgress = await this.getPhraseProgress(phraseId);
            
            if (existingProgress.data) {
                // Update existing progress
                const { data, error } = await supabase
                    .from('user_progress')
                    .update({
                        correct_count: existingProgress.data.correct_count + (isCorrect ? 1 : 0),
                        incorrect_count: existingProgress.data.incorrect_count + (isCorrect ? 0 : 1)
                    })
                    .eq('user_id', user.id)
                    .eq('phrase_id', phraseId)
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            } else {
                // Insert new progress
                const { data, error } = await supabase
                    .from('user_progress')
                    .insert([{
                        user_id: user.id,
                        phrase_id: phraseId,
                        correct_count: isCorrect ? 1 : 0,
                        incorrect_count: isCorrect ? 0 : 1
                    }])
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            }
        } catch (error) {
            console.error('Save progress error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get phrases that user has answered correctly at least once
    async getCorrectPhrases() {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('user_progress')
                .select('*, phrases(*)')
                .eq('user_id', user.id)
                .gt('correct_count', 0)
                .order('correct_count', { ascending: false });
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get correct phrases error:', error);
            return { success: false, error: error.message };
        }
    }
};

// =====================================================
// DATABASE FUNCTIONS - DAILY PROGRESS
// =====================================================

const SupabaseDailyProgress = {
    // Save or update daily progress
    async saveDailyProgress(isCorrect) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            // Check if today's progress exists
            const { data: existing, error: selectError } = await supabase
                .from('daily_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('date', today)
                .single();

            if (selectError && selectError.code !== 'PGRST116') throw selectError;

            if (existing) {
                // Update existing
                const { data, error } = await supabase
                    .from('daily_progress')
                    .update({
                        correct_count: existing.correct_count + (isCorrect ? 1 : 0),
                        incorrect_count: existing.incorrect_count + (isCorrect ? 0 : 1)
                    })
                    .eq('user_id', user.id)
                    .eq('date', today)
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            } else {
                // Insert new
                const { data, error } = await supabase
                    .from('daily_progress')
                    .insert([{
                        user_id: user.id,
                        date: today,
                        correct_count: isCorrect ? 1 : 0,
                        incorrect_count: isCorrect ? 0 : 1
                    }])
                    .select();
                
                if (error) throw error;
                return { success: true, data: data[0] };
            }
        } catch (error) {
            console.error('Save daily progress error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user's daily progress history
    async getDailyHistory(limit = 30) {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('daily_progress')
                .select('*')
                .eq('user_id', user.id)
                .order('date', { ascending: false })
                .limit(limit);
            
            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Get daily history error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get user statistics (total correct/incorrect)
    async getUserStats() {
        try {
            const user = await SupabaseAuth.getCurrentUser();
            if (!user) throw new Error('User not authenticated');

            const { data, error } = await supabase
                .from('user_progress')
                .select('correct_count, incorrect_count')
                .eq('user_id', user.id);
            
            if (error) throw error;

            const stats = data.reduce((acc, curr) => {
                acc.totalCorrect += curr.correct_count;
                acc.totalIncorrect += curr.incorrect_count;
                return acc;
            }, { totalCorrect: 0, totalIncorrect: 0 });

            stats.totalAttempts = stats.totalCorrect + stats.totalIncorrect;

            return { success: true, data: stats };
        } catch (error) {
            console.error('Get user stats error:', error);
            return { success: false, error: error.message };
        }
    }
};

// Export all modules
window.SupabaseAuth = SupabaseAuth;
window.SupabasePhrases = SupabasePhrases;
window.SupabaseProgress = SupabaseProgress;
window.SupabaseDailyProgress = SupabaseDailyProgress;

console.log('Supabase client initialized successfully');

// Mark as initialized to prevent double execution
window.SUPABASE_INITIALIZED = true;

} else {
    console.log('Supabase already initialized, skipping...');
}
