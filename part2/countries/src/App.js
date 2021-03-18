import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');

  const getCountries = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data);
    });
  }

  useEffect(getCountries, []);

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value);
    setShowCountries(countries.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase())));
  }

  const handleCountryClicked = (event) => {
    setShowCountries(countries.filter(x => x.name === event.target.value));
  }

  return (
    <div>
      <Search
        searchValue={ searchCountry }
        handleSearchChangeCallback={ handleSearchChange }
      />
      <Results
        countries={ showCountries }
        handleCountryClickCallback={ handleCountryClicked }
      />
    </div>
  )
}

export default App;
