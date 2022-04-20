import storageService from "./storage-service";
export const appService = {
    query,
    remove,
    get,
    post,
    put,
}

const STORAGE_KEY = 'SOLDAYSDB'


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
     console.log('hi from async service query');

    var entities =  await storageService.loadFromStorage(STORAGE_KEY) || _createCity()
    return entities
  
}


// function get(entityType, entityId) {
//     return query(entityType)
//         .then(entities => entities.find(entity => entity._id === entityId))
// }


function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
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

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
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


