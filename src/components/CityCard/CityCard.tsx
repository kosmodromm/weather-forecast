import { IWeather } from '../../api/weatherApi';
import { useCallback } from 'react';

interface IProps {
  weatherData: IWeather,
  linkTo?: (city: string) => void
}

const CityCard = ({ weatherData, linkTo }: IProps) => {
  const handleClick = useCallback(() => {
    if (linkTo) {
      linkTo(weatherData.city);
    }
  }, [linkTo, weatherData.city]);

  return (
    <div className="flex justify-center">
      <div className="rounded-lg
                      shadow-lg
                      bg-transparent
                      backdrop-blur-sm
                      max-w-sm
                      min-w-[320px]
                      cursor-pointer
                      hover:bg-[#FFF8E6]
                      hover:rounded-lg
                      hover:shadow-2xl
                      transition-all"
           onClick={handleClick}
      >
        <div className="flex justify-center flex-col p-3">
            <img className="rounded-t-lg m-auto pb-5" src={weatherData.iconNow}
                 alt={weatherData.text}
            />
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
