import moment from 'moment'


export function CityPreview({ dt }) {

 
    return (
            <div className="weather-card">
                <div className="img-div">
                <img src={`https://www.accuweather.com/images/weathericons/${dt.Day.Icon}.svg`} />
                </div>
                <label>{dt.Day.IconPhrase}</label>
                <label>Date: {moment(dt.Date).format("MMM D")}</label>
                <label>Temperature Max: {dt.Temperature.Maximum.Value}{dt.Temperature.Maximum.Unit}</label>
                <label>Temperature Min: {dt.Temperature.Minimum.Value}{dt.Temperature.Minimum.Unit} </label>
            </div>
    )
}