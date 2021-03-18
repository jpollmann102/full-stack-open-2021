import React from 'react';

const Filter = ({ searchValue, handleSearchChangeCallback }) => {

  return (
    <div>filter shown with <input value={ searchValue } onChange={ handleSearchChangeCallback }/></div>
  )
}

export default Filter;
