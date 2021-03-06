import React from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { CSSTransition } from 'react-transition-group';
import { Rings } from 'react-loader-spinner'

import { loadNewCity } from '../store/soldays.action'



export const Favorites = () => {
    const { favLoc } = useSelector(state => state.soldaysModule)
    const dispatch = useDispatch()
    let history = useHistory();

    const setCity = (loc) => {
        dispatch(loadNewCity(loc.city[0].data[0]))
        history.push("/");
    }


    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={1000}
            classNames="fade"
        >
            <section className="weather-list">
                    {favLoc.length ? favLoc.map((loc) => (
                        <div className="weather-card" style={{color:"whitesmoke"}} onClick={() => setCity(loc)}>
                            <label>{loc.city[0].data[0].LocalizedName}</label>
                            <div className="img-div">
                                <img src={`https://www.accuweather.com/images/weathericons/${loc.city[0].currWeather[0].WeatherIcon}.svg`} />
                            </div>
                            <label>{loc.city[0].currWeather[0].WeatherText}</label>
                            <label>Date: {moment(loc.city[0].currWeather[0].LocalObservationDateTime).format("MMM D")}</label>
                            <label>Temperature: {loc.city[0].currWeather[0].Temperature.Imperial.Value}{loc.city[0].currWeather[0].Temperature.Imperial.Unit}</label>
                        </div>
                    )) :
                        <div className='loader'><Rings color="#fc8345" height={110} width={110} /> </div>

                    }
            </section>


        </CSSTransition>

    )
}