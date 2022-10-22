import React, { useEffect, useState } from 'react';
import { getDefaultCity } from '../../utils/getDefaultCity';
import Icon from '../../components/Icon/Icon';
import Form from '../../components/Form/Form';
import { getWeatherByCity, IWeather } from '../../api/weatherApi';
import CityCard from '../../components/CityCard/CityCard';
import { useNavigate, useParams } from 'react-router-dom';

const City = () => {
  const [weatherData, setWeatherData] = useState<IWeather>();

  const { city } = useParams();

  useEffect(() => {
    // search weather in city if it in link
    if (city) {
      handleSearch(city);
    } else {
      const defaultCity = getDefaultCity();
      handleSearch(defaultCity);
    }
  }, []);

  const handleSearch = async (city: string): Promise<void> => {
    const weather = await getWeatherByCity(city);
    setWeatherData(weather);
  };

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      {weatherData &&
        <main className="bg-paper min-h-screen flex flex-col items-center justify-center text-white text-2xl">
          <Icon name="logo" className="width-50 height-50 fill-#487EFF pb-5" />
          <Form handleSearch={handleSearch}/>
          <CityCard weatherData={weatherData} />
        </main>}
    </div>
  );
};

export default City;
