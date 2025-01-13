const weatherURL =
  `https://api.weatherstack.com/current?access_key=${process.env.WEATHER_KEY}&query=`;

const getForecast = async ({lat, lon}, callback) => {
  try {
    const newWeatherLoc = `${weatherURL}${lat},${lon}`;
    const res = await fetch(newWeatherLoc);
    const data = await res.json();
    if (data?.error) {
      callback(data.error.info, undefined);
    } else callback(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degress out. There is a ${data.current.precip} % chance of rain.`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getForecast;
