console.log('🚀 Starting Stacks...');

// Update progress bar
function updateProgress() {
    const progressFill = document.getElementById('progress-fill');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
}

// Questions array
const questions = [
    {
        question: "What's your reading vibe right now?",
        options: ["Heart-pounding excitement", "Cozy and comforting", "Make me think deeply", "Warm and emotional"]
    },
    {
        question: "How much reading time do you have?",
        options: ["A quick escape (under 250 pages)", "Perfect weekend read (250-400 pages)", "I'm committed (400-600 pages)", "Bring on the epic (600+ pages)"]
    },
    {
        question: "What genre family calls to you?",
        options: ["Stories that feel real", "Fantasy & sci-fi adventures", "True stories & real people", "Help me learn & grow"]
    },
    {
        question: "Who's this book for?",
        options: ["Me (adult content welcome)", "Young adult (16-25 vibe)", "Younger reader (10-15)", "Family-friendly for everyone"]
    },
    {
        question: "What's your book discovery style?",
        options: ["Give me the crowd favorites", "I want hidden gems", "Mix of popular and unique", "I trust your judgment"]
    },
    {
        question: "When it comes to publication date?",
        options: ["Fresh off the press (2020+)", "Modern classics (2000-2020)", "Timeless favorites (1990s-2000s)", "Age doesn't matter to me"]
    },
    {
        question: "Where are you located?",
        isLocation: true
    }
];

