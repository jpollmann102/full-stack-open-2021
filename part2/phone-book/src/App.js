import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const addName = (event) => {
    event.preventDefault();

    const newPersonObject = {
      name: newName
    };

    setPersons(persons.concat(newPersonObject));
    setNewName('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={ addName }>
        <div>
          name: <input value={ newName } onChange={ handleNameChange }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { persons.map(p =>
            <li key={ p.name }>{ p.name }</li>
          )
        }
      </ul>
    </div>
  )
}

export default App;
