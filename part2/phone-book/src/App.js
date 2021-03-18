import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [ showPersons, setShowPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.some(x => x.name === newName))
    {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }else if(newName === '' || newNumber === '')
    {
      window.alert('Please enter both a name and number');
      return;
    }

    const newPersonObject = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(newPersonObject));
    setShowPersons(persons.concat(newPersonObject).filter(x => x.name.toLowerCase().includes(searchName.toLowerCase())));
    setNewName('');
    setNewNumber('');
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);

    setShowPersons(persons.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={ searchName } onChange={ handleSearchChange }/></div>
      <h2>add a new</h2>
      <form onSubmit={ addPerson }>
        <div>
          <div>name: <input value={ newName } onChange={ handleNameChange }/></div>
          <div>number: <input value={ newNumber } onChange={ handleNumberChange }/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        { showPersons.map(p =>
            <li key={ p.name }>{ p.name } { p.number }</li>
          )
        }
      </ul>
    </div>
  )
}

export default App;
