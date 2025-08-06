// UI Management Functions
class UIManager {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.userLocation = '';
    }

    // Initialize the app
    initialize() {
        console.log('📚 Initializing Stacks...');
        this.loadBookAnimation();
        this.showQuestion(0);
        this.updateProgress();
    }

    // Create animated book icon
    loadBookAnimation() {
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

    // Update progress bar
    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progress = ((this.currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = progress + '%';
    }

    // Show a specific question
    showQuestion(index) {
        console.log(`📝 Showing question ${index + 1}: ${questions[index].question}`);
        const container = document.getElementById('question-container');
        const question = questions[index];
        
        if (question.isLocation) {
            this.showLocationQuestion(container, question);
        } else {
            this.showMultipleChoiceQuestion(container, question, index);
        }

        document.getElementById('current-question').textContent = index + 1;
        this.updateProgress();
    }

    // Show location input question
    showLocationQuestion(container, question) {
        container.innerHTML = `
            <div class="question active">
                <h2>${question.question}</h2>
                <div class="options">
                    <input type="text" class="location-input" id="location-input" 
                           placeholder="Enter your city, state or ZIP code" 
                           onkeypress="if(event.key==='Enter') ui.selectLocation()">
                    <button class="continue-btn" id="continue-btn" 
                            onclick="ui.selectLocation()" disabled>
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
    }

    // Show multiple choice question
    showMultipleChoiceQuestion(container, question, index) {
        const optionsHtml = question.options.map((option, i) => {
            const safeOption = option.replace(/'/g, "&#39;").replace(/"/g, "&quot;");
            return `<button class="option" onclick="ui.selectAnswer(${i}, '${safeOption}')">${option}</button>`;
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

    // Handle location selection
    selectLocation() {
        const input = document.getElementById('location-input');
        const location = input.value.trim();
        
        if (location) {
            this.userLocation = location;
            this.answers.push({ question: this.currentQuestion, text: location });
            
            const questionEl = document.querySelector('.question.active');
            questionEl.style.opacity = '0';
            questionEl.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                this.showResults();
            }, 600);
        }
    }

    // Handle answer selection
    selectAnswer(optionIndex, optionText) {
        console.log(`Selected: ${optionText}`);
        this.answers.push({ question: this.currentQuestion, answer: optionIndex, text: optionText });
        
        const questionEl = document.querySelector('.question.active');
        questionEl.style.opacity = '0';
        questionEl.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            this.currentQuestion++;
            if (this.currentQuestion < questions.length) {
                this.showQuestion(this.currentQuestion);
            }
        }, 600);
    }

    // Show results page
    async showResults() {
        console.log('🔍 Showing results...');
        
        // Hide quiz UI
        document.querySelector('.progress').style.display = 'none';
        document.querySelector('.progress-container').style.display = 'none';
        document.getElementById('question-container').style.display = 'none';
        
        // Show results UI
        document.getElementById('results-container').style.display = 'block';
        document.getElementById('location-display').textContent = `Book recommendations for ${this.userLocation}`;
        document.getElementById('loading').style.display = 'block';
        
        // Set up recommendation engine
        recommendationEngine.setAnswers(this.answers);
        recommendationEngine.setLocation(this.userLocation);
        
        // Generate recommendations
        const recommendations = recommendationEngine.generateRecommendations();
        
        // Simulate brief loading for better UX
        setTimeout(() => {
            this.displayResults(recommendations, false);
            document.getElementById('loading').style.display = 'none';
        }, 1000);
    }

    // Display book results
    displayResults(results, hasLibraryData) {
        console.log('📊 Displaying book recommendations');
        
        const statusMessage = `Found ${results.length} personalized book recommendations for you!`;
        
        this.showApiStatus(statusMessage, 'success');
        
        const grid = document.getElementById('results-grid');
        
        grid.innerHTML = results.map(book => {
            const links = recommendationEngine.getLibraryLinks(book);
            
            return `
                <div class="book-card">
                    ${this.getCoverHtml(book)}
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">by ${book.author}</div>
                    <div class="book-details">
                        <div><strong>Genre:</strong> ${book.genre}</div>
                        <div><strong>Published:</strong> ${book.published}</div>
                        <div><strong>Pages:</strong> ${book.pages}</div>
                        <div><strong>Rating:</strong> ${book.rating}/5 ⭐</div>
                    </div>
                    <div class="availability">
                        <div class="availability-status">📚 Find This Book</div>
                        <div class="library-info">Available from these sources:</div>
                        <a href="${links.googleBooks}" target="_blank" class="library-link">Google Books</a>
                        <a href="${links.openLibrary}" target="_blank" class="library-link">Open Library</a>
                        <a href="${links.goodreads}" target="_blank" class="library-link">Goodreads</a>
                        <a href="${links.amazon}" target="_blank" class="library-link">Amazon</a>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Get book cover HTML
    getCoverHtml(book) {
        if (!book.covers || book.covers.length === 0) {
            return '<div class="book-cover">📚<br>No cover<br>available</div>';
        }
        
        return `
            <div class="book-cover">
                <img src="${book.covers[0]}" 
                     alt="${book.title}" 
                     onload="this.style.opacity='1'"
                     onerror="ui.handleCoverError(this)"
                     style="opacity: 0; transition: opacity 0.3s ease;">
            </div>
        `;
    }

    // Handle cover image errors
    handleCoverError(img) {
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

    // Show API status message
    showApiStatus(message, type) {
        const statusEl = document.getElementById('api-status');
        statusEl.textContent = message;
        statusEl.className = `api-status ${type}`;
        statusEl.style.display = 'block';
    }

    // Restart the quiz
    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        this.userLocation = '';
        
        // Reset UI
        document.querySelector('.progress').style.display = 'block';
        document.querySelector('.progress-container').style.display = 'block';
        document.getElementById('question-container').style.display = 'flex';
        document.getElementById('results-container').style.display = 'none';
        document.getElementById('api-status').style.display = 'none';
        
        // Restart app
        this.initialize();
    }
}

// Create global UI manager instance
const ui = new UIManager();

// Global functions for onclick handlers
function restartQuiz() {
    ui.restart();
}