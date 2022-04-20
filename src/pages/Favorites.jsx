import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


export const Favorites = () => {
    const { favLoc } = useSelector(state => state.soldaysModule)


    return (
        <div className="fav-locations-container">
            {favLoc.length?
                <div className="weather-card">
                    <label>{favLoc[0].city[0].LocalizedName}</label>
                    <div className="img-div">
                        <img src={`https://www.accuweather.com/images/weathericons/${favLoc[0].currweather[0].WeatherIcon}.svg`} />
                    </div>
                    <label>{favLoc[0].currweather[0].WeatherText}</label>
                    <label>Date: {moment(favLoc[0].currweather[0].LocalObservationDateTime).format("MMM D")}</label>
                    <label>Temperature: {favLoc[0].currweather[0].Temperature.Imperial.Value}{favLoc[0].currweather[0].Temperature.Imperial.Unit}</label>
                </div>:
                <label>No Favorites Location Found</label>
                }


        </div >
    )
}