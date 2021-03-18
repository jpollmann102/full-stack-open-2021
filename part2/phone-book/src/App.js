import React, { useState, useEffect } from 'react';
import numberService from './services/numbers';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ showPersons, setShowPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');

  useEffect(() => {
    numberService.getAll()
    .then(initialNumbers => {
      setPersons(initialNumbers);
      setShowPersons(initialNumbers);
    })
    .catch(error => alert('could not fetch all numbers'));
  }, []);

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

    numberService.create(newPersonObject)
    .then(newPerson => {
      setPersons(persons.concat(newPerson));
      setShowPersons(persons.concat(newPerson).filter(x => x.name.toLowerCase().includes(searchName.toLowerCase())));
      setNewName('');
      setNewNumber('');
    })
    .catch(error => alert(`could not create ${newPersonObject.name}`));
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(x => x.id === id);
    if(window.confirm(`Delete ${personToDelete.name}?`))
    {
      numberService.deletePerson(id)
      .then(deletedPerson => {
        const newPersons = persons.filter(x => x.id !== id);
        setPersons(newPersons);
        setShowPersons(newPersons.filter(x => x.name.toLowerCase().includes(searchName.toLowerCase())));
      })
      .catch(error => alert(`could not delete ${personToDelete.name}`));
    }
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
      <Persons
        persons={ showPersons }
        handleDeleteClickedCallback={ deletePerson }
      />
    </div>
  )
}

export default App;
