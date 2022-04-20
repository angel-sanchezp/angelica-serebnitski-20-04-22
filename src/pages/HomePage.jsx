import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


import { loadCity, saveFavLoc, removeFavLoc } from '../store/soldays.action'

import { SearchArea } from "../cmps/SearchArea"
import { CityDetailsList } from '../cmps/CityDetailsList'


export const HomePage = () => {
    const { city } = useSelector(state => state.soldaysModule)
    const [favIcon, setFavIcon] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCity())

    }, [city.length])


    const saveFav = () => {
        if (!favIcon) {
            dispatch(saveFavLoc(city))
            setFavIcon(true)
        } else {
            console.log('remove');
            dispatch(removeFavLoc(city[0].data[0].Key))
            setFavIcon(false)

        }


    }

    return (
        <div className="home-page-container">
            <section className="search-container">
                <SearchArea />
            </section>

            <section className='daily-container'>
                {city.length ?
                    <div className="location">
                        <h1>{city[0].data[0].LocalizedName}-{city[0].data[0].Country.LocalizedName}</h1>
                        <button onClick={saveFav}>{favIcon || city[0].isFav? '❤️' : '🤍'}</button>
                            <div className="weather-card" style={{ width: '50%', marginLeft: '25%' }}>
                                <div className="img-div">
                                    <img src={`https://www.accuweather.com/images/weathericons/${city[0].currWeather[0].WeatherIcon}.svg`} />
                                </div>
                                <label>{city[0].currWeather[0].WeatherText}</label>
                                <label>Date: {moment(city[0].currWeather[0].LocalObservationDateTime).format("MMM D")}</label>
                                <label>Temperature: {city[0].currWeather[0].Temperature.Imperial.Value}{city[0].currWeather[0].Temperature.Imperial.Unit}</label>
                            </div>
                    </div> :
                    <h1>LODING...</h1>
                }
                {city.length && <CityDetailsList selectedCity={city[0].daily} />}

            </section>


        </div>
    )
}