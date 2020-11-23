const axios = require('axios');

// create axios instance
const axiosInstance = axios.create({
  baseURL: `https://api.spoonacular.com/recipes`,
});

// request interceptor to add spoonacular api key
axiosInstance.interceptors.request.use((config) => {
  config.params['apiKey'] = process.env.SPOONACULAR_API_KEY;
  return config;
});

module.exports = axiosInstance;
