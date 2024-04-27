const quizData = [
    {
        question: "В каком году началась Великая Отечественная война?",
        options: ["1941", "1942", "1943", "1944"],
        answer: "1941"
    },
    {
        question: "Какое событие отмечается 9 мая в России и многих других странах?",
        options: ["День рождения Пушкина", "День космонавтики", "День Победы", "День земли"],
        answer: "День Победы"
    },
    {
        question: "Какой город был освобожден в ходе Битвы за Берлин?",
        options: ["Москва", "Ленинград", "Ставрополь", "Берлин"],
        answer: "Берлин"
    },
    {
        question: "Кто был Верховным главнокомандующим советскими войсками во время ВОВ?",
        options: ["Жуков", "Рохлин", "Сталин", "Хрущев"],
        answer: "Сталин"
    },
    {
        question: "Какой город выдержал 900-дневную блокаду?",
        options: ["Москва", "Минск", "Ленинград", "Киев"],
        answer: "Ленинград"
    },
    {
        question: "Какая битва считается переломным моментом в ходе ВОВ?",
        options: ["Курская битва", "Битва за Москву", "Сталинградская битва", "Битва за Днепр"],
        answer: "Сталинградская битва"
    },
    {
        question: "Как назывался план нападения Германии на СССР?",
        options: ["Барбаросса", "Цитадель", "Тайфун", "Ост"],
        answer: "Барбаросса"
    },
    {
        question: "Кто был командующим 62-й армией, которая обороняла Сталинград?",
        options: ["Рокоссовский", "Чуйков", "Ватутин", "Конев"],
        answer: "Чуйков"
    },
    {
        question: "Какое оружие сыграло ключевую роль в победе СССР в танковом сражении под Прохоровкой?",
        options: ["Танк Т-34", "Танк ИС-2", "Реактивная установка «Катюша»", "Противотанковая пушка"],
        answer: "Танк Т-34"
    },
    {
        question: "В каком году была создана антигитлеровская коалиция?",
        options: ["1941", "1942", "1943", "1944"],
        answer: "1941"
    }
];


const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const nameElement = document.getElementById("name");
const incorrectAnswersElement = document.getElementById("incorrectAnswers");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];



function displayQuestion() {
    questionElement.textContent = quizData[currentQuestion].question;
    optionsElement.innerHTML = "";

    quizData[currentQuestion].options.forEach(function (option) {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.addEventListener("click", handleAnswer);
        optionsElement.appendChild(button);
    });
    const medalImage = document.createElement("img");
    medalImage.src = `img/medal${currentQuestion + 1}.png`
    medalImage.alt = `Медаль ${currentQuestion + 1}`;
    medalImage.id = "medalImage";
    questionElement.appendChild(medalImage)

    const medalContainer = document.getElementById("medal-container");
    medalContainer.innerHTML = "";
    medalContainer.appendChild(medalImage);

}


function handleAnswer(event) {

    const selectedAnswer = event.target.innerText;
    const correctAnswer = quizData[currentQuestion].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        incorrectAnswers.push({ question: quizData[currentQuestion].question, selectedAnswer, correctAnswer });
    }


    currentQuestion++;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}




function showResults() {
    questionElement.textContent = "";
    optionsElement.innerHTML = "";


    const userName = nameElement.value || "Уважаемый пользователь";

    resultElement.innerHTML = `<h2>${userName}, вы ответили правильно на ${score} из ${quizData.length} вопросов</h2>`;


    if (incorrectAnswers.length > 0) {
        incorrectAnswersElement.innerHTML = `<h3>Вопросы, на которые вы ответили неправильно:</h3>`;
        incorrectAnswers.forEach(function (answer) {
            const answerElement = document.createElement("div");
            answerElement.innerHTML = `<p><strong>Вопрос:</strong> ${answer.question}</p>
                                       <p><strong>Ваш ответ:</strong> ${answer.selectedAnswer}</p>
                                       <p><strong>Правильный ответ:</strong> <span class="correct">${answer.correctAnswer}</span></p>`;
            incorrectAnswersElement.appendChild(answerElement);
        });
    }
}


optionsElement.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {

        optionsElement.querySelectorAll("button").forEach(button => button.classList.remove("selected"));


        event.target.classList.add("selected");


        const correctAnswer = quizData[currentQuestion].answer;

        if (event.target.innerText === correctAnswer) {
            event.target.classList.add("correct");
        } else {
            event.target.classList.add("incorrect");
        }
    }
});

displayQuestion();

