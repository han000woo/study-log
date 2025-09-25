import axios from 'axios';

// baseURL을 환경 변수에서 가져와 설정
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// 요청 인터셉터: 모든 요청 헤더에 Access Token을 추가
apiClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;