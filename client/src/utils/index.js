
export function getWeatherIconUrl(icon) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

export function getWeatherOfSameTime(categorizedWeather) {
  const { weathers } = Object.values(categorizedWeather)[0];
  const baseTime = weathers[1].dt_txt.split(" ")[1];
  console.log({ baseTime });
  Object.values(categorizedWeather).forEach((day, i) => {
    day.weathers.forEach((weather) => {
      if (i === Object.values(categorizedWeather).length - 1) {
        day.weather = weather;
      } else if (weather.dt_txt.split(" ")[1] === baseTime) {
        day.weathers = null;
        day.weather = weather;
      }
    });
  });
  return categorizedWeather;
}
