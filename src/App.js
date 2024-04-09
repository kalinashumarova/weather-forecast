import './App.css';
import { useState, useEffect } from 'react';
import { MainForecast } from './components';
import { setCoordinates } from './actions/weather';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const dispatch = useDispatch();

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position)
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          dispatch(setCoordinates({ lat: latitude, lon: longitude }))
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <div className="App">
      <div className='button' onClick={getUserLocation}>get location</div>
      <div>{userLocation?.latitude}</div>
      <div>{userLocation?.longitude}</div>

      <MainForecast />
    </div>
  );
}

export default App;
