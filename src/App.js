import './App.css';
import Tabs from './Tabs';
import CountryList from './CountryList';
import React, { useEffect, useState } from 'react';
import Stats from './Stats';

const API_URL = 'https://restcountries.eu/rest/v2/all';

function App() {
  const [rawCountries, setRawCountries] = useState([]);
  const [appLoading, setLoading] = useState(true);

  const countries = React.useMemo(() => 
    rawCountries.map(({ name, flag, capital, languages }) => (
      { name, flag, capital, topLanguage: languages[0].name }
    )) , [rawCountries]
  );

  const stats = React.useMemo(() => {
    const allLanguages = rawCountries.map(({ languages, name }) => languages.map((lang) =>({ ...lang, countryName: name }))).flat()
    const langStats = { };

    allLanguages.forEach((language) => {
      const languageKey = language.iso639_1;
      if (!langStats[languageKey]) {
        langStats[languageKey] = {
          count: 0,
          countries: [],
          name: language.name
        }
      }
      langStats[languageKey].count += 1;
      langStats[languageKey].countries.push(language.countryName);
    });

    const mostSpokenLanguges = Object.values(langStats)
      .sort((firstElement, secondElement) => (secondElement.count - firstElement.count))// Sorted by count DESC
      .slice(0, 10); 

    return mostSpokenLanguges;
  }, [rawCountries]);

  const tabs = [
    { name: 'countries',
      title: 'Countries',
      component: () => (<CountryList countries={countries} />) 
    },
    { 
      name: 'stats',
    title: 'Stats',
    component: () => (<Stats stats={stats} />) 
    },
  ];


  useEffect(() => {
    fetch(API_URL).then((response) => {
      response.json().then((jsonData) => {
        setRawCountries(jsonData);
        setLoading(false);
      })
    })
  }, []);

  if (appLoading) {
    return <div> App is Loading..</div>
  }

  return (
      <div className="App">
        <Tabs
          tabs={tabs}
          initialTab={'countries'}
        />
      </div>
  );
}

export default App;
