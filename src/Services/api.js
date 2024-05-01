import axios from "axios";

const fetchDataFromAPI = async (countryIds, namePrefix, limit) => {
  console.log("params", countryIds, namePrefix, limit);
  console.log("first", process.env);
  try {
    const response = await axios.get(
      "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      {
        params: { countryIds, namePrefix, limit },

        headers: {
          "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    );
    console.log("Response", response);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchDataFromAPI;
