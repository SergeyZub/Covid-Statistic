import { useEffect, useState } from 'react';
import { get } from './api/api';
import './App.css';
import logo from './logo.png';
import { Modal } from './Modal/Modal';

function App() {
  const [countriesFromServer, setCountriesFromServer] = useState([]);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(false);
  // const [selectedCountryId, setSelectedCountryId] = useState('');

  useEffect(() => {
    get('summary').then(setCountriesFromServer);
  }, []);

  useEffect(() => {
    if (query === '') {
      return setCountries(countriesFromServer);
    }

    const filtred = countriesFromServer.filter(country =>
      country.Country.toLowerCase().startsWith(query.toLowerCase())
    );
    setCountries(filtred);
  }, [countriesFromServer, query]);

  const sortCountries = () => {
    const sorted = countries.sort((a, b) =>
      a.Country.localeCompare(b.Country)
    );
    setCountries(sorted);
  }

  const sortConfirmed = () => {
    const sorted = countries.sort((a, b) =>
      b.TotalConfirmed - a.TotalConfirmed
    );
    setCountries(sorted);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" />
        <b>STATISTIC</b>
        <input
          type='text'
          value={query}
          onChange={(event) => (setQuery(event.target.value))}
        />
        <div>
          <button onClick={sortCountries}>
            Sort
          </button>

          <button onClick={sortConfirmed}>
            Sort by confirmed
          </button>
          </div>
      </header>

      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Country</th>
            <th>Total Confirmed</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, index) => {
            return (
              <tr key={country.ID} onClick={() => setActive(true)}>
                <td>{index + 1}</td>
                <td>{country.Country}</td>
                <td>{country.TotalConfirmed}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
      <Modal active={active} setActive={setActive}/>
    </div>
  );
}

export default App;
