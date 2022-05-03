import axios from 'axios';

// const BASE_URL = 'https://api.pecquora.com/';
const BASE_URL = 'http://localhost:5001/';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
});

// const refreshToken = async () => {
//     const token = localStorage.getItem('jwtToken');
//     const axiosTemp = axios.create({
//         baseURL: BASE_URL,
//         timeout: 30000
//     });
//     const response = await axiosTemp.post(
//         '/api/businessUser/refreshJwtToken',
//         {
//             oldJwtToken: token
//         }
//     );
//     localStorage.setItem('jwtToken', response.data.token);
// };

// axiosRetry(api, {
//     retries: 2,
//     retryDelay: (retryCount) => retryCount * 2000,
//     retryCondition: (error) => {
//         return error.response?.status === 500;
//     }
// });

// // Request interceptor
// api.interceptors.request.use(
//     (config) => {
//         // Add Authorization Header
//         // Performance of local storage : https://stackoverflow.com/a/56848541/1764528
//         const token = localStorage.getItem('jwtToken');
//         config.headers.Authorization = `Bearer ${token}`;

//         return config;
//     },
//     (error) => {
//         throw error;
//     }
// );

// // Response interceptor
// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         // Check if token has expired
//         if (error.response?.status === 401 &&
//             error.response.data.message === 'JSON token expired') {
//             // Refresh token
//             try {
//                 await refreshToken();
//             } catch (error) {
//                 localStorage.clear();
//             }
//             const token = localStorage.getItem('jwtToken');
//             error.config.headers.Authorization = `Bearer ${token}`;
//             return axios.request(error.config);
//         }
//         throw error;
//     }
// );

export default api;
