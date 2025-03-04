document.addEventListener("DOMContentLoaded", () => {
    fetch('questions.json')
    .then(response => response.json())
    .then(data => generateQuiz(data));
    
    function generateQuiz(questions) {
    const quizContainer = document.getElementById("quiz-container");
    let quizHTML = "";
    
    questions.forEach((q, index) => {
    quizHTML += `<fieldset><legend>${q.question}</legend>`;
    q.options.forEach(option => {
    quizHTML += `
    <label>
    <input type="radio" name="q${index}" value="${option}" required> ${option}
    </label><br>`;
    });
    quizHTML += `</fieldset>`;
    });
    
    quizContainer.innerHTML = quizHTML;
    }
    
    document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();
    fetch('questions.json')
    .then(response => response.json())
    .then(questions => {
    let score = 0;
    questions.forEach((q, index) => {
    const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
    if (selectedAnswer && selectedAnswer.value === q.correct) {
    score++;
    }
    });
    document.getElementById("result").innerText = `You got ${score} correct.`;
    });
    });
    });
    