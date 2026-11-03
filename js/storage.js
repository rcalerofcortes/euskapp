// Local storage helper
// Authentication and all progress/statistics now live in Supabase.
// localStorage is only used to remember the last phrase the user was on,
// so practice resumes where they left off. The index is keyed by the
// current Supabase user id.
const Storage = {
    // Internal: resolve a stable key for the signed-in user.
    // Falls back to 'guest' if the user id is not yet available.
    _userKey() {
        return window.currentUserId || 'guest';
    },

    // Get the map of { userId: phraseIndex }
    getPhraseProgress() {
        const progress = localStorage.getItem('phraseProgress');
        return progress ? JSON.parse(progress) : {};
    },

    // Save the current phrase index for the signed-in user
    saveCurrentPhraseIndex(index) {
        const phraseProgress = this.getPhraseProgress();
        phraseProgress[this._userKey()] = index;
        localStorage.setItem('phraseProgress', JSON.stringify(phraseProgress));
    },

    // Get the current phrase index for the signed-in user
    getCurrentPhraseIndex() {
        const phraseProgress = this.getPhraseProgress();
        return phraseProgress[this._userKey()] || 0;
    },

    // Reset the phrase index back to the first phrase
    resetPhraseIndex() {
        this.saveCurrentPhraseIndex(0);
    }
};
