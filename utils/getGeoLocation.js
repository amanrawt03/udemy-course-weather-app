const getGeoLocURL =
  `https://api.geoapify.com/v1/geocode/search?apiKey=${process.env.GEO_APIFY_KEY}&text=`;

const getGeoLocation = async (address, callback) => {
  try {
    const res = await fetch(`${getGeoLocURL}${encodeURIComponent(address)}`);
    const data = await res.json();
    if (data.features.length === 0) {
      callback("Check your location name again", undefined);
    } else {
      const lat = data.features[0].properties.lat;
      const lon = data.features[0].properties.lon;
      callback(undefined,{lat, lon})
    }
  } catch (error) {
    console.log(error.message);
  }
};



module.exports = getGeoLocation