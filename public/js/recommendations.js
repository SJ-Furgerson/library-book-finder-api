// Book recommendation engine - Netlify Compatible Version
class RecommendationEngine {
    constructor() {
        // Initialize with empty state
        this.answers = [];
        this.userLocation = '';
    }

    // Set user answers
    setAnswers(answers) {
        this.answers = answers;
    }

    // Set user location
    setLocation(location) {
        this.userLocation = location;
    }

    // Generate personalized recommendations based on user answers
    generateRecommendations() {
        let selectedBooks = [...books];
        console.log(`Starting with ${selectedBooks.length} books`);
        
        // Filter based on reading vibe (first question)
        if (this.answers[0] && this.answers[0].answer !== undefined) {
            const vibe = this.answers[0].answer;
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
        if (this.answers[1] && this.answers[1].answer !== undefined) {
            const timePreference = this.answers[1].answer;
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
        if (this.answers[2] && this.answers[2].answer !== undefined) {
            const genreFamily = this.answers[2].answer;
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

        // Filter by age group (fourth question)
        if (this.answers[3] && this.answers[3].answer !== undefined) {
            const agePreference = this.answers[3].answer;
            if (agePreference === 0) { // Adult content welcome
                selectedBooks = selectedBooks.filter(book => book.ageGroup === 'Adult');
            } else if (agePreference === 1) { // Young adult vibe
                selectedBooks = selectedBooks.filter(book => 
                    book.ageGroup === 'Young Adult' || book.ageGroup === 'Adult'
                );
            } else if (agePreference === 2) { // Younger reader
                selectedBooks = selectedBooks.filter(book => 
                    book.ageGroup === 'Young Adult' || book.ageGroup === 'Family'
                );
            } else if (agePreference === 3) { // Family-friendly
                selectedBooks = selectedBooks.filter(book => 
                    book.ageGroup === 'Family' || book.ageGroup === 'Young Adult'
                );
            }
            console.log(`After age filter: ${selectedBooks.length} books`);
        }

        // Filter by discovery style (fifth question)
        if (this.answers[4] && this.answers[4].answer !== undefined) {
            const discoveryStyle = this.answers[4].answer;
            if (discoveryStyle === 0) { // Crowd favorites
                selectedBooks = selectedBooks.filter(book => book.rating >= 4.2);
            } else if (discoveryStyle === 1) { // Hidden gems
                selectedBooks = selectedBooks.filter(book => book.rating >= 4.0 && book.rating < 4.2);
            }
            // Other options don't filter
            console.log(`After discovery filter: ${selectedBooks.length} books`);
        }

        // Filter by publication date (sixth question)
        if (this.answers[5] && this.answers[5].answer !== undefined) {
            const datePreference = this.answers[5].answer;
            const currentYear = new Date().getFullYear();
            
            if (datePreference === 0) { // Fresh off the press (2020+)
                selectedBooks = selectedBooks.filter(book => parseInt(book.published) >= 2020);
            } else if (datePreference === 1) { // Modern classics (2000-2020)
                selectedBooks = selectedBooks.filter(book => {
                    const year = parseInt(book.published);
                    return year >= 2000 && year < 2020;
                });
            } else if (datePreference === 2) { // Timeless favorites (1990s-2000s)
                selectedBooks = selectedBooks.filter(book => {
                    const year = parseInt(book.published);
                    return year >= 1990 && year < 2000;
                });
            }
            // "Age doesn't matter" doesn't filter
            console.log(`After date filter: ${selectedBooks.length} books`);
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

    // Get library links for a book
    getLibraryLinks(book) {
        const cleanTitle = encodeURIComponent(book.title.replace(/[^\w\s]/g, ''));
        const cleanAuthor = encodeURIComponent(book.author.replace(/[^\w\s]/g, ''));
        
        return {
            googleBooks: `https://books.google.com/books?q=${cleanTitle}+${cleanAuthor}`,
            openLibrary: book.isbn ? 
                `https://openlibrary.org/isbn/${book.isbn}` :
                `https://openlibrary.org/search?q=${cleanTitle}+${cleanAuthor}`,
            worldcat: `https://www.worldcat.org/search?q=${cleanTitle}+${cleanAuthor}`,
            goodreads: `https://www.goodreads.com/search?q=${cleanTitle}+${cleanAuthor}`,
            // Add local library search patterns
            librarySearch: this.generateLibrarySearchUrl(book, this.userLocation)
        };
    }

    // Generate library search URL based on common patterns
    generateLibrarySearchUrl(book, location) {
        const cleanLocation = location.toLowerCase().replace(/[^a-z0-9]/g, '');
        const searchQuery = encodeURIComponent(`${book.title} ${book.author}`);
        
        // Try common library catalog patterns
        const patterns = [
            `https://${cleanLocation}.bibliocommons.com/search?q=${searchQuery}`,
            `https://catalog.${cleanLocation}library.org/search?q=${searchQuery}`,
            `https://${cleanLocation}library.org/search?q=${searchQuery}`,
            `https://www.${cleanLocation}library.org/search?q=${searchQuery}`
        ];
        
        // Return the most likely pattern
        return patterns[0];
    }

    // Since we can't use a backend API on Netlify, we'll simulate library availability
    // This is a placeholder - in a real app you'd need a separate API service
    async searchLibraryAPI(recommendations) {
        console.log('🏛️ Simulating library search (no backend API available on Netlify)');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Add mock availability data to some books
        return recommendations.map(book => {
            // Randomly assign availability to make it realistic
            const hasAvailability = Math.random() > 0.4; // 60% chance of being available
            
            if (hasAvailability) {
                const mockAvailability = this.generateMockAvailability(book);
                return {
                    ...book,
                    availability: mockAvailability
                };
            }
            
            return {
                ...book,
                availability: []
            };
        });
    }

    // Generate mock library availability for demo purposes
    generateMockAvailability(book) {
        const mockLibraries = [
            { name: `${this.userLocation} Public Library`, system: 'bibliocommons' },
            { name: `${this.userLocation} Central Library`, system: 'koha' },
            { name: `County Library System`, system: 'evergreen' }
        ];
        
        const availability = [];
        const numAvailable = Math.floor(Math.random() * 3) + 1; // 1-3 libraries
        
        for (let i = 0; i < numAvailable; i++) {
            const library = mockLibraries[i];
            const status = Math.random() > 0.3 ? 'Available' : 'Checked Out';
            const links = this.getLibraryLinks(book);
            
            availability.push({
                library: library.name,
                system: library.system,
                available: status === 'Available',
                status: status,
                url: links.librarySearch,
                callNumber: `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 99)} ${book.author.charAt(0).toUpperCase()}`
            });
        }
        
        return availability;
    }
}

// Create a global instance
const recommendationEngine = new RecommendationEngine();