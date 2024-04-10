import React from 'react';
import './styles.scss';
import moment from 'moment';

export default function WeatherCard({ data, type }) {
  const dailyData = data[0]
  const hoursData = data
  // console.log(data)
  console.log(hoursData)

  return (
    <div className={`weather-card-wrapper flex ${type === 'hour' ? 'col' : ''}`} key={data?.dt}>
      {type === 'day' ?
      <>
       <h2>{moment(dailyData?.dt_txt).format('DD.MM')}</h2>
       <div className='flex col start'>
         <p className='light'>Temperature: <span className='medium'>{dailyData?.main?.temp}°C</span></p>
         <p className='light'>Description: <span className='medium'>{dailyData?.weather?.[0]?.description}</span></p>
       </div>
       <div className='flex col start'>
         <p className='light'>Feels like : <span className='medium'>{dailyData?.main?.feels_like}°C</span></p>
         <p className='light'>Humidity : <span className='medium'>{dailyData?.main?.humidity}%</span></p>
       </div>
       <div className='flex col start'>
         <p className='light'>Pressure : <span className='medium'>{dailyData?.main?.pressure}</span></p>
         <p className='light'>Wind Speed : <span className='medium'>{dailyData?.wind?.speed}m/s</span></p>
       </div>
      </> 
      : type === 'hour' ?
      hoursData?.map((el, index) => {
        return (
        <div className='weather-card-wrapper wide'>
          <h2 className='light'>{moment(el?.dt_txt).format('DD.MM HH:mm')}</h2>
          <p className='light'>Temperature: <span className='medium'>{el?.main?.temp}°C</span></p>
          <p className='light'>Description: <span className='medium'>{el?.weather?.[0]?.description}</span></p>
          <p className='light'>Feels like : <span className='medium'>{el?.main?.feels_like}°C</span></p>
          <p className='light'>Humidity : <span className='medium'>{el?.main?.humidity}%</span></p>
          <p className='light'>Pressure : <span className='medium'>{el?.main?.pressure}</span></p>
          <p className='light'>Wind Speed : <span className='medium'>{el?.wind?.speed}m/s</span></p>
         </div>)
      })
      : <></>
      } 
    </div>
  )
}