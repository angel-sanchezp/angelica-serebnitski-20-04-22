import storageService from './storage-service'

import axios from 'axios'

export const searchCity = {
    getSearchCity,
    getWeather,
    getCurrWeather,
    getCurrKeyPos

}

async function getSearchCity(city) {
    const STORAGE_KEY =city.city
    let data = storageService.loadFromStorage(STORAGE_KEY)
    if (!data ||STORAGE_KEY!==city.city) {
        const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=DejEihZA2RQaPJ6qxaD0BwYJaBXWGqL6&q=${city.city}`)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        return data
    }
    return data 
}

async function getWeather(key) {
    let data = await storageService.loadFromStorage(`daily${key}`) || []
    if (!data.DailyForecast) {
        const { data } = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=DejEihZA2RQaPJ6qxaD0BwYJaBXWGqL6`)
        localStorage.setItem(`daily${key}`, JSON.stringify(data))
        return data.DailyForecasts
    }
    return data.DailyForecasts
    
    
}

async function getCurrWeather(key){
    let data = await storageService.loadFromStorage(`currWather${key}`) || []
    if(!data.length){
        const {data}=await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=DejEihZA2RQaPJ6qxaD0BwYJaBXWGqL6`)
        localStorage.setItem(`currWather${key}`, JSON.stringify(data))
        return data
    }
    return data    
}

async function getCurrKeyPos(lat,long){
    let {data} =await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=DejEihZA2RQaPJ6qxaD0BwYJaBXWGqL6&q=${lat}%2C${long}`)
    return data 
}


