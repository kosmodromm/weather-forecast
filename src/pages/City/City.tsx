import React, { useEffect, useState } from 'react';
import { getDefaultCity } from '../../utils/getDefaultCity';
import Icon from '../../components/Icon/Icon';
import Form from '../../components/Form/Form';
import { getWeatherByCity, IWeather } from '../../api/weatherApi';
import CityCard from '../../components/CityCard/CityCard';

const City = () => {
  const [city, setCity] = useState<string>('');
  const [weatherData, setWeatherData] = useState<IWeather>();

  useEffect(() => {
    const defaultCity = getDefaultCity();
    setCity(defaultCity);
  }, []);

  const handleSearch = async () => {
    const weather = await getWeatherByCity(city);
    setWeatherData(weather);
  };

  return (
    weatherData && <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="bg-orange-400 min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <Icon name="logo" className="width-50 height-50 fill-#487EFF" />
        <Form setCity={setCity} city={city} handleSearch={handleSearch} />
        <CityCard weatherData={weatherData} />
        <div>{city}</div>
        <div>{weatherData.tempNow}</div>
      </main>
    </div>
  );
};

export default City;
