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