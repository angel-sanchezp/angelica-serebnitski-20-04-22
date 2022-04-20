import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { setCurrCity } from '../store/soldays.action'



export const Favorites = () => {
    const { favLoc } = useSelector(state => state.soldaysModule)
    const dispatch = useDispatch()
    let history = useHistory();
    
    const setCity = () => {
        const city = []
        city.push(favLoc[0])
        dispatch(setCurrCity(city))
        history.push("/");

    }


    return (
        <div className="fav-locations-container">
            {favLoc.length ?
                <div className="weather-card" onClick={setCity}>
                    <label>{favLoc[0].city[0].data[0].LocalizedName}</label>
                    <div className="img-div">
                        <img src={`https://www.accuweather.com/images/weathericons/${favLoc[0].city[0].currWeather[0].WeatherIcon}.svg`} />
                    </div>
                    <label>{favLoc[0].city[0].currWeather[0].WeatherText}</label>
                    <label>Date: {moment(favLoc[0].city[0].currWeather[0].LocalObservationDateTime).format("MMM D")}</label>
                    <label>Temperature: {favLoc[0].city[0].currWeather[0].Temperature.Imperial.Value}{favLoc[0].city[0].currWeather[0].Temperature.Imperial.Unit}</label>
                </div> :
                <label>No Favorites Location Found</label>
            }


        </div >
    )
}