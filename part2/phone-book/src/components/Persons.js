import React from 'react';
import Person from './Person';

const Persons = ({ persons, handleDeleteClickedCallback }) => {

  return (
    <ul>
      { persons.map(p =>
          <Person
            key={ p.name }
            person={ p }
            handleDeleteClickedCallback={ handleDeleteClickedCallback }
          />
        )
      }
    </ul>
  )
}

export default Persons;
