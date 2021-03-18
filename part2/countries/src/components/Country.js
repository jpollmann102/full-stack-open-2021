import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Languages from './Languages';
import Weather from './Weather';

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});

  const getWeather = () => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`).then(response => {
      setWeather(response.data);
    });
  }

  useEffect(getWeather, []);

  return (
    <div>
      <h1>{ country.name }</h1>
      <div>
        <p>capital { country.capital }</p>
        <p>population { country.population }</p>
      </div>
      <h4>languages</h4>
      <Languages languages={ country.languages } />
      <img src={ country.flag } alt={ country.name } style={{ height: '450px', width: '450px' }}/>
      <Weather weather={ weather } />
    </div>
  )
}

export default Country;
