// Database of phrases in Basque and Spanish
const phrasesData = [
    {
        id: 1,
        euskera: "Kaixo, zer moduz?",
        castellano: "Hola, que tal?"
    },
    {
        id: 2,
        euskera: "Oso ondo, eskerrik asko",
        castellano: "Muy bien, muchas gracias"
    },
    {
        id: 3,
        euskera: "Nola duzu izena?",
        castellano: "Como te llamas?"
    },
    {
        id: 4,
        euskera: "Nire izena Jon da",
        castellano: "Mi nombre es Jon"
    },
    {
        id: 5,
        euskera: "Non bizi zara?",
        castellano: "Donde vives?"
    },
    {
        id: 6,
        euskera: "Bilbon bizi naiz",
        castellano: "Vivo en Bilbao"
    },
    {
        id: 7,
        euskera: "Zer egiten duzu?",
        castellano: "Que haces?"
    },
    {
        id: 8,
        euskera: "Ikaslea naiz",
        castellano: "Soy estudiante"
    },
    {
        id: 9,
        euskera: "Agur, gero arte",
        castellano: "Adios, hasta luego"
    },
    {
        id: 10,
        euskera: "Bihar arte",
        castellano: "Hasta manana"
    }
];

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
function compareAnswers(userAnswer, correctAnswer) {
    const normalize = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, '') // Remove punctuation
            .trim()
            .replace(/\s+/g, ' '); // Replace multiple spaces with single space
    };
    return normalize(userAnswer) === normalize(correctAnswer);
}

// Function to find differences between two strings
function findDifferences(userAnswer, correctAnswer) {
    // Normalize both answers for comparison
    const normalizeForComparison = (str) => {
        return removeAccents(str)
            .toLowerCase()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¿?¡!]/g, '') // Remove punctuation
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
