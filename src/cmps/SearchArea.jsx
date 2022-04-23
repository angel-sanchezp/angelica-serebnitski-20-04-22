import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { loadNewCity } from '../store/soldays.action'

import { searchCity } from '../services/search.city.service'

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'


export const SearchArea = () => {

    const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState({ city: '' })
    const [isListening, setIsListening] = useState(false)
    const dispatch = useDispatch()



    useEffect(async () => {
        const data = await searchCity.getSearchCity(search)
        setOptions(data)

    }, [search])

    useEffect(() => {
        handleListen()
    }, [isListening])

    const onSearch = ({ target }) => {
        const field = target.name
        const value = target.value
        setSearch(prevSearch => ({ ...prevSearch, [field]: value }))
    }

    const setCity = city => {
        setSearch(prevSearch => ({ ...prevSearch, city: city.LocalizedName }))
        setDisplay(false)
        selectCity(city)
        setIsListening(false)
        setSearch(prevSearchBy => ({ ...prevSearchBy, ['city']: '' }))
    }

    const selectCity = (city) => {
        dispatch(loadNewCity(city))
    }

    const handleListen = () => {
        if (isListening) {
            mic.start()
            mic.onend = () => {
                console.log('continue..')
                mic.start()
            }
        } else {
            mic.stop()
            mic.onend = () => {
                console.log('Stopped Mic on Click')
            }
        }
        mic.onstart = () => {
            console.log('Mics on')
        }

        mic.onresult = event => {
            const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('')
            console.log(transcript)
            setSearch(prevSearchBy => ({ ...prevSearchBy, ['city']: transcript }))
            mic.onerror = event => {
                console.log(event.error)
            }
        }
    }

    return (
        <section>
            <button onClick={() => setIsListening(prevState => !prevState)}>🎙️</button>
            <input type="text"
                onClick={() => setDisplay(!display)}
                name="city"
                placeholder="City"
                className="input-search"
                value={search.city}
                onChange={onSearch} />
            {display && (
                <div className="options-container">
                    {options.length && options.map((city, idx) => {
                        return (
                            <option
                                onClick={() => setCity(city)}
                                key={city.Key}
                                value={idx}>{city.LocalizedName}-{city.Country.LocalizedName}
                            </option>
                        )
                    })}

                </div>
            )}



        </section>
    )

}

