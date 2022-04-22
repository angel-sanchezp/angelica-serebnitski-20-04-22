import storageService from "./storage-service";
import { searchCity } from "./search.city.service";
import { utilService } from "./util-service";
export const appService = {
    query,
    remove,
    post,
    check,
    save,
    queryFav
}

const STORAGE_KEY = 'SOLDAYSDB'
const FAVLOC_KEY = 'FAVLOC'

async function query() {
    var entities = await storageService.loadFromStorage(STORAGE_KEY) || getPosition()
    console.log(entities);
    return entities

}


async function queryFav() {
    var entities = await storageService.loadFromStorage(FAVLOC_KEY) 
    console.log(entities);
    return entities

}

async function save(data){
    var city = await storageService.loadFromStorage(STORAGE_KEY)
    city[0]=data
    storageService.saveToStorage(STORAGE_KEY, city)

}


async function post(city) {
    let location = {
        _id: utilService.makeId(),
        isFav: true,
        Key: city[0].data[0].Key,
        city
    }
    const favLocs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    favLocs.unshift(location)
    storageService.saveToStorage(FAVLOC_KEY, favLocs)
    return favLocs


}

async function remove(favLovKey) {
    let locs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    const idx = locs.findIndex(loc => loc.Key === favLovKey)
    locs.splice(idx, 1)
    storageService.saveToStorage(FAVLOC_KEY, locs)
    return locs
}


async function check(key) {
    const favLocs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    const fav = favLocs.find(loc => loc.Key === key)
    return fav ? true : false
}




async function getPosition() {
    let city=[]
    const pos= await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const lat=pos.coords.latitude
    const long=pos.coords.longitude

    const data= await searchCity.getCurrKeyPos(lat,long)
    city.push(data)
    storageService.saveToStorage(STORAGE_KEY, city)

    return city
   
}
