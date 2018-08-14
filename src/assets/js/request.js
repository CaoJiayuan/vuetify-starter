axios.interceptors.request.use(config => {
  if (config.local !== true) {
    config.baseURL = process.env.API_BASE_URL;
  }
  return config;
});

axios.interceptors.response.use(response => response, error => {
  if (error.response) {
    renderException(error.response);
  }
  return Promise.reject(error);
});


function renderException(response) {

}
