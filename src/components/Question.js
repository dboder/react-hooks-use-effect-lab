import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [count, setCount] = useState(0);
  // add useEffect code

  useEffect(() => {
    
    const timeoutID = setTimeout(() => {
      let tmpTimeRemaining = timeRemaining;
      console.log(tmpTimeRemaining, timeRemaining)
      if (timeRemaining === 0) {
        tmpTimeRemaining = 10;
        handleAnswer(false)
      } 
      else{
        setTimeRemaining (tmpTimeRemaining-1);
      }
      setCount(!count);
    }, 1000);

    // returning a cleanup function
    return function cleanup() {
      clearTimeout(timeoutID);
    };
    
  }, [count]);
  
  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
    setCount(!count);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
