import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { TypingAnimation } from '../cmps/TypingAnimation'
import { CSSTransition } from 'react-transition-group';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import { loadCity, saveFavLoc, removeFavLoc, loadFav, toggleFav } from '../store/soldays.action'

import { SearchArea } from "../cmps/SearchArea"
import { CityDetailsList } from '../cmps/CityDetailsList'



export const HomePage = () => {
    const { city } = useSelector(state => state.soldaysModule)
    const { isFav } = useSelector(state => state.soldaysModule)
    const [unitC, setUnitC] = useState(false)
    const [isDarkMode, setDarkMode] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadCity())
        dispatch(loadFav())

    }, [])

    const notifySaved = () => toast.success("Location saved!", {
        theme: "dark"
    });
    const notifyRemoved = () => toast.success("Location removed!", {
        theme: "dark"
    });


    const saveFav = () => {
        if (isFav) {
            dispatch(removeFavLoc(city[0].data[0].Key))
            dispatch(toggleFav(false))
            notifyRemoved()
        } else {
            dispatch(saveFavLoc(city))
            dispatch(toggleFav(true))
            notifySaved()
        }


    }


    const toggelUnit = () => {
        setUnitC(!unitC)
    }

    const toggelDarkMode = () => {
        setDarkMode(!isDarkMode)
    }

    return (
        <div className="home-page-container">
            <section className="search-container">
                <SearchArea />
            </section>
            <CSSTransition
                in={true}
                appear={true}
                timeout={1000}
                classNames="fade"
            >
                <section className='daily-container'>
                    {city.length ?
                        <div className="location">
                            <div className="typing-container">
                                <TypingAnimation />
                                <h1>{city[0].data[0].LocalizedName}-{city[0].data[0].Country.LocalizedName}</h1>
                            </div>
                            <div className="btns-actions">
                                <button onClick={saveFav}>{isFav ? '❤️' : '🤍'}</button>
                                <button onClick={toggelUnit}>{!unitC ? 'C🌡️' : 'F🌡️'}</button>
                                <button onClick={toggelDarkMode}>{!isDarkMode ? 'Ligth' : 'Dark'}</button>
                            </div>

                            <div className="weather-card" style={!isDarkMode ? { backgroundColor: 'rgba(49, 62, 76, 0.68)', color: 'whitesmoke', width: '50%' } : { backgroundColor: 'rgb(224 228 220 / 50%)', color: 'black', width: '50%' }}>
                                <div className="img-div">
                                    <img src={`https://www.accuweather.com/images/weathericons/${city[0].currWeather[0].WeatherIcon}.svg`} />
                                </div>
                                <label>{city[0].currWeather[0].WeatherText}</label>
                                <label>Date: {moment(city[0].currWeather[0].LocalObservationDateTime).format("MMM D")}</label>
                                <CSSTransition
                                    in={true}
                                    appear={true}
                                    timeout={1000}
                                    classNames="fade"
                                >
                                    {!unitC ? <label>Temperature: {city[0].currWeather[0].Temperature.Imperial.Value}{city[0].currWeather[0].Temperature.Imperial.Unit}</label> :
                                        <label>Temperature: {city[0].currWeather[0].Temperature.Metric.Value}{city[0].currWeather[0].Temperature.Metric.Unit}</label>}
                                </CSSTransition>
                            </div>
                        </div> :
                        <h1>LODING...</h1>
                    }

                    {city.length && <CityDetailsList selectedCity={city[0].daily} unitC={unitC} isDarkMode={isDarkMode} />}
                    <ToastContainer />

                </section>
            </CSSTransition>
        </div>
    )
}