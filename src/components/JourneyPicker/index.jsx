import React, { useEffect, useState } from "react";
import "./style.css";
import { DatesOptions } from "./DatesOptions";

export const CityOptions = ({ cities }) => {
return cities.map((city) =>
<option key={city.code} value={city.code}>{city.name}
</option>
)};

export const JourneyPicker = ({ onJourneyChange }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [cities, setCities ] = useState([ ]);

  useEffect(() => {
    const fetchCities = async () =>
    {
      const resp = await fetch('https://apps.kodim.cz/daweb/leviexpress/api/cities')
      if (!resp.ok) {
        alert('Neco je spatne, nepodarilo se nacist seznam mest.')
        return
    }
    const data = await resp.json()
    setCities(data.results)
    }
    fetchCities()
  },[])


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Uzivatel chci objednat jizdenku z ${fromCity} do ${toCity} na ${date} `
    );
  };
  
  return (

    <div className="journey-picker container">
      <h2 className="journey-picker__head">Kam chcete jet?</h2>
      <div className="journey-picker__body">
        <form className="journey-picker__form" onSubmit={handleSubmit}>

          <label> 
            <div className="journey-picker__label">Odkud:</div>
            <select onChange={(event) => setFromCity(event.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities = {cities} />
           
            </select>
          </label>
          <label>
            <div className="journey-picker__label">Kam:</div>
            <select onChange={(event) => setToCity(event.target.value)}>
              <option value="">Vyberte</option>
              <CityOptions cities = {cities} />
           
            </select>
          </label>
          <DatesOptions></DatesOptions>
          <div className="journey-picker__controls">
            <button className="btn" type="submit">
              Vyhledat spoj
            </button>
          </div>
        </form>
        <img className="journey-picker__map" src="/map.svg" />
      </div>
    </div>
  );
};


  



