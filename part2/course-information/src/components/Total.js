import React from 'react';

const Total = ({ parts }) => {
  const numExercises = parts.reduce((a,b) => a + b.exercises, 0);

  return (
    <p><strong>Number of exercises { numExercises }</strong></p>
  )
}

export default Total
