import storageService from "./storage-service";
export const appService = {
    query,
    remove,
    get,
    post,
    put,
    check,
    save,
    queryFav
}

const STORAGE_KEY = 'SOLDAYSDB'
const FAVLOC_KEY = 'FAVLOC'


const gCity = [
    {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
        }
    }
]

async function query() {
    var entities = await storageService.loadFromStorage(STORAGE_KEY) || _createCity()
    console.log(entities);
    return entities

}


async function queryFav() {
    var entities = await storageService.loadFromStorage(FAVLOC_KEY) 
    console.log(entities);
    return entities

}


// function get(entityType, entityId) {
//     return query(entityType)
//         .then(entities => entities.find(entity => entity._id === entityId))
// }

async function save(data){
    var city = await storageService.loadFromStorage(STORAGE_KEY)
    city[0]=data
    storageService.saveToStorage(STORAGE_KEY, city)

}


async function post(city) {
    let location = {
        _id: _makeId(),
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


function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}


function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _createCity() {
    let city = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    if (!city || !city.length) {
        city = gCity
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(city))
    return city;
}


