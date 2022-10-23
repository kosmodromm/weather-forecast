import React, { useEffect, useMemo, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords } from '../../api/weatherApi';
import { getDefaultCity } from '../../utils/getDefaultCity';
import CityCard from '../../components/CityCard/CityCard';
import { useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';
import StyledButton from '../../components/StyledButton/StyledButton';
import Loader from '../../components/Loader/Loader';
import { IWeather, WeatherErrors } from '../../types/types';

const Main: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeather>();
  const [error, setError] = useState<WeatherErrors | null>(null);

  const navigation = useNavigate();

  useEffect(() => {
    initWeatherForecast();
  }, []);

  const initWeatherForecast = () => {
    try {
      navigator.geolocation.getCurrentPosition(
        onSuccessGeoposition, onErrorGeoposition
      );
    } catch (error: any) {
      setError(error);
    } finally {
      if (weatherData) {
        localStorage.setItem('defaultCity', weatherData.city);
      }
    }
  };

  const onSuccessGeoposition = async (position: GeolocationPosition) => {
    localStorage.defaultCity
      ? getWeatherByCity(localStorage.defaultCity)
        .then(result => setWeatherData(result))
        .catch(error => setError(error))
      : getWeatherByCoords(position.coords)
        .then(result => setWeatherData(result))
        .catch(error => setError(error));
  };

  const onErrorGeoposition = async (error: GeolocationPositionError) => {
    const defaultCity = getDefaultCity();
    const data = await getWeatherByCity(defaultCity);
    setWeatherData(data);
    console.error(error);
  };

  const changeCity = (city: string): void => {
    localStorage.setItem('defaultCity', city);
    navigation(`${Path.City}/${city}`);
  };

  const content = useMemo(() => {
    if (error) {
      return <div>{error.error.message}</div>;
    } else if (weatherData) {
      return <>
        <CityCard weatherData={weatherData} linkTo={changeCity} />
        <div className="flex flex-col gap-2 mt-5">
          <StyledButton text="Minsk" onClick={changeCity} />
          <StyledButton text="Moscow" onClick={changeCity} />
          <StyledButton text="Bratislava" onClick={changeCity} />
        </div>
      </>;
    }
    return <Loader />;
  }, [error, weatherData]);

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="flex flex-col items-center justify-center text-white text-2xl">
        {content}
      </main>
    </div>
  );
};

export default Main;
