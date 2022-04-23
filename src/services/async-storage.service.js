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

const gFavLoc = [
    {
        key: "178087",
        city: [{
            currWeather: [{
                LocalObservationDateTime: "20-04-20T10:18:00+03:00",
                WeatherIcon: 4,
                WeatherText: "Clouds and sun",
                Temperature: { Imperial: { Unit: "F", Value: "68" }, Metric: { Unit: "C", Value: "19.9" } }
            }],
            daily: [
                {
                    Date: "2022-04-19T07:00:00+03:00",
                    Day: [{ Icon: 4, IconPhrase: "Intermittent clouds" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "68" } }, { Minimum: { Unit: "F", Value: "58" } }]
                },
                {
                    Date: "2022-04-20T07:00:00+03:00",
                    Day: [{ Icon: 2, IconPhrase: "Mostly sunny" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "70" } }, { Minimum: { Unit: "F", Value: "70" } }]
                },
                {
                    Date: "2022-04-21T07:00:00+03:00",
                    Day: [{ Icon: 2, IconPhrase: "Mostly sunny" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "71" } }, { Minimum: { Unit: "F", Value: "69" } }]
                },
                {
                    Date: "2022-04-22T07:00:00+03:00",
                    Day: [{ Icon: 4, IconPhrase: "Intermittent clouds" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "65" } }, { Minimum: { Unit: "F", Value: "60" } }]
                },
                {
                    Date: "2022-04-23T07:00:00+03:00",
                    Day: [{ Icon: 6, IconPhrase: "Mostly cloud" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "62" } }, { Minimum: { Unit: "F", Value: "59" } }]
                }
            ],
            data:[{
                Country:{LocalizedName:"Germany"},
                Key:"178087",
                LocalizedName:"Berlin",
                Rank:10
            }],
            isFav:true,
            _id:"c3ZxM"

        }]
    },
    {
        key: "215854",
        city: [{
            currWeather: [{
                LocalObservationDateTime: "20-04-20T10:18:00+03:00",
                WeatherIcon: 4,
                WeatherText: "Clouds and sun",
                Temperature: { Imperial: { Unit: "F", Value: "68" }, Metric: { Unit: "C", Value: "19.9" } }
            }],
            daily: [
                {
                    Date: "2022-04-19T07:00:00+03:00",
                    Day: [{ Icon: 4, IconPhrase: "Intermittent clouds" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "72" } }, { Minimum: { Unit: "F", Value: "61" } }]
                },
                {
                    Date: "2022-04-20T07:00:00+03:00",
                    Day: [{ Icon: 2, IconPhrase: "Mostly sunny" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "70" } }, { Minimum: { Unit: "F", Value: "58" } }]
                },
                {
                    Date: "2022-04-21T07:00:00+03:00",
                    Day: [{ Icon: 2, IconPhrase: "Mostly sunny" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "71" } }, { Minimum: { Unit: "F", Value: "60" } }]
                },
                {
                    Date: "2022-04-22T07:00:00+03:00",
                    Day: [{ Icon: 4, IconPhrase: "Intermittent clouds" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "80" } }, { Minimum: { Unit: "F", Value: "65" } }]
                },
                {
                    Date: "2022-04-23T07:00:00+03:00",
                    Day: [{ Icon: 6, IconPhrase: "Mostly cloud" }],
                    Temperature: [{ Maximum: { Unit: "F", Value: "77" } }, { Minimum: { Unit: "F", Value: "62" } }]
                }
            ],
            data:[{
                Country:{LocalizedName:"Israel"},
                Key:"215854",
                LocalizedName:"Tel Aviv",
                Rank:31
            }],
            isFav:true,
            _id:"jbckj"

        }]
    }
]

async function query() {
    const data = await storageService.loadFromStorage(STORAGE_KEY) || _getPosition()
    return data

}

async function queryFav() {
    var entities = await storageService.loadFromStorage(FAVLOC_KEY)|| _getDeaultFavLoc()
    return entities

}

async function save(data) {
    var city = await storageService.loadFromStorage(STORAGE_KEY)
    city[0] = data
    storageService.saveToStorage(STORAGE_KEY, city)

}


async function post(city) {
    let location = {
        _id: utilService.makeId(),
        Key: city[0].data[0].Key,
        city
    }
    const favLocs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    favLocs.unshift(location)
    storageService.saveToStorage(FAVLOC_KEY, favLocs)
    return location


}

async function remove(favLovKey) {
    let locs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    const idx = locs.findIndex(loc => loc.Key === favLovKey)
    locs.splice(idx, 1)
    storageService.saveToStorage(FAVLOC_KEY, locs)
    return favLovKey
}


async function check(key) {
    const favLocs = await storageService.loadFromStorage(FAVLOC_KEY) || []
    const fav = favLocs.find(loc => loc.Key === key)
    return fav ? true : false
}


async function _getPosition() {
    let city = []
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    const lat = pos.coords.latitude
    const long = pos.coords.longitude

    const data = await searchCity.getCurrKeyPos(lat, long)
    city.push(data)
    storageService.saveToStorage(STORAGE_KEY, city)

    return city

}

function _getDeaultFavLoc(){
    return gFavLoc
}
