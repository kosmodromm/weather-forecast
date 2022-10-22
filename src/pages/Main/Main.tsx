import Icon from '../../components/Icon/Icon';
import React, { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords, IWeather } from '../../api/weatherApi';
import { getDefaultCity } from '../../utils/getDefaultCity';
import CityCard from '../../components/CityCard/CityCard';

const Main = () => {
  const [weatherData, setWeatherData] = useState<IWeather>();

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(async position => {
        const data = await getWeatherByCoords(position.coords);
        setWeatherData(data);
      }, async (error) => {
        const defaultCity = getDefaultCity();
        const data = await getWeatherByCity(defaultCity);
        setWeatherData(data);
        console.error(error);
      });
    } catch (error) {
      throw error;
    } finally {
      if (weatherData) {
        localStorage.setItem('defaultCity', weatherData.city);
      }
    }
  }, []);

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      {
        weatherData &&
        <main className="bg-paper min-h-screen flex flex-col items-center justify-center text-white text-2xl">
          <Icon name="logo" className="width-50 height-50 fill-#487EFF absolute top-1.5 left-auto" />
          <CityCard weatherData={weatherData} />
        </main>
      }
    </div>
  );
};

export default Main;
