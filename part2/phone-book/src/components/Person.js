import React from 'react';

const Person = ({ person, handleDeleteClickedCallback }) => (
  <li>
    { person.name } { person.number }
    <button onClick={ () => handleDeleteClickedCallback(person.id) }>delete</button>
  </li>
)

export default Person;
