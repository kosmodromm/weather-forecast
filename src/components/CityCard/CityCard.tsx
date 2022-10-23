import { useCallback, useMemo } from 'react';
import { IWeather } from '../../types/types';

interface IProps {
  weatherData: IWeather,
  linkTo?: (city: string) => void,
  hourly?: boolean
  days?: number
}

const CityCard = ({ weatherData, linkTo, hourly, days = 3 }: IProps) => {
  const handleClick = useCallback(() => {
    if (linkTo) {
      linkTo(weatherData.city);
    }
  }, [linkTo, weatherData.city]);

  const dailyForecast = useMemo(() => {
    const content = weatherData.weatherForecast.map(
      (day, index) => {
        if (index <= days && index !== 0) {
          return <div key={index}
                      className="flex
                    justify-center
                    items-center
                    flex-row
                    border-t
                    text-base
                    p-1"
          >
            <p className="p-5 flex-grow">{day.date}</p>
            <p className="p-2">{day.temp}</p>
            <img
              className="rounded-t-lg m-auto pl-2"
              src={day.iconUrl}
              alt={day.text}
            />
          </div>;
        }
      }
    );
    return content;
  }, [weatherData, days]);

  const hourlyForecast = useMemo(() => {
    const content = weatherData.weatherForecast[0].hour.map(
      (hour, index) => {
        return <div key={index}
                    className="flex
                  flex-col
                  justify-center
                  text-sm
                  p-3
                  border-r
                  last:border-none"
        >
          <div className="pb-2">{hour.time}</div>
          <div className="flex justify-center items-center pr-2 pl-2">
            <p className="text-sm">{hour.temp}</p>
            <img src={hour.icon} alt={hour.text} className="pl-1" />
          </div>
        </div>;
      }
    );
    return content;
  }, [weatherData]);

  return (
    <div className="flex justify-center">
      <div className="flex
                      flex-col
                      rounded-lg
                      shadow-lg
                      bg-transparent
                      backdrop-blur-sm
                      max-w-sm
                      min-w-[320px]
                      max-h-[520px]
                      cursor-pointer
                      hover:bg-[#FFF8E6]
                      hover:rounded-lg
                      hover:shadow-2xl
                      transition-all
                      overflow-hidden"
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
          <div className="flex overflow-x-auto max-w-full"
          >
            {hourly && hourlyForecast}
          </div>
          <div className="flex flex-col overflow-y-auto max-h-[220px]">
            {dailyForecast}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
