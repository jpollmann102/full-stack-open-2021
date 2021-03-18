import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ showPersons, setShowPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  const getPersons = () => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
      setShowPersons(response.data);
    });
  }

  useEffect(getPersons, []);

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
      <Filter
        searchValue={ searchName }
        handleSearchChangeCallback={ handleSearchChange }
      />
      <h2>add a new</h2>
      <PersonForm
        newNameValue={ newName }
        newNumberValue={ newNumber }
        addPersonCallback={ addPerson }
        handleNameChangeCallback={ handleNameChange }
        handleNumberChangeCallback={ handleNumberChange }
      />
      <h2>Numbers</h2>
      <Persons persons={ showPersons } />
    </div>
  )
}

export default App;
