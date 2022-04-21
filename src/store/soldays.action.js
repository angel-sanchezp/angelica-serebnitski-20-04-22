import {  appService } from '../services/async-storage.service.js'
import { searchCity } from '../services/search.city.service.js';


export function loadCity() {
    return async(dispatch) => {
        try{
            const data =await appService.query();
            console.log(data);
            const currWeather = await searchCity.getCurrWeather(data[0].Key)
            const daily = await searchCity.getWeather(data[0].Key)
            const isFav = await appService.check(data[0].Key)
            const city=[{
                data,
                currWeather,
                daily,
                isFav
            }]
            const action = { type: "SET_CITY", city };
            dispatch(action)
        }catch(err){
            console.log('Cannot load city', err);

        }
    
    }

}

export function loadFav(){
    return async(dispatch) => {
        try{
            const data =await appService.query('FAVLOC');
            console.log(data);
            const action = { type: "SET_FAVLOC", data };
            dispatch(action)
        }catch(err){
            console.log('Cannot load favorites locations', err);

        }
    
    }

}



export function saveFavLoc(city){
    return async(dispatch) => {
        try{
            const data =await appService.post(city);
            const action = { type: "SET_FAVLOC", data };
            dispatch(action)


        }catch(err){
            console.log('Cannot save favorite location', err);

        }
    
    }

}

export function removeFavLoc(key){
    return async(dispatch) => {
        try{
            const data =await appService.remove(key);
            const action = { type: "DELETE_FAVLOC", data };
            dispatch(action)


        }catch(err){
            console.log('Cannot delete favorite location', err);

        }
    
    }
}

export function setCurrCity(data){
    const city=data[0].city
    return async(dispatch) => {
        try{
            const action = { type: "SET_CITY", city };
            dispatch(action)


        }catch(err){
            console.log('Cannot load city', err);

        }
    
    }

}

export function loadNewCity(data){
    return async() => {
        try{
            await appService.save(data);
            loadCity()
        
        }catch(err){
            console.log('Cannot save favorite location', err);

        }
    
    }

}






