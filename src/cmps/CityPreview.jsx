import moment from 'moment'
import React from 'react';


export function CityPreview({ dt, unitC , isDarkMode}) {

    return (
        <div className="weather-card" style={!isDarkMode? {backgroundColor:'rgba(49, 62, 76, 0.68)', color:'whitesmoke' }:{backgroundColor:'#e0e4dcbf', color:'black'}}>
            <div className="img-div">
                <img src={`https://www.accuweather.com/images/weathericons/${dt.Day.Icon}.svg`} />
            </div>
            <label>{dt.Day.IconPhrase}</label>
            <label>Date: {moment(dt.Date).format("MMM D")}</label>
            {!unitC ? <React.Fragment>
                <label>Temperature Max: {dt.Temperature.Maximum.Value}{dt.Temperature.Maximum.Unit}</label>
                <label>Temperature Min: {dt.Temperature.Minimum.Value}{dt.Temperature.Minimum.Unit} </label>
            </React.Fragment> :
                <React.Fragment>
                    <label>Temperature Max: {((dt.Temperature.Maximum.Value-32)*5/9).toFixed(2)}-C</label>
                    <label>Temperature Min: {((dt.Temperature.Maximum.Value-32)*5/9).toFixed(2)}-C</label>
                </React.Fragment>
            }
        </div>
    )
}