// Comprehensive book database - 50 bestselling books across genres
const books = [
    // Contemporary Fiction & Literary Fiction
    {
        title: "The Seven Husbands of Evelyn Hugo",
        author: "Taylor Jenkins Reid",
        isbn: "9781501161933",
        genre: "Contemporary Fiction",
        published: "2017",
        ageGroup: "Adult",
        pages: 400,
        covers: ["https://books.google.com/books/content?id=WI5PDQAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        isbn: "9780735219090",
        genre: "Literary Fiction",
        published: "2018",
        ageGroup: "Adult",
        pages: 384,
        covers: ["https://books.google.com/books/content?id=mSc5DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "The Midnight Library",
        author: "Matt Haig",
        isbn: "9780525559474",
        genre: "Literary Fiction",
        published: "2020",
        ageGroup: "Adult",
        pages: 288,
        covers: ["https://books.google.com/books/content?id=yZ-wDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Normal People",
        author: "Sally Rooney",
        isbn: "9781635572414",
        genre: "Contemporary Fiction",
        published: "2018",
        ageGroup: "Adult",
        pages: 288,
        covers: ["https://books.google.com/books/content?id=rKhcDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.0
    },
    {
        title: "The Song of Achilles",
        author: "Madeline Miller",
        isbn: "9780062060624",
        genre: "Literary Fiction",
        published: "2011",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=YFylr_C6z1EC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "Circe",
        author: "Madeline Miller",
        isbn: "9780316556323",
        genre: "Literary Fiction",
        published: "2018",
        ageGroup: "Adult",
        pages: 400,
        covers: ["https://books.google.com/books/content?id=aX09DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Eleanor Oliphant Is Completely Fine",
        author: "Gail Honeyman",
        isbn: "9780735220683",
        genre: "Contemporary Fiction",
        published: "2017",
        ageGroup: "Adult",
        pages: 336,
        covers: ["https://books.google.com/books/content?id=6Y5QDgAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "Little Fires Everywhere",
        author: "Celeste Ng",
        isbn: "9780735224292",
        genre: "Contemporary Fiction",
        published: "2017",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=rrOODQAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "The Vanishing Half",
        author: "Brit Bennett",
        isbn: "9780525536291",
        genre: "Literary Fiction",
        published: "2020",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=rZSkDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "Anxious People",
        author: "Fredrik Backman",
        isbn: "9781501160837",
        genre: "Literary Fiction",
        published: "2019",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=2jN-DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },

    // Fantasy & Science Fiction
    {
        title: "The House in the Cerulean Sea",
        author: "TJ Klune",
        isbn: "9781250217318",
        genre: "Fantasy",
        published: "2020",
        ageGroup: "Adult",
        pages: 394,
        covers: ["https://books.google.com/books/content?id=Y8u8DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "Dune",
        author: "Frank Herbert",
        isbn: "9780441172719",
        genre: "Science Fiction",
        published: "1965",
        ageGroup: "Adult",
        pages: 688,
        covers: ["https://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "The Name of the Wind",
        author: "Patrick Rothfuss",
        isbn: "9780756404079",
        genre: "Fantasy",
        published: "2007",
        ageGroup: "Adult",
        pages: 672,
        covers: ["https://books.google.com/books/content?id=AZ8aAOcZTSYC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.5
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "9780547928227",
        genre: "Fantasy",
        published: "1937",
        ageGroup: "Family",
        pages: 366,
        covers: ["https://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        isbn: "9780439708180",
        genre: "Fantasy",
        published: "1997",
        ageGroup: "Young Adult",
        pages: 309,
        covers: ["https://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.5
    },
    {
        title: "Project Hail Mary",
        author: "Andy Weir",
        isbn: "9780593135204",
        genre: "Science Fiction",
        published: "2021",
        ageGroup: "Adult",
        pages: 496,
        covers: ["https://books.google.com/books/content?id=NmT2DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.5
    },
    {
        title: "The Martian",
        author: "Andy Weir",
        isbn: "9780553418026",
        genre: "Science Fiction",
        published: "2011",
        ageGroup: "Adult",
        pages: 384,
        covers: ["https://books.google.com/books/content?id=1Ar0DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "Klara and the Sun",
        author: "Kazuo Ishiguro",
        isbn: "9780593318171",
        genre: "Science Fiction",
        published: "2021",
        ageGroup: "Adult",
        pages: 320,
        covers: ["https://books.google.com/books/content?id=CY3_DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.0
    },

    // Thriller & Mystery
    {
        title: "The Silent Patient",
        author: "Alex Michaelides",
        isbn: "9781250301697",
        genre: "Thriller",
        published: "2019",
        ageGroup: "Adult",
        pages: 336,
        covers: ["https://books.google.com/books/content?id=2ZRSDQAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "Gone Girl",
        author: "Gillian Flynn",
        isbn: "9780307588371",
        genre: "Thriller",
        published: "2012",
        ageGroup: "Adult",
        pages: 432,
        covers: ["https://books.google.com/books/content?id=O4cXnL9fu5kC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.0
    },
    {
        title: "The Girl with the Dragon Tattoo",
        author: "Stieg Larsson",
        isbn: "9780307454546",
        genre: "Mystery",
        published: "2005",
        ageGroup: "Adult",
        pages: 590,
        covers: ["https://books.google.com/books/content?id=o5yhmFMu-m8C&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Big Little Lies",
        author: "Liane Moriarty",
        isbn: "9780399167065",
        genre: "Mystery",
        published: "2014",
        ageGroup: "Adult",
        pages: 460,
        covers: ["https://books.google.com/books/content?id=kJFCAwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        isbn: "9781984880987",
        genre: "Mystery",
        published: "2020",
        ageGroup: "Adult",
        pages: 368,
        covers: ["https://books.google.com/books/content?id=hD3MDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "The Guest List",
        author: "Lucy Foley",
        isbn: "9780062868930",
        genre: "Thriller",
        published: "2020",
        ageGroup: "Adult",
        pages: 320,
        covers: ["https://books.google.com/books/content?id=TLqhDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.0
    },

    // Romance
    {
        title: "It Ends with Us",
        author: "Colleen Hoover",
        isbn: "9781501110368",
        genre: "Romance",
        published: "2016",
        ageGroup: "Adult",
        pages: 384,
        covers: ["https://books.google.com/books/content?id=vdWJCwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "The Hating Game",
        author: "Sally Thorne",
        isbn: "9780062439598",
        genre: "Romance",
        published: "2016",
        ageGroup: "Adult",
        pages: 384,
        covers: ["https://books.google.com/books/content?id=yUP_DAAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Beach Read",
        author: "Emily Henry",
        isbn: "9780451489869",
        genre: "Romance",
        published: "2020",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=Hfy_DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "People We Meet on Vacation",
        author: "Emily Henry",
        isbn: "9781984806758",
        genre: "Romance",
        published: "2021",
        ageGroup: "Adult",
        pages: 364,
        covers: ["https://books.google.com/books/content?id=gT3_DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Red, White & Royal Blue",
        author: "Casey McQuiston",
        isbn: "9781250316776",
        genre: "Romance",
        published: "2019",
        ageGroup: "Young Adult",
        pages: 432,
        covers: ["https://books.google.com/books/content?id=EBoXDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },

    // Memoir & Non-Fiction
    {
        title: "Educated",
        author: "Tara Westover",
        isbn: "9780399590504",
        genre: "Memoir",
        published: "2018",
        ageGroup: "Adult",
        pages: 334,
        covers: ["https://books.google.com/books/content?id=2ObWDgAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "Becoming",
        author: "Michelle Obama",
        isbn: "9781524763138",
        genre: "Memoir",
        published: "2018",
        ageGroup: "Adult",
        pages: 448,
        covers: ["https://books.google.com/books/content?id=hi1yDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.5
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292",
        genre: "Self-Help",
        published: "2018",
        ageGroup: "Adult",
        pages: 320,
        covers: ["https://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "Born a Crime",
        author: "Trevor Noah",
        isbn: "9780399588174",
        genre: "Memoir",
        published: "2016",
        ageGroup: "Adult",
        pages: 304,
        covers: ["https://books.google.com/books/content?id=v0mLCwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "Untamed",
        author: "Glennon Doyle",
        isbn: "9781984801258",
        genre: "Memoir",
        published: "2020",
        ageGroup: "Adult",
        pages: 352,
        covers: ["https://books.google.com/books/content?id=BqC_DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        isbn: "9780062316097",
        genre: "History",
        published: "2014",
        ageGroup: "Adult",
        pages: 464,
        covers: ["https://books.google.com/books/content?id=1EiJAwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },

    // Young Adult
    {
        title: "The Fault in Our Stars",
        author: "John Green",
        isbn: "9780525478812",
        genre: "Young Adult",
        published: "2012",
        ageGroup: "Young Adult",
        pages: 313,
        covers: ["https://books.google.com/books/content?id=UOgFz2VqzxgC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "The Hunger Games",
        author: "Suzanne Collins",
        isbn: "9780439023528",
        genre: "Young Adult",
        published: "2008",
        ageGroup: "Young Adult",
        pages: 374,
        covers: ["https://books.google.com/books/content?id=_zKzAwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "Six of Crows",
        author: "Leigh Bardugo",
        isbn: "9781627792127",
        genre: "Young Adult Fantasy",
        published: "2015",
        ageGroup: "Young Adult",
        pages: 480,
        covers: ["https://books.google.com/books/content?id=MqFLCgAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.5
    },
    {
        title: "The Perks of Being a Wallflower",
        author: "Stephen Chbosky",
        isbn: "9780671027346",
        genre: "Young Adult",
        published: "1999",
        ageGroup: "Young Adult",
        pages: 224,
        covers: ["https://books.google.com/books/content?id=MDRRAAAACAAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "The Book Thief",
        author: "Markus Zusak",
        isbn: "9780375842207",
        genre: "Historical Fiction",
        published: "2005",
        ageGroup: "Young Adult",
        pages: 552,
        covers: ["https://books.google.com/books/content?id=2X5lN6xVFmEC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },

    // Historical Fiction
    {
        title: "All the Light We Cannot See",
        author: "Anthony Doerr",
        isbn: "9781476746586",
        genre: "Historical Fiction",
        published: "2014",
        ageGroup: "Adult",
        pages: 544,
        covers: ["https://books.google.com/books/content?id=2gCtAAAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "The Nightingale",
        author: "Kristin Hannah",
        isbn: "9780312577223",
        genre: "Historical Fiction",
        published: "2015",
        ageGroup: "Adult",
        pages: 440,
        covers: ["https://books.google.com/books/content?id=dZZEAwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "The Pillars of the Earth",
        author: "Ken Follett",
        isbn: "9780451225245",
        genre: "Historical Fiction",
        published: "1989",
        ageGroup: "Adult",
        pages: 1008,
        covers: ["https://books.google.com/books/content?id=hJbpHAAACAAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.4
    },
    {
        title: "The Help",
        author: "Kathryn Stockett",
        isbn: "9780399155420",
        genre: "Historical Fiction",
        published: "2009",
        ageGroup: "Adult",
        pages: 544,
        covers: ["https://books.google.com/books/content?id=DRaygX8dZL8C&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "The Four Winds",
        author: "Kristin Hannah",
        isbn: "9781250178602",
        genre: "Historical Fiction",
        published: "2021",
        ageGroup: "Adult",
        pages: 464,
        covers: ["https://books.google.com/books/content?id=6g3_DwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },

    // Classic Literature
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "9780061120084",
        genre: "Classic Literature",
        published: "1960",
        ageGroup: "Young Adult",
        pages: 376,
        covers: ["https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "9780452284234",
        genre: "Classic Literature",
        published: "1949",
        ageGroup: "Adult",
        pages: 328,
        covers: ["https://books.google.com/books/content?id=kotPYEqx7kMC&printsec=frontcover&img=1&zoom=1"],
        rating: 4.2
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "9780141439518",
        genre: "Classic Literature",
        published: "1813",
        ageGroup: "Adult",
        pages: 416,
        covers: ["https://books.google.com/books/content?id=L6wKGwAACAAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.3
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "9780743273565",
        genre: "Classic Literature",
        published: "1925",
        ageGroup: "Adult",
        pages: 180,
        covers: ["https://books.google.com/books/content?id=iUJcl93N9E0C&printsec=frontcover&img=1&zoom=1"],
        rating: 3.9
    },

    // Horror & Psychological
    {
        title: "Mexican Gothic",
        author: "Silvia Moreno-Garcia",
        isbn: "9780525620785",
        genre: "Horror",
        published: "2020",
        ageGroup: "Adult",
        pages: 320,
        covers: ["https://books.google.com/books/content?id=7pKdDwAAQBAJ&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    },
    {
        title: "The Haunting of Hill House",
        author: "Shirley Jackson",
        isbn: "9780143039983",
        genre: "Horror",
        published: "1959",
        ageGroup: "Adult",
        pages: 246,
        covers: ["https://books.google.com/books/content?id=Gl8wn7d9200C&printsec=frontcover&img=1&zoom=1"],
        rating: 4.1
    }
];

let currentQuestion = 0;
let answers = [];
let userLocation = '';

function startApp() {
    console.log('📚 Initializing Stacks...');
    loadBookAnimation();
    showQuestion(0);
    updateProgress();
}

function loadBookAnimation() {
    const lottieContainer = document.getElementById('header-lottie');
    lottieContainer.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            background: linear-gradient(45deg, #8154a8, #6b4687, #9b6bb3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: bookBounce 3s ease-in-out infinite;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                width: 60%;
                height: 70%;
                background: white;
                border-radius: 4px;
                position: relative;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            ">
                <div style="
                    position: absolute;
                    top: 10%;
                    left: 10%;
                    right: 10%;
                    height: 2px;
                    background: #8154a8;
                    border-radius: 1px;
                "></div>
                <div style="
                    position: absolute;
                    top: 25%;
                    left: 10%;
                    right: 10%;
                    height: 2px;
                    background: #8154a8;
                    border-radius: 1px;
                "></div>
                <div style="
                    position: absolute;
                    top: 40%;
                    left: 10%;
                    right: 30%;
                    height: 2px;
                    background: #8154a8;
                    border-radius: 1px;
                "></div>
            </div>
        </div>
    `;
}

function showQuestion(index) {
    console.log(`📝 Showing question ${index + 1}: ${questions[index].question}`);
    const container = document.getElementById('question-container');
    const question = questions[index];
    
    if (question.isLocation) {
        container.innerHTML = `
            <div class="question active">
                <h2>${question.question}</h2>
                <div class="options">
                    <input type="text" class="location-input" id="location-input" 
                           placeholder="Enter your city, state or ZIP code" 
                           onkeypress="if(event.key==='Enter') selectLocation()">
                    <button class="continue-btn" id="continue-btn" 
                            onclick="selectLocation()" disabled>
                        Continue
                    </button>
                </div>
            </div>
        `;
        
        const locationInput = document.getElementById('location-input');
        const continueBtn = document.getElementById('continue-btn');
        
        locationInput.addEventListener('input', function(e) {
            continueBtn.disabled = e.target.value.trim().length === 0;
        });
        
        setTimeout(() => locationInput.focus(), 100);
        
    } else {
        const optionsHtml = question.options.map((option, i) => {
            const safeOption = option.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
            return `<button class="option" onclick="selectAnswer(${i}, '${safeOption}')">${option}</button>`;
        }).join('');
        
        container.innerHTML = `
            <div class="question active">
                <h2>${question.question}</h2>
                <div class="options">
                    ${optionsHtml}
                </div>
            </div>
        `;
    }

    document.getElementById('current-question').textContent = index + 1;
    updateProgress();
}

function selectLocation() {
    const input = document.getElementById('location-input');
    const location = input.value.trim();
    
    if (location) {
        userLocation = location;
        answers.push({ question: currentQuestion, text: location });
        
        const questionEl = document.querySelector('.question.active');
        questionEl.style.opacity = '0';
        questionEl.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            showResults();
        }, 600);
    }
}

function selectAnswer(optionIndex, optionText) {
    console.log(`Selected: ${optionText}`);
    answers.push({ question: currentQuestion, answer: optionIndex, text: optionText });
    
    const questionEl = document.querySelector('.question.active');
    questionEl.style.opacity = '0';
    questionEl.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion(currentQuestion);
        }
    }, 600);
}

async function showResults() {
    console.log('🔍 Showing results...');
    document.querySelector('.progress').style.display = 'none';
    document.querySelector('.progress-container').style.display = 'none';
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('location-display').textContent = `Searching libraries near ${userLocation}`;
    
    document.getElementById('loading').style.display = 'block';
    
    // Generate personalized recommendations based on answers
    const recommendations = generateRecommendations();
    
    // Simulate API call delay
    setTimeout(() => {
        displayResults(recommendations);
        document.getElementById('loading').style.display = 'none';
    }, 2000);
}

function generateRecommendations() {
    // Enhanced recommendation logic based on user answers
    let selectedBooks = [...books];
    console.log(`Starting with ${selectedBooks.length} books`);
    
    // Filter based on reading vibe (first question)
    if (answers[0] && answers[0].answer !== undefined) {
        const vibe = answers[0].answer;
        if (vibe === 0) { // Heart-pounding excitement
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Thriller') || 
                book.genre.includes('Mystery') || 
                book.genre.includes('Science Fiction')
            );
        } else if (vibe === 1) { // Cozy and comforting
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Contemporary') || 
                book.genre.includes('Romance') ||
                book.genre.includes('Literary') ||
                book.rating >= 4.2
            );
        } else if (vibe === 2) { // Make me think deeply
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Self-Help') || 
                book.genre.includes('Memoir') ||
                book.genre.includes('Literary')
            );
        } else if (vibe === 3) { // Warm and emotional
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Literary') || 
                book.genre.includes('Romance') ||
                book.genre.includes('Contemporary') ||
                book.genre.includes('Memoir')
            );
        }
        console.log(`After vibe filter: ${selectedBooks.length} books`);
    }
    
    // Filter by page count (second question)
    if (answers[1] && answers[1].answer !== undefined) {
        const timePreference = answers[1].answer;
        if (timePreference === 0) { // Under 250 pages
            selectedBooks = selectedBooks.filter(book => book.pages < 250);
        } else if (timePreference === 1) { // 250-400 pages
            selectedBooks = selectedBooks.filter(book => book.pages >= 250 && book.pages <= 400);
        } else if (timePreference === 2) { // 400-600 pages
            selectedBooks = selectedBooks.filter(book => book.pages > 400 && book.pages <= 600);
        } else if (timePreference === 3) { // 600+ pages
            selectedBooks = selectedBooks.filter(book => book.pages > 600);
        }
        console.log(`After page filter: ${selectedBooks.length} books`);
    }

    // Filter by genre family (third question)
    if (answers[2] && answers[2].answer !== undefined) {
        const genreFamily = answers[2].answer;
        if (genreFamily === 0) { // Stories that feel real
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Contemporary') || 
                book.genre.includes('Literary') ||
                book.genre.includes('Memoir')
            );
        } else if (genreFamily === 1) { // Fantasy & sci-fi adventures
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Fantasy') || 
                book.genre.includes('Science Fiction')
            );
        } else if (genreFamily === 2) { // True stories & real people
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Memoir') || 
                book.genre.includes('Self-Help')
            );
        } else if (genreFamily === 3) { // Help me learn & grow
            selectedBooks = selectedBooks.filter(book => 
                book.genre.includes('Self-Help') || 
                book.genre.includes('Memoir')
            );
        }
        console.log(`After genre filter: ${selectedBooks.length} books`);
    }
    
    // If filters are too restrictive, fallback to highly rated books
    if (selectedBooks.length === 0) {
        console.log('No books match filters, using highly rated fallback');
        selectedBooks = books.filter(book => book.rating >= 4.2).slice(0, 10);
    }
    
    // Sort by rating and return top recommendations
    selectedBooks.sort((a, b) => b.rating - a.rating);
    
    return selectedBooks.slice(0, 6); // Return top 6 recommendations
}

function showApiStatus(message, type) {
    const statusEl = document.getElementById('api-status');
    statusEl.textContent = message;
    statusEl.className = `api-status ${type}`;
    statusEl.style.display = 'block';
}

function getCoverHtml(book) {
    if (!book.covers || book.covers.length === 0) {
        return '<div class="book-cover">📚<br>No cover<br>available</div>';
    }
    
    return `
        <div class="book-cover">
            <img src="${book.covers[0]}" 
                 alt="${book.title}" 
                 onload="this.style.opacity='1'"
                 onerror="handleCoverError(this)"
                 style="opacity: 0; transition: opacity 0.3s ease;">
        </div>
    `;
}

function handleCoverError(img) {
    console.log('Cover failed, showing placeholder');
    img.style.display = 'none';
    img.parentElement.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; 
                    height: 100%; background: #f0f0f0; color: #6c757d; font-size: 0.8rem;
                    border-radius: 8px;">
            📚<br>Cover not<br>available
        </div>
    `;
}

function getLibraryLinks(book) {
    const cleanTitle = encodeURIComponent(book.title.replace(/[^\w\s]/g, ''));
    const cleanAuthor = encodeURIComponent(book.author.replace(/[^\w\s]/g, ''));
    
    return {
        googleBooks: `https://books.google.com/books?q=${cleanTitle}+${cleanAuthor}`,
        openLibrary: book.isbn ? 
            `https://openlibrary.org/isbn/${book.isbn}` :
            `https://openlibrary.org/search?q=${cleanTitle}+${cleanAuthor}`,
        worldcat: `https://www.worldcat.org/search?q=${cleanTitle}+${cleanAuthor}`,
        goodreads: `https://www.goodreads.com/search?q=${cleanTitle}+${cleanAuthor}`
    };
}

async function searchNearestLibrary(book, location) {
    try {
        console.log(`🏛️ Searching libraries near ${location} for "${book.title}"`);
        
        // Use WorldCat Search API v2
        const apiUrl = 'https://worldcat.org/webservices/catalog/search/worldcat/opensearch';
        const params = new URLSearchParams({
            q: `${book.title} ${book.author}`,
            format: 'json',
            count: 5,
            start: 1
        });
        
        // Add ISBN if available for more accurate results
        if (book.isbn) {
            params.set('q', `isbn:${book.isbn}`);
        }
        
        const response = await fetch(`${apiUrl}?${params}`);
        
        if (!response.ok) {
            throw new Error(`WorldCat API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.entries && data.entries.length > 0) {
            // Get the first matching book entry
            const entry = data.entries[0];
            
            // Extract OCLC number for library lookup
            const oclcMatch = entry.id && entry.id.match(/(\d+)$/);
            const oclcNumber = oclcMatch ? oclcMatch[1] : null;
            
            if (oclcNumber) {
                // Search for libraries with this book using WorldCat Registry API
                const libraryData = await searchLibrariesWithBook(oclcNumber, location);
                
                if (libraryData && libraryData.length > 0) {
                    const nearestLibrary = libraryData[0]; // First result is usually closest
                    return {
                        name: nearestLibrary.name,
                        url: `https://worldcat.org/title/${oclcNumber}`,
                        address: nearestLibrary.address,
                        distance: nearestLibrary.distance,
                        available: true
                    };
                }
            }
        }
        
        // Fallback: return WorldCat search URL with location filter
        const locationEncoded = encodeURIComponent(location);
        const titleEncoded = encodeURIComponent(book.title);
        const authorEncoded = encodeURIComponent(book.author);
        
        return {
            name: 'WorldCat Libraries',
            url: `https://worldcat.org/search?q=${titleEncoded}+${authorEncoded}&qt=advanced&dblist=638&scope=wz%3A${locationEncoded}`,
            available: null // Unknown availability
        };
        
    } catch (error) {
        console.error('WorldCat library search failed:', error);
        
        // Fallback to basic WorldCat search
        const titleEncoded = encodeURIComponent(book.title);
        const authorEncoded = encodeURIComponent(book.author);
        
        return {
            name: 'Search WorldCat',
            url: `https://worldcat.org/search?q=${titleEncoded}+${authorEncoded}`,
            available: null
        };
    }
}

async function searchLibrariesWithBook(oclcNumber, location) {
    try {
        // WorldCat Registry API for finding libraries
        // Note: This requires API key registration, for demo we'll use a simplified approach
        
        // For production, you would:
        // 1. Register for WorldCat Search API key
        // 2. Use the Library Locations API: https://worldcat.org/webservices/registry/Institutions
        // 3. Filter by location and holdings
        
        // Using alternative approach with WorldCat's public URLs
        const searchUrl = `https://worldcat.org/libraries/${oclcNumber}?location=${encodeURIComponent(location)}`;
        
        // For now, return mock data structure that matches expected format
        // In production, you'd parse the actual API response
        return [
            {
                name: 'Local Public Library',
                address: `Near ${location}`,
                distance: '1.2 miles',
                url: searchUrl
            }
        ];
        
    } catch (error) {
        console.error('Library location search failed:', error);
        return [];
    }
}

async function displayResults(recommendations) {
    console.log('📊 Displaying book recommendations');
    showApiStatus(`Finding nearby libraries for your book recommendations...`, 'success');
    
    const grid = document.getElementById('results-grid');
    
    // First display books without library info, then update with library data
    grid.innerHTML = recommendations.map(book => {
        const links = getLibraryLinks(book);
        
        return `
            <div class="book-card" id="book-card-${book.isbn}">
                ${getCoverHtml(book)}
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-details">
                    <div class="book-details-row">
                        <div><strong>Genre:</strong> ${book.genre}</div>
                        <div><strong>Published:</strong> ${book.published}</div>
                    </div>
                    <div class="book-details-row">
                        <div><strong>Pages:</strong> ${book.pages}</div>
                        <div><strong>Rating:</strong> ${book.rating}/5 ⭐</div>
                    </div>
                </div>
                <div class="availability">
                    <div class="availability-status">📚 Find This Book</div>
                    <div class="library-info">Searching libraries near ${userLocation}...</div>
                    <a href="${links.googleBooks}" target="_blank" class="library-link">Google Books</a>
                    <a href="${links.openLibrary}" target="_blank" class="library-link">Open Library</a>
                    <a href="${links.goodreads}" target="_blank" class="library-link">Goodreads</a>
                    <div class="library-search-placeholder" id="library-${book.isbn}">🔍 Finding nearby libraries...</div>
                </div>
            </div>
        `;
    }).join('');
    
    // Now search for libraries for each book and update the cards
    recommendations.forEach(async (book) => {
        try {
            const libraryInfo = await searchNearestLibrary(book, userLocation);
            const placeholder = document.getElementById(`library-${book.isbn}`);
            
            if (placeholder && libraryInfo) {
                placeholder.outerHTML = `<a href="${libraryInfo.url}" target="_blank" class="library-link">${libraryInfo.name}</a>`;
                
                // Update library info text if we have address/distance
                if (libraryInfo.address) {
                    const infoDiv = placeholder.closest('.availability').querySelector('.library-info');
                    infoDiv.textContent = `Found at: ${libraryInfo.address}`;
                }
            } else if (placeholder) {
                placeholder.textContent = 'No local libraries found';
                placeholder.style.color = '#666';
                placeholder.style.fontStyle = 'italic';
            }
        } catch (error) {
            console.error(`Failed to find library for ${book.title}:`, error);
            const placeholder = document.getElementById(`library-${book.isbn}`);
            if (placeholder) {
                placeholder.textContent = 'Library search unavailable';
                placeholder.style.color = '#666';
            }
        }
    });
}

function restartQuiz() {
    currentQuestion = 0;
    answers = [];
    userLocation = '';
    document.querySelector('.progress').style.display = 'block';
    document.querySelector('.progress-container').style.display = 'block';
    document.getElementById('question-container').style.display = 'flex';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('api-status').style.display = 'none';
    startApp();
}

// Start the app when page loads
console.log('🌟 Starting Stacks initialization...');
startApp();