// Library API MVP - Complete deployable service
// Run with: npm install express cors node-fetch cheerio && node server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});

app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// In-memory cache (use Redis in production)
const cache = new Map();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

class LibraryMVP {
    constructor() {
        // Known library systems and their detection patterns
        this.knownSystems = [
            {
                name: 'koha',
                patterns: ['/cgi-bin/koha/', '/koha/', 'koha'],
                apiPath: '/api/v1/public',
                searchPath: '/cgi-bin/koha/opac-search.pl'
            },
            {
                name: 'evergreen',
                patterns: ['/eg/opac/', 'evergreen', '/opac/en-US/'],
                searchPath: '/eg/opac/results'
            },
            {
                name: 'symphony',
                patterns: ['/client/en_US/', 'symphony', 'sirsi'],
                searchPath: '/client/en_US/default/search/results'
            },
            {
                name: 'polaris',
                patterns: ['polaris', '/polaris/'],
                searchPath: '/polaris/search/searchresults.aspx'
            }
        ];
    }

    // Main search function
    async searchBooks(books, location) {
        console.log(`🔍 Searching for ${books.length} books near ${location}`);
        
        try {
            // Find libraries near the location
            const libraries = await this.findLibraries(location);
            console.log(`📍 Found ${libraries.length} libraries`);
            
            // Check availability for each book
            const results = [];
            for (const book of books) {
                console.log(`📚 Checking availability for: ${book.title}`);
                const availability = await this.checkAvailability(book, libraries);
                results.push({
                    ...book,
                    availability
                });
            }
            
            return results;
            
        } catch (error) {
            console.error('Search error:', error);
            throw error;
        }
    }

    // Find libraries near a location
    async findLibraries(location) {
        const cacheKey = `libraries_${location.toLowerCase()}`;
        
        // Check cache first
        if (cache.has(cacheKey)) {
            const cached = cache.get(cacheKey);
            if (Date.now() - cached.timestamp < CACHE_TTL) {
                return cached.data;
            }
        }

        const libraries = [];
        
        try {
            // Method 1: Try common library URL patterns
            const commonLibraries = await this.tryCommonPatterns(location);
            libraries.push(...commonLibraries);
            
            // Method 2: Search Google for library websites
            const googleLibraries = await this.searchGoogleForLibraries(location);
            libraries.push(...googleLibraries);
            
        } catch (error) {
            console.error('Error finding libraries:', error);
        }

        // Add some well-known library systems for testing
        libraries.push(...this.getTestLibraries(location));

        // Remove duplicates
        const uniqueLibraries = this.removeDuplicates(libraries);
        
        // Cache the results
        cache.set(cacheKey, {
            data: uniqueLibraries,
            timestamp: Date.now()
        });

        return uniqueLibraries.slice(0, 5); // Limit to 5 libraries for MVP
    }

    // Try common library URL patterns
    async tryCommonPatterns(location) {
        const cleanLocation = location.toLowerCase()
            .replace(/\s+/g, '')
            .replace(/[^a-z0-9]/g, '');

        const patterns = [
            `https://${cleanLocation}library.org`,
            `https://${cleanLocation}publiclibrary.org`,
            `https://www.${cleanLocation}library.org`,
            `https://library.${cleanLocation}.gov`,
            `https://${cleanLocation}.bibliocommons.com`,
            `https://catalog.${cleanLocation}library.org`
        ];

        const libraries = [];
        
        for (const url of patterns) {
            try {
                console.log(`🔗 Trying: ${url}`);
                const response = await fetch(url, { 
                    method: 'HEAD',
                    timeout: 5000,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                    }
                });
                
                if (response.ok) {
                    console.log(`✅ Found library: ${url}`);
                    const system = await this.detectLibrarySystem(url);
                    libraries.push({
                        name: `${location} Public Library`,
                        url: url,
                        system: system,
                        type: 'public'
                    });
                }
            } catch (error) {
                // URL doesn't work, continue
            }
        }

