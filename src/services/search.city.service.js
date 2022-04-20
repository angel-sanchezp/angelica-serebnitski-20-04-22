import storageService from './storage-service'

import axios from 'axios'
// var axios = Axios.create({
//     withCredentials: true
// })

export const searchCity = {
    getSearchCity,
    getWeather,
    getCurrWeather

}

const KEY='DAILYF'
const CURR_KEY='CURRWEATHER'



async function getSearchCity(city) {
    const STORAGE_KEY =city.city
    let data = storageService.loadFromStorage(STORAGE_KEY)
    if (!data ||STORAGE_KEY!==city.city) {
        const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=kAHfVKXwLN8t95AbnbGv3yG1C82DQbvy&q=${city.city}`)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        return data
    }
    return data 
    // return data = data.filter(dt => dt.LocalizedName === city.city)

}

async function getWeather(key) {
    let data = await storageService.loadFromStorage(KEY) || []
    if (!data.DailyForecasts) {
        const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=kAHfVKXwLN8t95AbnbGv3yG1C82DQbvy`)
        localStorage.setItem(KEY, JSON.stringify(data))
        return data.DailyForecasts
    }
    return data.DailyForecasts
    
    
}

async function getCurrWeather(key){
    let data = await storageService.loadFromStorage(CURR_KEY) || []
    if(!data.length){
        const {data}=await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=kAHfVKXwLN8t95AbnbGv3yG1C82DQbvy`)
        localStorage.setItem(CURR_KEY, JSON.stringify(data))
        return data
    }
    return data


    
}


