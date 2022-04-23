import { appService } from '../services/async-storage.service.js'
import { searchCity } from '../services/search.city.service.js';


export function loadCity() {
    return async (dispatch) => {
        try {
            console.log('hi here');
            const data = await appService.query();
            dispatch(checkIsFav(data[0].Key))
            const currWeather = await searchCity.getCurrWeather(data[0].Key)
            const daily = await searchCity.getWeather(data[0].Key)
            const city = [{
                data,
                currWeather,
                daily,
            }]
            const action = { type: "SET_CITY", city };
            dispatch(action)
        } catch (err) {
            console.log('Cannot load city', err);

        }

    }

}

function checkIsFav(key) {
    return async (dispatch) => {
        try {
            const isFav=await appService.check(key)
            const action = { type: "SET_ISFAV", isFav };
            dispatch(action)
        } catch (err) {
            console.log('Cannot check if is favotite location', err);

        }

    }

}

export function toggleFav(isFav){
    return async (dispatch) => {
        try {
            const action = { type: "SET_ISFAV", isFav };
            dispatch(action)
        } catch (err) {
            console.log('Cannot set isfav', err);

        }

    }
}

export function loadFav() {
    return async (dispatch) => {
        try {
            const data = await appService.queryFav();
            const action = { type: "SET_FAVLOC", data };
            dispatch(action)
        } catch (err) {
            console.log('Cannot load favorites locations', err);

        }

    }

}



export function saveFavLoc(city) {
    return async (dispatch) => {
        try {
            const data = await appService.post(city);
            const action = { type: "SAVE_FAVLOC", data };
            dispatch(action)


        } catch (err) {
            console.log('Cannot save favorite location', err);

        }

    }

}

export function removeFavLoc(key) {
    return async (dispatch) => {
        try {
            const data = await appService.remove(key);
            const action = { type: "DELETE_FAVLOC", data };
            dispatch(action)
            dispatch(loadFav())
        } catch (err) {
            console.log('Cannot delete favorite location', err);

        }

    }
}


export function loadNewCity(data) {
    return async (dispatch) => {
        try {
            await appService.save(data);
            dispatch(loadCity())

        } catch (err) {
            console.log('Cannot save favorite location', err);

        }

    }

}






