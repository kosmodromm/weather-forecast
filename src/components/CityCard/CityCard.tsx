import { IWeather } from '../../api/weatherApi';

interface IProps {
  weatherData: IWeather
}

const CityCard = ({ weatherData }: IProps) => {
  return (
    <div className="flex justify-center ">
      <div className="rounded-lg shadow-lg bg-transparent backdrop-blur-sm max-w-sm">
        {/*todo make navigation to city page with router*/}
        <div className="flex justify-center flex-col">
          <a href="#!">
            <img className="rounded-t-lg m-auto" src={weatherData.iconNow} alt="" />
          </a>
          <div className="flex justify-center flex-row">
            <div>
              {weatherData.tempNow}
            </div>
            <div className="p-6">
              <h5 className="text-xl font-medium mb-2">{weatherData.city}</h5>
              <p>{weatherData.weatherForecast[0].date}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-center flex-row">
            <p>{weatherData.weatherForecast[1].date}</p>
            <p>{weatherData.weatherForecast[1].temp}</p>
            <img className="rounded-t-lg m-auto" src={weatherData.weatherForecast[1].iconUrl} alt="" />
          </div>
          <div className="flex justify-center flex-row">
            <p>{weatherData.weatherForecast[2].date}</p>
            <p>{weatherData.weatherForecast[2].temp}</p>
            <img className="rounded-t-lg m-auto" src={weatherData.weatherForecast[2].iconUrl} alt="" />
          </div>
          <div className="flex justify-center flex-row">
            <p>{weatherData.weatherForecast[3].date}</p>
            <p>{weatherData.weatherForecast[3].temp}</p>
            <img className="rounded-t-lg m-auto" src={weatherData.weatherForecast[3].iconUrl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
