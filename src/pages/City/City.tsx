import React, { useEffect, useState } from 'react';
import { getDefaultCity } from '../../utils/getDefaultCity';
import Icon from '../../components/Icon/Icon';
import Form from '../../components/Form/Form';
import { getWeatherByCity, IWeather } from '../../api/weatherApi';
import CityCard from '../../components/CityCard/CityCard';
import { Link, useParams } from 'react-router-dom';
import Path from '../../constants/Path';
import Loader from '../../components/Loader/Loader';

const City: React.FC = () => {
  const DAYS = 10;
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
    if (weatherData && city !== weatherData.city) {
      setWeatherData(undefined);
    }

    const weather = await getWeatherByCity(city);
    setWeatherData(weather);
  };

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="bg-paper min-h-screen flex flex-col items-center justify-center text-white text-2xl">
        <Link to={Path.Main}>
          <Icon name="logo" className="width-50 height-50 fill-[#FF8F40] pb-5" />
        </Link>
        <Form handleSearch={handleSearch} />
        {
          weatherData
            ? <>
              <CityCard weatherData={weatherData} linkTo={handleSearch} days={DAYS} hourly/>
            </>
            : <Loader />
        }
      </main>
    </div>
  );
};

export default City;
