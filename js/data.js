// Database of phrases in Basque and Spanish
const phrasesData = [
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
        id: 11,
        euskera: "Ez dut ezer",
        castellano: "No tengo nada"
    },
    {
        id: 12,
        euskera: "Ez nuen ezer",
        castellano: "No tenía nada"
    },
    {
        id: 13,
        euskera: "Gaur gauza asko egin dituzu",
        castellano: "Hoy has hecho muchas cosas"
    },
    {
        id: 14,
        euskera: "Atzo gauza asko egin zenituen",
        castellano: "Ayer hiciste muchas cosas"
    },
    {
        id: 15,
        euskera: "Non egon zarete gabonetan?",
        castellano: "¿Dónde habéis estado en navidades?"
    },
    {
        id: 16,
        euskera: "Gabonetan herrian egon gara",
        castellano: "En navidades hemos estado en el pueblo"
    },
    {
        id: 17,
        euskera: "Gabonetan Biarritzen egon ginen",
        castellano: "En navidades estuvimos en Biarritz"
    },
    {
        id: 18,
        euskera: "Etxeko lanak egin zenitutzen?",
        castellano: "¿Hicistéis los deberes?"
    },
    {
        id: 19,
        euskera: "Haiek lagunak dira",
        castellano: "Ellos son los amigos"
    },
    {
        id: 20,
        euskera: "Haiek lagunak ziren",
        castellano: "Ellas eran amigas"
    },
    {
        id: 21,
        euskera: "Zer duzu eskuetan?",
        castellano: "¿Qué tienes en las manos?"
    },
    {
        id: 22,
        euskera: "Zer zenuen eskuetan?",
        castellano: "¿Qué tenías en las manos?"
    },
    {
        id: 23,
        euskera: "Ezin naiz joan, berandu da",
        castellano: "No puedo ir, es tarde"
    },
    {
        id: 24,
        euskera: "Ezin dut egin",
        castellano: "No puedo hacerlo"
    },
    {
        id: 25,
        euskera: "Zergatik? Oso zaila delako?",
        castellano: "¿Por qué? ¿porque es muy difícil?"
    },
    {
        id: 26,
        euskera: "Etorri ahal zara?",
        castellano: "¿Puedes venir?"
    },
    {
        id: 27,
        euskera: "Ezin dugu ikasi liburuak ez ditugulako",
        castellano: "No podemos estudiar porque no tenemos los libros"
    },
    {
        id: 28,
        euskera: "Ezin dira angulak erosi, izugarri garestiak dira",
        castellano: "No se pueden comprar angulas, son carísimas"
    },
    {
        id: 29,
        euskera: "Zergatik ezin da etorri Maren? Gaixorik dagoelako?",
        castellano: "¿Por qué no puede venir Maren? ¿Porque está enferma?"
    },
    {
        id: 30,
        euskera: "Ez, bere herrian dagoelako",
        castellano: "No, porque está en su pueblo"
    },
    {
        id: 31,
        euskera: "Ezin duzue afaria erosi da edo zer?",
        euskeraAlternatives: [
            "Ezin duzue afaria erosi da ala?"
        ],
        castellano: "¿Vosotros no podéis comprar la cena o qué?"
    },
    {
        id: 32,
        euskera: "Ezin dugu partiduan gaudelako",
        castellano: "No podemos porque estamos en el partido"
    },
    {
        id: 1000,
        euskera: "Ez dut ezer",
        castellano: "No tengo nada",
        custom: true,
        createdAt: "2026-03-28T16:37:43.511Z"
    },
    {
        id: 1001,
        euskera: "Ez nuen ezer",
        castellano: "No tenía nada",
        custom: true,
        createdAt: "2026-03-28T16:37:59.686Z"
    },
    {
        id: 1002,
        euskera: "Gaur gauzak asko egin dituzu",
        castellano: "Hoy has hecho muchas cosas",
        custom: true,
        createdAt: "2026-03-28T16:38:16.450Z"
    },
    {
        id: 1003,
        euskera: "Atzo gauzak asko egin zenituen",
        castellano: "Ayer hiciste muchas cosas",
        custom: true,
        createdAt: "2026-03-28T16:38:31.117Z"
    },
    {
        id: 1004,
        euskera: "Irakurtzea gustatzen zaizu?",
        castellano: "¿Te gusta leer?",
        custom: true,
        createdAt: "2026-04-02T10:33:55.930Z",
        euskeraAlternatives: [
            "gustatzen zaizu irakurtzea?"
        ]
    },
    {
        id: 1005,
        euskera: "Idaztea gustatzen zait",
        castellano: "Me gusta escribir",
        custom: true,
        createdAt: "2026-04-02T10:38:26.273Z"
    }
];

// Function to get all phrases
function getAllPhrases() {
    const customPhrases = Storage.getCustomPhrases();
    return [...phrasesData, ...customPhrases];
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
