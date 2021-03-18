import React from 'react';
import Country from './Country';

const Results = ({ countries, handleCountryClickCallback }) => {
  if(countries.length === 0)
  {
    return <></>
  }
  else if(countries.length === 1)
  {
    return <Country country={ countries[0] } />
  }else if(countries.length > 10)
  {
    return <p>Too many matches, specify another filter</p>
  }

  return (
    <div>
      { countries.map(c =>
          <p key={ c.name }>{ c.name } <button value={ c.name } onClick={handleCountryClickCallback }>show</button></p>
        )
      }
    </div>
  )
}

export default Results;
