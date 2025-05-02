$(document).ready(function() {
    // Quiz questions
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            answer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            answer: 1
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            answer: 2
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            answer: 3
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
            answer: 1
        },
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1950"],
            answer: 1
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Quartz"],
            answer: 2
        },
        {
            question: "Which country is home to the kangaroo?",
            options: ["New Zealand", "South Africa", "Australia", "Brazil"],
            answer: 2
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            answer: 1
        },
        {
            question: "What is the currency of Japan?",
            options: ["Won", "Yen", "Ringgit", "Baht"],
            answer: 1
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
            answer: 2
        },
        {
            question: "What is the tallest mountain in the world?",
            options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Denali"],
            answer: 2
        },
        {
            question: "Which country invented tea?",
            options: ["India", "England", "China", "Japan"],
            answer: 2
        },
        {
            question: "How many continents are there on Earth?",
            options: ["5", "6", "7", "8"],
            answer: 2
        },
        {
            question: "What is the largest mammal in the world?",
            options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
            answer: 1
        },
        {
            question: "Which language is the most widely spoken in the world?",
            options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
            answer: 1
        },
        {
            question: "What is the main component of the Sun?",
            options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon"],
            answer: 1
        },
        {
            question: "Which country is the largest by area?",
            options: ["China", "United States", "Canada", "Russia"],
            answer: 3
        },
        {
            question: "Who discovered gravity?",
            options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
            answer: 1
        },
        {
            question: "What is the smallest country in the world?",
            options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
            answer: 1
        }
    ];
    
    // Quiz variables
    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 120; // 2 minutes in seconds
    let userAnswers = new Array(questions.length).fill(null);
    let quizCompleted = false;
    
    // DOM elements
    const quizBody = $('#quiz-body');
    const prevBtn = $('#prev-btn');
    const nextBtn = $('#next-btn');
    const restartBtn = $('#restart-btn');
    const resultContainer = $('#result-container');
    const timeDisplay = $('#time');
    const progressBar = $('#progress');
    const correctAnswersDisplay = $('#correct-answers');
    const totalQuestionsDisplay = $('#total-questions');
    const scorePercentDisplay = $('#score-percent');
    const scoreCircle = $('#score-circle');
    
    // Initialize quiz
    function initQuiz() {
        loadQuestion();
        startTimer();
    }
    
    // Load question
    function loadQuestion() {
        if (currentQuestion >= questions.length) {
            showResults();
            return;
        }
        
        const question = questions[currentQuestion];
        const optionsHtml = question.options.map((option, index) => `
            <div class="option ${userAnswers[currentQuestion] === index ? 'selected' : ''}" data-index="${index}">
                <div class="option-prefix">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            </div>
        `).join('');
        
        const questionHtml = `
            <div class="question-container">
                <div class="question-number">Question ${currentQuestion + 1} of ${questions.length}</div>
                <div class="question">${question.question}</div>
                <div class="options">${optionsHtml}</div>
            </div>
        `;
        
        quizBody.html(questionHtml);
        updateProgressBar();
        updateButtonStates();
        
        // Add click event to options
        $('.option').click(function() {
            if (quizCompleted) return;
            
            const selectedIndex = $(this).data('index');
            userAnswers[currentQuestion] = selectedIndex;
            
            // Update UI
            $('.option').removeClass('selected');
            $(this).addClass('selected');
        });
    }
    
    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestion) / questions.length) * 100;
        progressBar.css('width', progress + '%');
    }
    
    // Update button states
    function updateButtonStates() {
        prevBtn.prop('disabled', currentQuestion === 0);
        
        if (currentQuestion === questions.length - 1) {
            nextBtn.html('Finish <i class="fas fa-flag-checkered"></i>');
        } else {
            nextBtn.html('Next <i class="fas fa-arrow-right"></i>');
        }
    }
    
    const audio = $('#background-music')[0];
    const button = $('#play-music');
    
    button.on('click', function() {
        audio.play().then(() => {
            button.hide(); // hide button after playing
        }).catch((error) => {
            console.error('Audio play failed:', error);
        });
    });
    
    

    let isPlaying = false;

