import React from 'react';

const PersonForm = ({ newNameValue, newNumberValue, addPersonCallback, handleNameChangeCallback, handleNumberChangeCallback }) => {

  return (
    <form onSubmit={ addPersonCallback }>
      <div>
        <div>name: <input value={ newNameValue } onChange={ handleNameChangeCallback }/></div>
        <div>number: <input value={ newNumberValue } onChange={ handleNumberChangeCallback }/></div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;
