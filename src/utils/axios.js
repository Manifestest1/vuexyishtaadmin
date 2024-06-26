// axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config)
  {
    // Check if access token exists
    const accessToken = localStorage.getItem('token');

    if (accessToken)
    {
      // Set authorization header with access token
      config.headers['Authorization'] = `${accessToken}`;
    }


return config;
  },
  function (error)
  {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry)
    {
      originalRequest._retry = true;

      try
      {
        console.log("401 Error Get")


        // Attempt to refresh token
        const response = await axios.post('/refresh-token', {
          refreshToken: localStorage.getItem('_refreshToken'),
        });


        // Update access token in local storage
        localStorage.setItem('token', response.data.access_token);

        // Retry the original request with the new access token
        return instance(originalRequest);
      }
      catch (error)
      {
        // Handle token refresh failure
        console.error('Token refresh failed:', error);

        // Remove All items
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('loggedIn');

        // Redirect to login page or handle authentication error
        return Promise.reject(error);
      }
    }


return Promise.reject(error);
  }
);

export default instance;
