import React from 'react';

const Total = (props) => {
  const numExercises = props.parts.reduce((a,b) => a + b.exercises, 0);

  return (
    <p>Number of exercises { numExercises }</p>
  )
}

export default Total
