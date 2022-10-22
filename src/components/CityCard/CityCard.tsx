import { IWeather } from '../../api/weatherApi';

interface IProps {
  weatherData: IWeather
}

const CityCard = ({ weatherData }: IProps) => {
  return (
    <div className="flex justify-center ">
      <div className="rounded-lg shadow-lg bg-transparent backdrop-blur-sm max-w-sm">
        {/*todo make navigation to city page with router*/}
        <div className="flex justify-center flex-col p-3">
          <a href="#!">
            <img className="rounded-t-lg m-auto" src={weatherData.iconNow}
                 alt={weatherData.text}
            />
          </a>
          <div className="flex justify-center flex-row">
            <div className="border-r p-3 text-4xl">
              {weatherData.tempNow}
            </div>
            <div className="pl-4">
              <h5 className="text-xl font-medium mb-2">{weatherData.city}</h5>
              <p className="text-sm">{weatherData.weatherForecast[0].date}</p>
            </div>
          </div>
        </div>
        <div className="m-3">
          <div className="flex justify-center items-center flex-row border-t text-base p-1">
            <p className="p-5 flex-grow">{weatherData.weatherForecast[1].date}</p>
            <p className="p-2">{weatherData.weatherForecast[1].temp}</p>
            <img className="rounded-t-lg m-auto pl-2" src={weatherData.weatherForecast[1].iconUrl} alt={weatherData.weatherForecast[1].text} />
          </div>
          <div className="flex justify-center items-center flex-row border-t text-base p-1">
            <p className="p-5 flex-grow">{weatherData.weatherForecast[2].date}</p>
            <p className="p-2">{weatherData.weatherForecast[2].temp}</p>
            <img className="rounded-t-lg m-auto pl-2" src={weatherData.weatherForecast[2].iconUrl} alt={weatherData.weatherForecast[2].text} />
          </div>
          <div className="flex justify-center items-center flex-row border-t text-base p-1">
            <p className="p-5 flex-grow">{weatherData.weatherForecast[3].date}</p>
            <p className="p-2">{weatherData.weatherForecast[3].temp}</p>
            <img className="rounded-t-lg m-auto pl-2" src={weatherData.weatherForecast[3].iconUrl} alt={weatherData.weatherForecast[3].text} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
