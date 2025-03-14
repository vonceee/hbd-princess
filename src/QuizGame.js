import React, { useState } from "react";
import "./styles/QuizGame.css";

const questions = [
  {
    question: "What is Princess's favorite song?",
    options: ["Golden Hour", "Song 2", "Imagine", "Bohemian Rhapsody"],
    correct: "Golden Hour",
    messages: {
      correct: "Correct! not sure tho is this still your fav song? i tried doing a cover song but Kuya is just not a good singer😭",
      incorrect: "Oops! It's actually Golden Hour! not sure tho is this still your fav song? i tried doing a cover song but Kuya is just not a good singer😭"
    }
  },
  {
    question: "What is her favorite anime?",
    options: ["Naruto", "Dragon Ball", "My Hero Academia", "One Piece"],
    correct: "My Hero Academia",
    messages: {
      correct: "Correct! ",
      incorrect: "Not quite! It's My Hero Academia."
    }
  },
  {
    question: "What is Princess's favorite hobby?",
    options: ["Reading", "Dancing", "Drawing", "Singing"],
    correct: "Drawing",
    messages: {
      correct: "Correct! have you been practicing your drawing skills? give kuya some tips😭",
      incorrect: "No, its Drawing isnt it? have you been practicing your drawing skills? give kuya some tips😭"
    }
  }
];

const QuizGame = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(option);
      setShowFeedback(true);
      if (option === currentQuestion.correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
  };

  return (
    <div className="quiz-overlay">
      <div className="quiz-container">
        {!quizComplete ? (
          <div className="quiz-card">
            <h2>{currentQuestion.question}</h2>
            <div className="options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedAnswer === option ? "selected" : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedAnswer !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {showFeedback && (
              <div className="feedback-message">
                {selectedAnswer === currentQuestion.correct
                  ? currentQuestion.messages.correct
                  : currentQuestion.messages.incorrect}
              </div>
            )}
            {selectedAnswer && (
              <button className="next-button" onClick={handleNextQuestion}>
                Next Question
              </button>
            )}
          </div>
        ) : (
          <div className="quiz-card">
            <h2>Quiz Complete!</h2>
            <p>Your score: {score} / {questions.length}</p>
            <button className="restart-button" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;
