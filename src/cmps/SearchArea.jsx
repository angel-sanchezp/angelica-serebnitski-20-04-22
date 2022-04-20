import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { loadNewCity } from '../store/soldays.action'

import { searchCity } from '../services/search.city.service'

export const SearchArea = () => {

    const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState({ city: '' })
    const dispatch = useDispatch()



    useEffect(async () => {
        const data = await searchCity.getSearchCity(search)
        setOptions(data)

    }, [search])


    const onSearch = ({ target }) => {
        const field = target.name
        const value = target.value
        setSearch(prevSearch => ({ ...prevSearch, [field]: value }))
    }


    const setCity = city => {
        console.log(city);
        setSearch(prevSearch => ({ ...prevSearch, city: city.LocalizedName }))
        setDisplay(false)
        selectCity(city)
    }

    const selectCity = (city) => {
        dispatch(loadNewCity(city))


    }

    return (
        <section>
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

