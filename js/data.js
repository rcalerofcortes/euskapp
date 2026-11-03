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

// Vocabulary (individual words), loaded from Supabase on app init
let vocabularyData = [];

// Load vocabulary from Supabase
async function loadVocabularyFromSupabase() {
    try {
        if (typeof SupabaseVocabulary === 'undefined') {
            console.error('SupabaseVocabulary not available');
            vocabularyData = [];
            return false;
        }

        const result = await SupabaseVocabulary.getAllVocabulary();

        if (result.success && result.data) {
            vocabularyData = result.data.map(word => ({
                id: word.id,
                euskera: word.euskera,
                castellano: word.castellano,
                euskeraAlternatives: word.euskera_alternatives,
                castellanoAlternatives: word.castellano_alternatives,
                example: word.example,
                note: word.note
            }));

            console.log(`✅ Loaded ${vocabularyData.length} vocabulary words from Supabase`);
            return true;
        }

        console.error('Failed to load vocabulary from Supabase:', result.error);
        vocabularyData = [];
        return false;
    } catch (error) {
        console.error('Error loading vocabulary:', error);
        vocabularyData = [];
        return false;
    }
}

// Function to get all vocabulary words
function getAllVocabulary() {
    return vocabularyData;
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
