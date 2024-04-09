import React from 'react';
import './styles.scss';
import { WeatherCard } from '../WeatherCard';
import { getMainForecastAsync, setLoading } from '../../actions/weather';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

export default function MainForecast() {
  const dispatch = useDispatch();
  const coordinates = useSelector(state => state.weather.coordinates);
  const weatherData = useSelector(state => state.weather.data);
  const loading = useSelector(state => state.weather.loading);

  useEffect(() => {
    if (Object.values(coordinates)?.length) {
      dispatch(setLoading(true))
      dispatch(getMainForecastAsync({...coordinates}))
    }
  }, [coordinates])

  console.log(weatherData)

  return (
    <div className='main-forecast-wrapper'>
      <WeatherCard />
    </div>
  )
}
