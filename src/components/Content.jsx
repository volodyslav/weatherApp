import axios from 'axios';
import React, {useState, useEffect} from 'react'

const apiKey = "3d8e662e8e51febc4156267a05c73196"

const Content = ({setErr}) => {
    const [cityName, setCityName] = useState("");
    const [result, setResult] = useState("");
    const [weather, setWeather] = useState("")
    const handleData = async () => {
        try{
            if (cityName.length >= 1){
              const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
                setResult(response.data);
                console.log(response.data)  
                if (response.data.weather && response.data.weather.length > 0){
                    switch (response.data.weather[0].main){
                        case "Clouds":
                            setWeather("☁️");
                            break;
                        case "Thunderstorm":
                            setWeather("⛈️");
                            break;
                        case "Drizzle":
                            setWeather("🌦️");
                            break;
                        case "Rain":
                            setWeather("🌧️");
                            break;
                        case "Snow":
                            setWeather("🌨️");
                            break;
                        case "Clear":
                            setWeather("☀️");
                            break;
                        case "Tornado":
                            setWeather("🌪️");
                            break;
                        default:
                            setWeather("🌫️");
                    } 
                }
                
                setErr("")
            }
            
        }catch(err){
            setErr("Put valid name");
            console.log(err.message)
        }
    }

    
    useEffect(() => {
        handleData()
    }, [])

    return (
        <main className=''>
            <form onSubmit={(e) => e.preventDefault()} className='text-center mx-auto my-4 space-x-4'>
                <input value={cityName} placeholder="Put city's name here" onChange={(e) => setCityName(e.target.value)} className=' ring-1 border border-gray-500 hover:ring-blue-400 p-2 rounded-lg'/>
                <button disabled={cityName.length <= 0} className=' disabled:bg-gray-400  bg-green-800 focus:bg-green-700 hover:bg-green-700 text-white p-2 rounded-lg' onClick={handleData}>Get Weather</button>
            </form>
            {result && result.weather.length > 0 && result.weather &&
            <div className=' border-4 text-center mx-auto w-1/2 my-10 min-h-32 bg-gradient-to-b from-blue-400 from-10%  to-yellow-400 to-90% text-slate-800  space-y-4 rounded-lg shadow-xl font-bold p-5 border-blue-500'>
                <h2 className=' text-2xl'>{result.name}</h2>
                <p className=' text-4xl'><span>{Math.round(parseFloat(result.main.temp) - 273.15)}°C /</span><span> {Math.ceil((parseFloat(result.main.temp) - 273.15) * 9/5 + 32)}°F</span></p>
                <p className=' text-xl'>Feels like: <span>{Math.round(parseFloat(result.main.feels_like) - 273.15)}°C /</span><span> {Math.ceil((parseFloat(result.main.feels_like) - 273.15) * 9/5 + 32)}°F</span></p>
                <p className=' text-xl'>Humidity: { result.main.humidity
} %</p>
                <p className=' text-xl'>Wind speed: { result.wind.speed} m/s</p>
                <p className='  text-center inline-block'><span className='text-3xl '>{ weather}</span><span className='text-2xl'>{ result.weather[0].main 
}</span></p>
                
            </div>}
            

        </main>
    )
}

export default Content