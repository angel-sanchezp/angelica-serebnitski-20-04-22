import React, { useEffect, useState, useRef } from "react";
import { searchCity } from "../services/search.city.service";


export const SearchArea = () => {

    const [display, setDisplay] = useState(false)
    const [options, setOptions] = useState([])
    const [search, setSearch] = useState({ city: '' })


    useEffect(async () => {
        let data = await searchCity.getSearchCity(search)
        setOptions(data)

    }, [search])


    const onSearch = ({ target }) => {
        console.log(target.value)
        const field = target.name
        const value = target.value
        setSearch(prevSearch => ({ ...prevSearch, [field]: value }))
    }


    const setCity = city => {
        console.log(city);
        setSearch(prevSearch => ({ ...prevSearch, city: city.LocalizedName }))
        setDisplay(false)

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

