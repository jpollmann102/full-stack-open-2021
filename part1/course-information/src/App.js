import React from 'react';

const Header = (props) => {

  return (
    <>
      <h1>{ props.course }</h1>
    </>
  )
}

const Content = (props) => {

  return (
    <div>
      <Part part={ props.parts[0] } />
      <Part part={ props.parts[1] } />
      <Part part={ props.parts[2] } />
    </div>
  )
}

const Part = (props) => {

  return (
    <>
      <p>{ props.part.name } { props.part.exercises }</p>
    </>
  )
}

const Total = (props) => {
  const numExercises = props.exercises.reduce((a,b) => a + b, 0);

  return (
    <>
      <p>Number of exercises { numExercises }</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development';

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10,
  };

  const part2 = {
    name: 'Using props to pass data',
    exercises: 7,
  };

  const part3 = {
    name: 'State of a component',
    exercises: 14,
  };

  return (
    <div>
      <Header course={ course } />
      <Content parts={ [part1, part2, part3] } />
      <Total exercises={ [part1.exercises, part2.exercises, part3.exercises] } />
    </div>
  )
}

export default App;
