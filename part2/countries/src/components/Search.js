import React from 'react';

const Search = ({ searchValue, handleSearchChangeCallback }) => (
  <div>
    find countries <input value={ searchValue } onChange={ handleSearchChangeCallback } />
  </div>
)

export default Search;
