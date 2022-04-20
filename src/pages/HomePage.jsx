import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


import { searchCity } from '../services/search.city.service'
import { loadCity, saveFavLoc } from '../store/soldays.action'

import { SearchArea } from "../cmps/SearchArea"
import { CityDetailsList } from '../cmps/CityDetailsList'


export const HomePage = () => {
    const { city } = useSelector(state => state.soldaysModule)
    const [daily, setForecast] = useState([])
    const [currWeather, setCurrWeather] = useState([])
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadCity())
        if (city.length) {
            getCurrWeather()
            getWeather()
        }

    }, [])

    const getWeather = async () => {
        const daily = await searchCity.getWeather(city[0].Key)
        setForecast(daily)
    }

    const getCurrWeather = async () => {
        const currWeather = await searchCity.getCurrWeather(city[0].Key)
        setCurrWeather(currWeather)

    }

    const saveFav=()=>{
        dispatch(saveFavLoc(currWeather))
    }


    return (
        <div className="home-page-container">
            <section className="search-container">
                <SearchArea />
            </section>

            <section className='daily-container'>
                {city.length &&
                    <div className="location">
                        <h1>{city[0].LocalizedName}-{city[0].Country.LocalizedName}</h1>
                        <button onClick={saveFav}>🤍</button>
                        {currWeather.length &&
                            <div className="weather-card" style={{width:'50%', marginLeft:'25%'}}>
                                <div className="img-div">
                                    <img src={`https://www.accuweather.com/images/weathericons/${currWeather[0].WeatherIcon}.svg`} />
                                </div>
                                <label>{currWeather[0].WeatherText}</label>
                                <label>Date: {moment(currWeather[0].LocalObservationDateTime).format("MMM D")}</label>
                                <label>Temperature: {currWeather[0].Temperature.Imperial.Value}{currWeather[0].Temperature.Imperial.Unit}</label>
                            </div>}
                    </div> }
                {daily.length && <CityDetailsList selectedCity={daily} />}

            </section>


        </div>
    )
}