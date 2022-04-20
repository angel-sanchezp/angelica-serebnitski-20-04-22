import {  appService } from '../services/async-storage.service.js'


export function loadCity() {
    return async(dispatch) => {
        try{
            const data =await appService.query();
            const action = { type: "SET_CITY", data };
            dispatch(action)


        }catch(err){
            console.log('Cannot load city', err);

        }
    
    }

}

export function saveFavLoc(currweather,city,daily){
    return async(dispatch) => {
        try{
            const data =await appService.post(currweather,city, daily);
            console.log(data);
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
            console.log(data);
            const action = { type: "DELETE_FAVLOC", data };
            dispatch(action)


        }catch(err){
            console.log('Cannot delete favorite location', err);

        }
    
    }
}

export function setCurrCity(data){
    return async(dispatch) => {
        try{
            const action = { type: "SET_CITY", data };
            dispatch(action)


        }catch(err){
            console.log('Cannot load city', err);

        }
    
    }

}





