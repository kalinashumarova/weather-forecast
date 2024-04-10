import './App.scss';
import { useState, useEffect } from 'react';
import { MainForecast } from './components';
import { setCoordinates } from './actions/weather';
import { useSelector, useDispatch } from "react-redux";
import { getUserLocation } from './utilities/helpers';

function App() {
  const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
  const dispatch = useDispatch();

  useEffect(() => {
    getUserLocation((latitude, longitude) => {
      setUserLocation({ latitude, longitude });
      dispatch(setCoordinates({ lat: latitude, lon: longitude }))
    })
  }, [])

  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setUserLocation({ latitude, longitude });
  //         dispatch(setCoordinates({ lat: latitude, lon: longitude }))
  //       },
  //       (error) => {
  //         console.error('Error getting user location:', error);
  //       }
  //     );
  //   }
  //   else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }
  // }

  // useEffect(() => {
  //   getUserLocation()
  // }, [])

  return (
    <div className="App">
      <h1 className='title'>Weather Forecast</h1>
      {/* <div className='button' onClick={getUserLocation}>get location</div>
      <div>{userLocation?.latitude}</div>
      <div>{userLocation?.longitude}</div> */}

      <MainForecast />
    </div>
  );
}

export default App;
