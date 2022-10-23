import React, { useEffect, useState } from 'react';
import { getWeatherByCity, getWeatherByCoords, IWeather } from '../../api/weatherApi';
import { getDefaultCity } from '../../utils/getDefaultCity';
import CityCard from '../../components/CityCard/CityCard';
import { useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';
import StyledButton from '../../components/StyledButton/StyledButton';
import Loader from '../../components/Loader/Loader';

const Main: React.FC = () => {
  const [weatherData, setWeatherData] = useState<IWeather>();

  const navigation = useNavigate();

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

  const changeCity = (city: string): void => {
    localStorage.setItem('defaultCity', city);
    navigation(`${Path.City}/${city}`);
  };

  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <main className="flex flex-col items-center justify-center text-white text-2xl">
        {
          weatherData
            ? <>
              <CityCard weatherData={weatherData} linkTo={changeCity} />
              <div className="flex flex-col gap-2 mt-5">
                <StyledButton text="Minsk" onClick={changeCity} />
                <StyledButton text="Moscow" onClick={changeCity} />
                <StyledButton text="Bratislava" onClick={changeCity} />
              </div>
            </>
            : <Loader />
        }
      </main>
    </div>
  );
};

export default Main;
