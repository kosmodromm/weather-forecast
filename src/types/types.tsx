export interface ICoords {
  latitude: number,
  longitude: number
}

export interface IForecastHour {
  time: string,
  temp_c: number,
  condition: {
    text: string,
    icon: string
  }
}

export interface IForecastDay {
  date: string,
  day: {
    maxtemp_c: number,
    mintemp_c: number,
    avgtemp_c: number,
    totalsnow_cm: number,
    condition: {
      icon: string,
      text: string
    }
  },
  astro: {},
  hour: IForecastHour[]
}

export interface IWeatherDTO {
  location: {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
  },
  current: {
    temp_c: number,
    condition: {
      icon: string,
      text: string
    },
    uv: number
  },
  forecast: {
    forecastday: IForecastDay[]
  }
}

export interface IHourWeather {
  time: string,
  temp: string,
  text: string,
  icon: string
}

export interface ISingleDayWeather {
  temp: string,
  text: string,
  iconUrl: string,
  date: string,
  hour: IHourWeather[]
}

export interface IWeather {
  city: string,
  tempNow: string,
  iconNow: string,
  text: string,
  weatherForecast: ISingleDayWeather[]
}

export interface WeatherErrors {
  error: {
    code: number,
    message: string
  };
}
