import React from 'react';
import './styles.scss';
import { WeatherCard } from '../WeatherCard';
import { getMainForecastAsync, setLoading } from '../../actions/weather';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment';

export default function MainForecast() {
  const dispatch = useDispatch();
  const coordinates = useSelector(state => state.weather.coordinates);
  const weatherData = useSelector(state => state.weather.data);
  const weatherByDay = useSelector(state => state.weather.dataByDay);
  const loading = useSelector(state => state.weather.loading);
  const [selectedTab, setSelectedTab] = useState('all');

  useEffect(() => {
    if (Object.values(coordinates)?.length) {
      dispatch(setLoading(true))
      dispatch(getMainForecastAsync({...coordinates}))
    }
  }, [coordinates])

  // useEffect(() => {
  //   if (weatherByDay?.length) {
  //     setSelectedTab(weatherByDay?.[0]?.[0]?.dt_txt)
  //   }
  // }, [weatherByDay])

  console.log(weatherByDay)

  return (
    <div className='main-forecast-wrapper'>
      <div className='tabs-wrapper flex'>
        <p 
        onClick={() => setSelectedTab('all')} 
        className={`tab ${selectedTab === 'all' ? 'selected' : ''}`}>5-day</p>
        {weatherByDay?.length &&
        weatherByDay?.map((el, index) => {
          return <p 
          onClick={() => setSelectedTab(el?.[0]?.dt_txt)} 
          className={`tab ${selectedTab === el?.[0]?.dt_txt ? 'selected' : ''}`} 
          key={el?.[0]?.dt_txt}>
            {moment(el?.[0]?.dt_txt).format('DD.MM')}
          </p>
        })}
      </div>
      <div className='weekdays-wrapper flex col'>
        {weatherByDay?.length &&
        weatherByDay?.map(data => {
          let type = selectedTab === 'all' ? 'day' : 'hour'
          let selectedDay = data?.find((el, i) => el?.dt_txt === selectedTab)

          if (type === 'hour' && selectedDay) return <WeatherCard data={data} type={type} />
          else if (type === 'day') return <WeatherCard data={data} type={type} />
        })}
        {/* {weatherByDay?.length && weatherByDay?.find(el => moment(el?.[0]?.dt_txt).format('DD.MM') === selectedTab)?.map((data, index) => {
          return <WeatherCard data={data} type={"hour"} />
        })} */}
      </div>
    </div>
  )
}
