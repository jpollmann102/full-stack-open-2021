import React from 'react';

const Languages = ({ languages }) => (
  <ul>
    { languages.map(x =>
        <li key={ x.name }>{ x.name }</li>
      )
    }
  </ul>
)

export default Languages;
