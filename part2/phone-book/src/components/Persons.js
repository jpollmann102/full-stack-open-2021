import React from 'react';
import Person from './Person';

const Persons = ({ persons }) => {

  return (
    <ul>
      { persons.map(p =>
          <Person key={ p.name } person={ p } />
        )
      }
    </ul>
  )
}

export default Persons;
