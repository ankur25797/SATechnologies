import React, { useState } from "react";
import { QUESTIONS } from "./questions";

const App = () => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [allScores, setAllScores] = useState([]);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const answerValues = Object.values(answers);
    const yesCount = answerValues.filter(answer => answer).length;
    const calculatedScore = (yesCount / Object.keys(QUESTIONS).length) * 100;
    setScore(calculatedScore.toFixed(2));


    setAllScores(prevScores => [...prevScores, calculatedScore]);
  };

  const calculateAverageRating = () => {
    if (allScores.length === 0) return 0;
    const totalScore = allScores.reduce((acc, curr) => acc + curr, 0);
    return (totalScore / allScores.length).toFixed(2);
  };

  const isQuestionAnswered = (questionId) => {
    return answers.hasOwnProperty(questionId);
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <div>
          <h2>Answer the following questions:</h2>
          <ul>
            {Object.entries(QUESTIONS).map(([questionId, question]) => (
              <li key={questionId}>
                <p>{question}</p>
                <button 
                  onClick={() => handleAnswer(questionId, true)} 
                  disabled={isQuestionAnswered(questionId)}
                >
                  Yes
                </button>
                <button 
                  onClick={() => handleAnswer(questionId, false)} 
                  disabled={isQuestionAnswered(questionId)}
                >
                  No
                </button>
              </li>
            ))}
          </ul>
          <button onClick={calculateScore}>Calculate Score</button>
          {score && <p>Your score is: {score}%</p>}
          <p>Average rating for all runs: {calculateAverageRating()}%</p>
        </div>
      </main>
    </div>
  );
};

export default App;
