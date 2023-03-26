import Pop from "../Icons/Pop"
import Pressure from "../Icons/Pressure"
import Visibility from "../Icons/Visibility"
import Wind from "../Icons/Wind"
import Humidity from "../Icons/Humidity"
import Feels from "../Icons/Feels"

type Props = {
    icon: 'feels' | 'humidity' | 'pop' | 'pressure' | 'visibility' | 'wind'
    title: string
    info: string | JSX.Element
    description: string
}

const icons = {
    feels: Feels,
    humidity: Humidity,
    pop: Pop,
    pressure: Pressure,
    visibility: Visibility,
    wind: Wind,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
    const Icon = icons[icon]


    return (
        <article className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between">
            <div className="flex items-center text-sm font-bold">
                <Icon />
                <h4 className="flex items-center text-sm font-bold ml-2">{title}</h4>
            </div>
            <h4 className="mt-2 text-lg text-center">{info}</h4>
            <p className="text-xs font-bold text-center">{description}</p>
        </article>
)

}

export default Tile