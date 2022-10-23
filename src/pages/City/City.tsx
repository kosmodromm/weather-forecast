import React, { useEffect, useMemo, useState } from 'react';
import { getDefaultCity } from '../../utils/getDefaultCity';
import { getWeatherByCity } from '../../api/weatherApi';
import CityCard from '../../components/CityCard/CityCard';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import SearchForm from '../../components/SearchForm/SearchForm';
import { IWeather, WeatherErrors } from '../../types/types';

const City: React.FC = () => {
  const DAYS = 10;
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [error, setError] = useState<WeatherErrors | null>(null);

  const { city } = useParams();

  useEffect(() => {
    try {
      // search weather in city if it in url
      if (city) {
        handleSearch(city);
      } else {
        const defaultCity = getDefaultCity();
        handleSearch(defaultCity);
      }
    } catch (error: any) {
      setError(error);
    }
  }, [city]);

  const handleSearch = async (city: string): Promise<void> => {
    setError(null);

    try {
      //loader show if no weatherdata
      if (weatherData && city !== weatherData.city) {
        setWeatherData(undefined);
      }

      const weatherForecast = await getWeatherByCity(city);
      setWeatherData(weatherForecast);
    } catch (error: any) {
      setError(error);
    }
  };

  const content = useMemo(() => {
    if (error) {
      return <div>{error.error.message}</div>;
    } else if (weatherData) {
      return <CityCard weatherData={weatherData} linkTo={handleSearch} days={DAYS} hourly />;
    }
    return <Loader />;
  }, [error, weatherData]);

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="flex flex-col items-center justify-center text-white text-2xl">
        <SearchForm />
        {content}
      </main>
    </div>
  );
};

export default City;
