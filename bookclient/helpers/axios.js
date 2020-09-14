var axios = require("axios");

var axiosInstance = axios.create({
  baseURL: "/"
  /* other custom settings */
});

module.exports = axiosInstance;
