import React from 'react';

const Weather = ({ weather }) => {
  if(!weather.location) return <></>

  return (
    <div>
      <h4>Weather in { weather.location.name }</h4>
      <p><strong>temperature:</strong> { weather.current.temperature } Celsius</p>
      { weather.current.weather_icons.map((x,i) =>
          <img src={ x } key={ weather.current.weather_descriptions[i] } alt={ weather.current.weather_descriptions[i] } style={{ height: '50px', width: '50px' }}/>
        )
      }
      <p><strong>wind:</strong> { weather.current.wind_speed } mph direction { weather.current.wind_dir }</p>
    </div>
  )
}

export default Weather;
