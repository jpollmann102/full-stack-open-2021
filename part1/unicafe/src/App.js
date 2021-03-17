import React, { useState } from 'react';

const Button = ({ text, handleClick }) => (
  <button onClick={ handleClick }>
    { text }
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState([]);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allFeedback.concat(1));
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(allFeedback.concat(0));
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(allFeedback.concat(-1));
  };

  const averageFeedback = () => {
    if(allFeedback.length === 0) return 0;
    return allFeedback.reduce((a,b) => a + b, 0) / allFeedback.length;
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={ handleGoodClick } />
      <Button text="neutral" handleClick={ handleNeutralClick } />
      <Button text="bad" handleClick={ handleBadClick } />
      <h1>statistics</h1>
      <p>good { good }</p>
      <p>neutral { neutral }</p>
      <p>bad { bad }</p>
      <p>all { allFeedback.length }</p>
      <p>average { averageFeedback() }</p>
      <p>positive { allFeedback.length > 0 ? (good / allFeedback.length)*100 : 0 } %</p>
    </div>
  )
}

export default App;