        return libraries;
    }

    // Search Google for library websites (simplified)
    async searchGoogleForLibraries(location) {
        // In production, you'd use Google Custom Search API
        // For MVP, we'll use a different approach or mock data
        return [];
    }

    // Detect which library system a URL uses
    async detectLibrarySystem(url) {
        try {
            const response = await fetch(url, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                }
            });
            
            const html = await response.text();
            const lowerHtml = html.toLowerCase();
            
            // Check for system indicators in HTML
            for (const system of this.knownSystems) {
                for (const pattern of system.patterns) {
                    if (lowerHtml.includes(pattern.toLowerCase())) {
                        console.log(`🎯 Detected ${system.name} at ${url}`);
                        return system.name;
                    }
                }
            }
            
            // Check for common indicators
            if (lowerHtml.includes('bibliocommons')) return 'bibliocommons';
            if (lowerHtml.includes('worldcat')) return 'worldcat';
            
            return 'unknown';
            
        } catch (error) {
            console.error(`Error detecting system for ${url}:`, error.message);
            return 'unknown';
        }
    }

    // Check book availability across libraries
    async checkAvailability(book, libraries) {
        const availability = [];
        
        for (const library of libraries) {
            try {
                console.log(`🔍 Searching ${library.name} (${library.system})`);
                
                let result;
                switch (library.system) {
                    case 'koha':
                        result = await this.searchKoha(book, library);
                        break;
                    case 'evergreen':
                        result = await this.searchEvergreen(book, library);
                        break;
                    case 'bibliocommons':
                        result = await this.searchBiblioCommons(book, library);
                        break;
                    default:
                        result = await this.searchGeneric(book, library);
                }
                
                if (result && result.found) {
                    availability.push({
                        library: library.name,
                        system: library.system,
                        available: result.available,
                        status: result.status,
                        url: result.url,
                        callNumber: result.callNumber
                    });
                }
                
                // Rate limiting
                await this.delay(500);
                
            } catch (error) {
                console.error(`Error searching ${library.name}:`, error.message);
            }
        }
        
        return availability;
    }

    // Search Koha libraries
    async searchKoha(book, library) {
        try {
            // Try API first
            const apiUrl = `${library.url}/api/v1/public/biblios`;
            const params = new URLSearchParams({
                title: book.title,
                author: book.author,
                _per_page: 5
            });
            
            try {
                const response = await fetch(`${apiUrl}?${params}`, {
                    timeout: 10000,
                    headers: {
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        const biblio = data[0];
                        return {
                            found: true,
                            available: true,
                            status: 'Available (API)',
                            url: `${library.url}/cgi-bin/koha/opac-detail.pl?biblionumber=${biblio.biblio_id}`,
                            callNumber: biblio.call_number
                        };
                    }
                }
            } catch (apiError) {
                console.log('Koha API failed, trying OPAC search');
            }
            
            // Fallback to OPAC search
            return await this.searchKohaOPAC(book, library);
            
        } catch (error) {
            return { found: false };
        }
    }

    // Search Koha OPAC (web interface)
    async searchKohaOPAC(book, library) {
        try {
            const searchUrl = `${library.url}/cgi-bin/koha/opac-search.pl`;
            const params = new URLSearchParams({
                'q': `ti:"${book.title}" AND au:"${book.author}"`,
                'format': 'rss'
            });
            
            const response = await fetch(`${searchUrl}?${params}`, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                }
            });
            
            const html = await response.text();
            
            // Simple check for results
            const hasResults = html.includes('biblionumber') || 
                              html.toLowerCase().includes(book.title.toLowerCase().substring(0, 20));
            
            if (hasResults) {
                return {
                    found: true,
                    available: true,
                    status: 'Found in catalog',
                    url: `${searchUrl}?${params}`,
                    callNumber: 'Check catalog'
                };
            }
            
            return { found: false };
            
        } catch (error) {
            return { found: false };
        }
    }

    // Search Evergreen libraries
    async searchEvergreen(book, library) {
        try {
            const searchUrl = `${library.url}/eg/opac/results`;
            const params = new URLSearchParams({
                'query': `title:${book.title} author:${book.author}`,
                'qtype': 'keyword',
                'fi:search_format': 'book'
            });
            
            const response = await fetch(`${searchUrl}?${params}`, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                }
            });
            
            const html = await response.text();
            const $ = cheerio.load(html);
            
            // Look for search results
            const results = $('.result_table_row, .result_item').length;
            
            if (results > 0) {
                return {
                    found: true,
                    available: true,
                    status: 'Found in catalog',
                    url: `${searchUrl}?${params}`,
                    callNumber: 'Check catalog'
                };
            }
            
            return { found: false };
            
        } catch (error) {
            return { found: false };
        }
    }

    // Search BiblioCommons libraries
    async searchBiblioCommons(book, library) {
        try {
            const searchUrl = `${library.url}/search`;
            const params = new URLSearchParams({
                'q': `${book.title} ${book.author}`,
                'search_category': 'keyword',
                'material_type': 'BK'
            });
            
            const response = await fetch(`${searchUrl}?${params}`, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                }
            });
            
            const html = await response.text();
            const $ = cheerio.load(html);
            
            // Look for search results in BiblioCommons
            const results = $('.cp-search-result, .title-content').length;
            
            if (results > 0) {
                return {
                    found: true,
                    available: true,
                    status: 'Found in catalog',
                    url: `${searchUrl}?${params}`,
                    callNumber: 'Check catalog'
                };
            }
            
            return { found: false };
            
        } catch (error) {
            return { found: false };
        }
    }

    // Generic search for unknown systems
    async searchGeneric(book, library) {
        try {
            // Try to find a search page
            const response = await fetch(library.url, {
                timeout: 10000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BookFinder/1.0)'
                }
            });
            
            const html = await response.text();
            const $ = cheerio.load(html);
            
            // Look for search forms
            const searchForm = $('form[action*="search"], input[name*="search"], input[placeholder*="search"]').first();
            
            if (searchForm.length > 0) {
                // For MVP, return a generic "check manually" result
                return {
                    found: true,
                    available: true,
                    status: 'Search manually',
                    url: library.url,
                    callNumber: 'Unknown'
                };
            }
            
            return { found: false };
            
        } catch (error) {
            return { found: false };
        }
    }

    // Get test libraries for development
    getTestLibraries(location) {
        return [
            {
                name: 'Denver Public Library (Test)',
                url: 'https://catalog.denverlibrary.org',
                system: 'bibliocommons',
                type: 'public'
            },
            {
                name: 'Seattle Public Library (Test)',
                url: 'https://seattle.bibliocommons.com',
                system: 'bibliocommons', 
                type: 'public'
            }
        ];
    }

    // Utility functions
    removeDuplicates(libraries) {
        const seen = new Set();
        return libraries.filter(lib => {
            const key = lib.url.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize service
const libraryService = new LibraryMVP();

// API Routes
app.post('/api/search', async (req, res) => {
    try {
        const { books, location } = req.body;
        
        if (!books || !location) {
            return res.status(400).json({
                error: 'Missing required parameters: books and location'
            });
        }
        
        console.log(`📖 API Request: ${books.length} books near ${location}`);
        
        const results = await libraryService.searchBooks(books, location);
        
        res.json({
            success: true,
            location,
            results,
            timestamp: new Date().toISOString(),
            totalBooks: results.length,
            availableBooks: results.filter(book => book.availability.length > 0).length
        });
        
    } catch (error) {
        console.error('API Error:', error);
        res.status(500).json({
            error: 'Search failed',
            message: error.message
        });
    }
});

// JSONP support for CORS issues
app.get('/api/search-jsonp', async (req, res) => {
    try {
        const { books, location, callback } = req.query;
        
        if (!books || !location || !callback) {
            return res.status(400).send(`${callback}({"error": "Missing parameters"});`);
        }
        
        const booksArray = JSON.parse(books);
        const results = await libraryService.searchBooks(booksArray, location);
        
        const response = {
            success: true,
            location,
            results,
            timestamp: new Date().toISOString()
        };
        
        res.set('Content-Type', 'application/javascript');
        res.send(`${callback}(${JSON.stringify(response)});`);
        
    } catch (error) {
        const errorResponse = {
            success: false,
            error: error.message
        };
        res.send(`${req.query.callback}(${JSON.stringify(errorResponse)});`);
    }
});

app.get('/api/libraries/:location', async (req, res) => {
    try {
        const { location } = req.params;
        const libraries = await libraryService.findLibraries(location);
        
        res.json({
            success: true,
            location,
            libraries,
            count: libraries.length
        });
        
    } catch (error) {
        res.status(500).json({
            error: 'Library search failed',
            message: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        cacheSize: cache.size
    });
});

// Serve the main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Library API MVP running on port ${PORT}`);
    console.log(`📖 Main app: http://localhost:${PORT}`);
    console.log(`🔍 API endpoint: http://localhost:${PORT}/api/search`);
    console.log(`📁 Serve your frontend files from the 'public' directory`);
});

module.exports = app;