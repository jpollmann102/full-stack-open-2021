import React from 'react';
import Languages from './Languages';

const Country = ({ country }) => {

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
    </div>
  )
}

export default Country;
