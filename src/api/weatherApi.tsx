export interface ICoords {
  latitude: number,
  longitude: number
}

export interface IWeatherDTO {
  'coord': {
    'lon': 10.99,
    'lat': 44.34
  },
  'weather': [
    {
      'id': 501,
      'main': 'Rain',
      'description': 'moderate rain',
      'icon': '10d'
    }
  ],
  'base': 'stations',
  'main': {
    'temp': 298.48,
    'feels_like': 298.74,
    'temp_min': 297.56,
    'temp_max': 300.05,
    'pressure': 1015,
    'humidity': 64,
    'sea_level': 1015,
    'grnd_level': 933
  },
  'visibility': 10000,
  'wind': {
    'speed': 0.62,
    'deg': 349,
    'gust': 1.18
  },
  'rain': {
    '1h': 3.16
  },
  'clouds': {
    'all': 100
  },
  'dt': 1661870592,
  'sys': {
    'type': 2,
    'id': 2075663,
    'country': 'IT',
    'sunrise': 1661834187,
    'sunset': 1661882248
  },
  'timezone': 7200,
  'id': 3163858,
  'name': 'Zocca',
  'cod': 200
}

const API_KEY = 'f953a91cfb30c44995dd52bb97a21548';

/*'https://api.openweathermap.org/data/3.0/onecall?'*/
/*'https://api.openweathermap.org/data/2.5/weather?'*/
const API_URL = new URL('https://api.openweathermap.org/data/3.0/onecall?');

export async function getWeatherByCoords(coords: ICoords): Promise<IWeatherDTO> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely&appid=${API_KEY}`);
    weatherData = await data.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
}

export async function getWeatherByCity(city: string): Promise<IWeatherDTO> {
  let weatherData: IWeatherDTO;

  try {
    const data = await fetch(API_URL + `q=${city.toLowerCase()}&appid=${API_KEY}`);
    weatherData = await data.json();
    return weatherData;
  } catch (error) {
    throw error;
  }
}

export function getWeatherIcon(code: string): string {
  return `http://openweathermap.org/img/wn/${code}@2x.png`;
}
