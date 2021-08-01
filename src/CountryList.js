import React from 'react';

const CountryList = ({ countries = [] }) => {
  return (<div>
    Country List
    {countries.map(({ name, flag, topLanguage, capital }) => {
      return (<div key={name}>
        {name}
        <img
          style={{ height: 20, width: 20 }}
          src={flag}
          alt={`Flag of ${name}`}
        />
        {`Top Language: ${topLanguage}`}
        {`Capital: ${capital}`}
      </div>);
    })}
  </div>)
}

export default CountryList;