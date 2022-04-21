import { CityPreview } from '../cmps/CityPreview.jsx'

export function CityDetailsList({ selectedCity, unitC, isDarkMode }) {

    return (
        < section className="weather-list">
            {selectedCity.map(dt => <CityPreview key={dt.Key} dt={dt} unitC={unitC} isDarkMode={isDarkMode} />)}
        </section>
    )
}
