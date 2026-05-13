// Database of phrases in Basque and Spanish
// This will be populated from Supabase on app initialization
let phrasesData = [];

// Load phrases from Supabase
async function loadPhrasesFromSupabase() {
    console.log('loadPhrasesFromSupabase() called');
    
    try {
        // Check if Supabase modules are available
        if (typeof SupabasePhrases === 'undefined') {
            console.error('SupabasePhrases not available');
            loadFallbackPhrases();
            return false;
        }
        
        console.log('Fetching phrases from Supabase...');
        const result = await SupabasePhrases.getAllPhrases();
        console.log('Supabase result:', result);
        
        if (result.success && result.data) {
            // Convert Supabase data format to app format
            phrasesData = result.data.map(phrase => ({
                id: phrase.id,
                euskera: phrase.euskera,
                castellano: phrase.castellano,
                euskeraAlternatives: phrase.euskera_alternatives,
                note: phrase.note
            }));
            
            console.log(`✅ Loaded ${phrasesData.length} phrases from Supabase`);
            return true;
        } else {
            console.error('Failed to load phrases from Supabase:', result.error);
            // Use fallback phrases
            loadFallbackPhrases();
            return false;
        }
    } catch (error) {
        console.error('Error loading phrases:', error);
        // Use fallback phrases
        loadFallbackPhrases();
        return false;
    }
}

// Fallback phrases in case Supabase fails
function loadFallbackPhrases() {
    phrasesData = [
        {
            id: 1,
            euskera: "Nola duzu izena?",
            castellano: "Como te llamas?"
        },
        {
            id: 7,
            euskera: "Ez nuen ezer",
            castellano: "No tenía nada"
        },
        {
            id: 8,
            euskera: "Gaur gauza asko egin dituzu",
            euskeraAlternatives: ["Gaur gauza asko egin duzu"],
            castellano: "Hoy has hecho muchas cosas",
            note: "\"duzu\" es válido porque tenemos \"asko\" (mugagabe)"
        }
    ];
    console.log('Using fallback phrases');
}

// Function to get all phrases
function getAllPhrases() {
    return phrasesData;
}

// Function to get a random phrase
function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrasesData.length);
    return phrasesData[randomIndex];
}

// Function to get a phrase by ID
function getPhraseById(id) {
    return phrasesData.find(phrase => phrase.id === id);

}

// Function to remove accents from a string
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Function to compare answers (case insensitive, without accents, punctuation, and extra spaces)
// Supports checking against alternative translations if provided
function compareAnswers(userAnswer, correctAnswer, alternatives = []) {
    const normalize = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_\`~()¿?¡!]/g, '') // Remove punctuation
            .trim()
            .replace(/\s+/g, ' '); // Replace multiple spaces with single space
    };
    
    const normalizedUser = normalize(userAnswer);
    
    // Check main answer
    if (normalizedUser === normalize(correctAnswer)) {
        return true;
    }
    
    // Check alternative answers
    if (alternatives && alternatives.length > 0) {
        return alternatives.some(alt => normalizedUser === normalize(alt));
    }
    
    return false;
}

// Function to find differences between two strings
function findDifferences(userAnswer, correctAnswer) {
    // Normalize both answers for comparison
    const normalizeForComparison = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_\`~()¿?¡!]/g, '') // Remove punctuation
            .trim();
    };
    
    const userWords = normalizeForComparison(userAnswer).split(/\s+/);
    const correctWords = normalizeForComparison(correctAnswer).split(/\s+/);
    
    const differences = [];
    
    // Compare word by word
    const maxLength = Math.max(userWords.length, correctWords.length);
    
    for (let i = 0; i < maxLength; i++) {
        if (userWords[i] !== correctWords[i]) {
            if (i < userWords.length && i < correctWords.length) {
                differences.push(`Word ${i + 1}: you wrote "${userWords[i]}" but it should be "${correctWords[i]}"`);
            } else if (i >= userWords.length) {
                differences.push(`Missing word "${correctWords[i]}"`);
            } else {
                differences.push(`Extra word "${userWords[i]}"`);
            }
        }
    }
    
    return differences;
}
