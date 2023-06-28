import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const [unit, setUnit] = useState('imperial')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=6adaa3e98c58bb9f4a3ef7a83dabb67f`

  const handleUnitChange = (event) => {
    setUnit(event.target.value)
  }

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)

        // setUnit(response.data && response.data.main? response.data.main.unit : unit)
        setUnit(unit)
      })
      setLocation('')
    }
  }

  const convertTemperature = (temp) => {
    if (unit === 'metric') {
      return ((temp - 32) * 5)/9; 
    }else{
      return temp;
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter your Location'
          type="text" />
        <select value={unit} onChange={handleUnitChange}>
          <option value="imperial">Fahrenheit</option>
          <option value="metric">Celsius</option>
        </select>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{convertTemperature(data.main.temp).toFixed()}°{unit === 'imperial'? 'F': 'C'}</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{convertTemperature(data.main.feels_like).toFixed()}°{unit === 'imperial'? 'F': 'C'}</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>



      </div>
    </div>
  );
}

export default App;


