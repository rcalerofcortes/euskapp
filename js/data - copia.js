// Database of phrases in Basque and Spanish
const phrasesData = [
    {
        id: 1,
        euskera: "Nola duzu izena?",
        castellano: "Como te llamas?"
    },
    {
        id: 2,
        euskera: "Nire izena Jon da",
        castellano: "Mi nombre es Jon"
    },
    {
        id: 3,
        euskera: "Non bizi zara?",
        castellano: "Donde vives?"
    },
    {
        id: 4,
        euskera: "Bilbon bizi naiz",
        castellano: "Vivo en Bilbao"
    },
    {
        id: 5,
        euskera: "Zer egiten duzu?",
        castellano: "Que haces?"
    },
    {
        id: 6,
        euskera: "Ez dut ezer",
        castellano: "No tengo nada"
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
    },
    {
        id: 9,
        euskera: "Atzo gauza asko egin zenituen",
        castellano: "Ayer hiciste muchas cosas"
    },
    {
        id: 10,
        euskera: "Non egon zarete gabonetan?",
        castellano: "¿Dónde habéis estado en navidades?"
    },
    {
        id: 11,
        euskera: "Gabonetan herrian egon gara",
        castellano: "En navidades hemos estado en el pueblo"
    },
    {
        id: 12,
        euskera: "Gabonetan Biarritzen egon ginen",
        castellano: "En navidades estuvimos en Biarritz"
    },
    {
        id: 13,
        euskera: "Etxeko lanak egin zenitutzen?",
        castellano: "¿Hicistéis los deberes?"
    },
    {
        id: 14,
        euskera: "Haiek lagunak dira",
        castellano: "Ellos son los amigos"
    },
    {
        id: 15,
        euskera: "Haiek lagunak ziren",
        castellano: "Ellas eran amigas"
    },
    {
        id: 16,
        euskera: "Zer duzu eskuetan?",
        castellano: "¿Qué tienes en las manos?"
    },
    {
        id: 17,
        euskera: "Zer zenuen eskuetan?",
        castellano: "¿Qué tenías en las manos?"
    },
    {
        id: 18,
        euskera: "Ezin naiz joan, berandu da",
        castellano: "No puedo ir, es tarde"
    },
    {
        id: 19,
        euskera: "Ezin dut egin",
        castellano: "No puedo hacerlo"
    },
    {
        id: 20,
        euskera: "Zergatik? Oso zaila delako?",
        castellano: "¿Por qué? ¿porque es muy difícil?"
    },
    {
        id: 21,
        euskera: "Etorri ahal zara?",
        castellano: "¿Puedes venir?"
    },
    {
        id: 22,
        euskera: "Ezin dugu ikasi liburuak ez ditugulako",
        castellano: "No podemos estudiar porque no tenemos los libros"
    },
    {
        id: 23,
        euskera: "Ezin dira angulak erosi, izugarri garestiak dira",
        castellano: "No se pueden comprar angulas, son carísimas"
    },
    {
        id: 24,
        euskera: "Zergatik ezin da etorri Maren? Gaixorik dagoelako?",
        castellano: "¿Por qué no puede venir Maren? ¿Porque está enferma?"
    },
    {
        id: 25,
        euskera: "Ez, bere herrian dagoelako",
        castellano: "No, porque está en su pueblo"
    },
    {
        id: 26,
        euskera: "Ezin duzue afaria erosi da edo zer?",
        euskeraAlternatives: [
            "Ezin duzue afaria erosi da ala?"
        ],
        castellano: "¿Vosotros no podéis comprar la cena o qué?"
    },
    {
        id: 27,
        euskera: "Ezin dugu partiduan gaudelako",
        castellano: "No podemos porque estamos en el partido"
    },
    {
        id: 28,
        euskera: "Irakurtzea gustatzen zaizu?",
        euskeraAlternatives: [
            "gustatzen zaizu irakurtzea?"
        ],
        castellano: "¿Te gusta leer?"
    },
    {
        id: 29,
        euskera: "Idaztea gustatzen zait",
        castellano: "Me gusta escribir"
    },
    {
        id: 30,
        euskera: "Emaidazu zure ipurdi polita",
        castellano: "Dame tu culo bonito"
    },
    {
        id: 31,
        euskera: "Jesukristoren eguna izan dut",
        castellano: "He tenido un día de la ostia"
    },
    {
        id: 32,
        euskera: "Irakurtzeko denbora behar duzu",
        euskeraAlternatives: [
            "Denbora behar duzu irakurtzeko"
        ],
        castellano: "Para leer necesitas tiempo"
    },
    {
        id: 33,
        euskera: "Kirola egiteko denbora behar da",
        castellano: "Para hacer deporte se necesita tiempo"
    },
    {
        id: 34,
        euskera: "Mendira joatea gustatzen zaigu",
        castellano: "Nos gusta ir al monte"
    },
    {
        id: 35,
        euskera: "Mikel laguntza eskatzeko etorri zait",
        euskeraAlternatives: [
            "Mikel etorri naiz laguntza eskatzeko"
        ],
        castellano: "Me ha venido Mikel para pedir ayuda"
    },
    {
        id: 36,
        euskera: "Etxeko lanak egiten argiago geratu zait",
        castellano: "Haciendo los deberes me ha quedado más claro"
    },
    {
        id: 37,
        euskera: "Zer gertatzen da?",
        castellano: "¿Qué pasa?"
    },
    {
        id: 38,
        euskera: "Zer gertatu da?",
        euskeraAlternatives: [
            "Zer pasatu da?"
        ],
        castellano: "¿Qué ha pasado?"
    },
    {
        id: 39,
        euskera: "Zer gertatuko da?",
        euskeraAlternatives: [
            "Zer pasatuko da?"
        ],
        castellano: "¿Qué pasará?"
    },
    {
        id: 40,
        euskera: "Entzuten ari naiz, entzutea gustatzen zait",
        euskeraAlternatives: [
            "Entzuten ari nago, entzutea gustatzen zait"
        ],
        castellano: "Estoy escuchando, me gusta escuchar"
    },
    {
        id: 41,
        euskera: "Astelehenetan eta asteazkenetan euskaltegira joaten naiz",
        castellano: "Los lunes y los miércoles voy al euskaltegi"
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
    },
    {
        id: 1006,
        euskera: "bihar ikusiko dugu",
        castellano: "mañana lo veremos",
        custom: true,
        createdAt: "2026-04-11T12:37:38.861Z",
        castellanoAlternatives: [
            "ya veremos mañana",
            "ya veremos"
        ]
    }
];

// Function to get all phrases
function getAllPhrases() {
    // All phrases are now in phrasesData, no need to add custom ones
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
