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
    
    };

}




