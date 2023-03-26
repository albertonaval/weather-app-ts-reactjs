import { getHumidityValue, getPop, getSunTime, getVisibilityValue, getWindDirection } from "../../helpers"
import { forecastType } from "../../types"
import Sunrise from "../Icons/Sunrise"
import Sunset from "../Icons/Sunset"
import Tile from "../TileComponents/Tile"

type Props = {
    forecast: forecastType
}

const Degree = ({ temp }: {temp: number}): JSX.Element => (
    <span>
        {temp} <sup>º</sup>
    </span>
)


const Forecast = ({ forecast }: Props): JSX.Element => {
    const today = forecast.list[0]

    return (
        <div className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full
        lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg">
            <div className="mx-auto w-[300px]">
                <section className="text-center">
                    <h2 className="text-2xl font-black">{forecast.name}
                        <span className="font-thin">  {forecast.country}</span>
                    </h2>
                    <h1 className="text-4xl font-extrabold">
                        <Degree temp={Math.round(today.main.temp)} />
                    </h1>
                    <p className="text-sm">
                        {today.weather[0].main} {today.weather[0].description}
                    </p>
                    <p className="text-sm">
                        H:<Degree temp={Math.ceil(today.main.temp_max)} />
                        {'         '}
                        L:<Degree temp={Math.floor(today.main.temp_min)} />
                    </p>
                </section>
                <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
                    {forecast.list.map((elm, idx) => (
                        <div className='inline-block text-center flex-shrink-0' key={idx}>
                            <p className="text-sm">{idx === 0 ? 'Now' : new Date(elm.dt * 1000).getHours() + ':00'}</p>
                            <img alt={`weather-icon-${elm.weather[0].description}`} src={`http://openweathermap.org/img/wn/${elm.weather[0].icon}@2x.png`} />
                            <p className="text-sm font-bold">
                                <Degree temp={Math.round(elm.main.temp)} />
                            </p>
                        </div>
                    ))}
                </section>
                <section className="flex flex-wrap justify-between text-zinc-700">
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                        <Sunrise />
                        <span className="mt-2">
                        {getSunTime(forecast.sunrise)}
                        </span>
                    </div>
                    <div className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5">
                        <Sunset />
                        <span className="mt-2">
                            {getSunTime(forecast.sunset)}
                        </span>
                    </div>
                    <Tile
                        icon="wind"
                        title="Wind"
                        info={`${Math.round(today.wind.speed)} km/h`}
                        description={`
                        ${getWindDirection(Math.round(today.wind.deg))},
                        gust ${today.wind.gust.toFixed(1)} km/h`}
                    />
                    <Tile
                        icon="feels"
                        title="Feels Like"
                        info={<Degree temp={Math.round(today.main.feels_like)} />}
                        description={`Feels ${Math.round(today.main.feels_like) < Math.round(today.main.temp)
                                ? 'colder'
                                : 'warn'}`}
                    />
                    <Tile
                        icon="humidity"
                        title="Humidity"
                        info={`${today.main.humidity} %`}
                        description={getHumidityValue(Math.round(today.main.humidity))}
                    />
                    <Tile
                        icon="pop"
                        title="Precipition"
                        info={`${Math.round(today.pop * 1000)} %`}
                        description={`${getPop(today.pop)},
                        clouds at ${today.clouds.all} %`}
                    />
                    <Tile
                        icon="pressure"
                        title="Pressure"
                        info={`${Math.round(today.main.pressure)} hPa`}
                        description={`${Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higuer'} than standard`}
                    />
                    <Tile
                        icon="visibility"
                        title="Visibility"
                        info={`${(today.visibility / 1000).toFixed()} Km/h`}
                        description={`${getVisibilityValue(today.visibility)}`}
                    />
                </section>
            </div>
        </div>
    )


}

export default Forecast