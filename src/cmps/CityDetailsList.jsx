import { CityPreview } from '../cmps/CityPreview.jsx'

export function CityDetailsList({selectedCity}) {

    return (
      < section className="weather-list">
            {selectedCity.map(dt => <CityPreview key={dt.Key} dt={dt}/>)}
        </section>
    )
}
