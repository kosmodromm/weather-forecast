import React, { useEffect, useState } from 'react';
import { getDefaultCity } from '../../utils/getDefaultCity';
import { getWeatherByCity, IWeather } from '../../api/weatherApi';
import CityCard from '../../components/CityCard/CityCard';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';

const City: React.FC = () => {
  const DAYS = 10;
  const [weatherData, setWeatherData] = useState<IWeather>();

  const { city } = useParams();

  useEffect(() => {
    // search weather in city if it in url
    if (city) {
      handleSearch(city);
    } else {
      const defaultCity = getDefaultCity();
      handleSearch(defaultCity);
    }
  }, [city]);

  const handleSearch = async (city: string): Promise<void> => {
    if (weatherData && city !== weatherData.city) {
      setWeatherData(undefined);
    }

    const weatherForecast = await getWeatherByCity(city);
    setWeatherData(weatherForecast);
  };

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="flex flex-col items-center justify-center text-white text-2xl">
        <SearchForm />
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
