import React, { useState, useEffect } from 'react';
import numberService from './services/numbers';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ showPersons, setShowPersons ] = useState(persons);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ searchName, setSearchName ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ notificationClass, setNotificationClass ] = useState('error');

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
      updatePerson();
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
      setNotificationMessage(`Added ${newPerson.name}`);
      setNotificationClass('success');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
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
      .catch(error => {
        setNotificationMessage(`Information of ${personToDelete.name} has already been deleted`);
        setNotificationClass('error');
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    }
  }

  const updatePerson = () => {
    const person = persons.find(p => p.name === newName);
    if(window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`))
    {
      const changedPerson = { ...person, number: newNumber };

      numberService.update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
        setShowPersons(persons.map(p => p.id !== person.id ? p : returnedPerson).filter(x => x.name.toLowerCase().includes(searchName.toLowerCase())));
      })
      .catch(error => {
        alert(`an error occurred with updating '${person.content}'`);
        setPersons(persons.filter(n => n.id !== person.id));
        setShowPersons(persons.filter(n => n.id !== person.id));
      });
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
      <Notification
        message={ notificationMessage }
        className={ notificationClass }
      />
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