playMusicBtn.on('click', function() {
    if (!isPlaying) {
        audio.play().then(() => {
            playMusicBtn.text('Pause Background Music');
            isPlaying = true;
        }).catch((error) => {
            console.error('Audio play failed:', error);
        });
    } else {
        audio.pause();
        playMusicBtn.text('Play Background Music');
        isPlaying = false;
    }
});

    // Timer function
    function startTimer() {
        updateTimerDisplay();
        timer = setInterval(function() {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeUp();
            }
        }, 1000);
    }
    
    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeDisplay.text(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        
        // Change color when time is running low
        if (timeLeft <= 30) {
            timeDisplay.css('color', '#ff7675');
        }
    }
    
    // Time's up
    function timeUp() {
        quizCompleted = true;
        showResults();
        alert("Time's up! Your answers have been submitted automatically.");
    }
    
    // Show results
    function showResults() {
        clearInterval(timer);
        quizCompleted = true;
        
        // Calculate score
        score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (userAnswers[i] === questions[i].answer) {
                score++;
            }
        }
        
        // Display results
        correctAnswersDisplay.text(score);
        totalQuestionsDisplay.text(questions.length);
        const percentage = Math.round((score / questions.length) * 100);
        scorePercentDisplay.text(percentage + '%');
        
        // Animate score circle
        animateScoreCircle(percentage);
        
        // Hide quiz body and show results
        quizBody.hide();
        $('.quiz-footer').hide();
        resultContainer.show();
        
        // Create confetti if score is good
        if (percentage >= 70) {
            createConfetti();
        }
    }
    
    // Animate score circle
    function animateScoreCircle(percentage) {
        // Reset animation
        scoreCircle.css('background', 'conic-gradient(var(--correct) 0%, var(--correct) 0%, #dfe6e9 0%)');
        
        // Animate to correct percentage
        setTimeout(() => {
            scoreCircle.css('background', `conic-gradient(var(--correct) 0%, var(--correct) ${percentage}%, #dfe6e9 ${percentage}%)`);
        }, 100);
    }
    
    // Create confetti
    function createConfetti() {
        const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#fdcb6e'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = $('<div class="confetti"></div>');
            confetti.css({
                'background-color': colors[Math.floor(Math.random() * colors.length)],
                'left': Math.random() * 100 + '%',
                'top': -10 + 'px',
                'width': Math.random() * 10 + 5 + 'px',
                'height': Math.random() * 10 + 5 + 'px',
                'transform': 'rotate(' + Math.random() * 360 + 'deg)',
                'border-radius': Math.random() > 0.5 ? '50%' : '0'
            });
            
            $('.quiz-container').append(confetti);
            
            animateConfetti(confetti);
        }
    }
    
    // Animate confetti
    function animateConfetti(element) {
        const animationDuration = Math.random() * 3 + 2;
        
        element.css({
            'opacity': 1,
            'animation': `fall ${animationDuration}s linear forwards`
        });
        
        // Define keyframes
        const keyframes = `
            @keyframes fall {
                to {
                    top: 100%;
                    transform: rotate(${Math.random() * 360}deg);
                    left: ${Math.random() * 100}%;
                }
            }
        `;
        
        // Add keyframes to head
        $('head').append(`<style>${keyframes}</style>`);
        
        // Remove element after animation
        setTimeout(() => {
            element.remove();
        }, animationDuration * 1000);
    }
    
    // Event listeners
    nextBtn.click(function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            showResults();
        }
    });
    
    prevBtn.click(function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });
    
    restartBtn.click(function() {
        // Reset quiz
        currentQuestion = 0;
        score = 0;
        timeLeft = 120;
        userAnswers = new Array(questions.length).fill(null);
        quizCompleted = false;
        
        // Reset UI
        resultContainer.hide();
        quizBody.show();
        $('.quiz-footer').show();
        timeDisplay.css('color', 'white');
        $('.confetti').remove();
        
        // Restart quiz
        initQuiz();
    });
    
    // Start the quiz
    initQuiz();
});