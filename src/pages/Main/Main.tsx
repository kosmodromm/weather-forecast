import Icon from '../../components/Icon/Icon';
import React, { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords, IWeatherDTO } from '../../api/weatherApi';
import { getDefaultCity } from '../../utils/getDefaultCity';
import CityCard from '../../components/CityCard/CityCard';

const Main = () => {
  const [weatherData, setWeatherData] = useState<IWeatherDTO>();

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
        localStorage.setItem('defaultCity', weatherData.location.name);
      }
    }
  }, []);

  console.log(weatherData);

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      {weatherData &&
        <main className="bg-[#faf6ec] min-h-screen flex flex-col items-center justify-center text-white text-2xl">
          <Icon name="logo" className="width-50 height-50 fill-#487EFF absolute top-1.5 left-auto" />
          <CityCard city={weatherData.location.name} iconCode="iconurl.com" />
        </main>}
    </div>
  );
};

export default Main;
