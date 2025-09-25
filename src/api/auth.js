import apiClient from './index';

export const login = async (email, password) => {
    try {
        const response = await apiClient.post('/auth/login', { email, password });
        // 성공 시 토큰 객체를 반환
        return response.data;
    } catch (error) {
        // 실패 시 에러 객체를 그대로 던져서 컴포넌트에서 처리하도록 함
        throw error;
    }
};

export const logout = async () => {
    try {
        // 로그아웃은 특별한 데이터 없이 헤더의 토큰으로만 처리
        const response = await apiClient.post('/auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const reissue = async (refreshToken) => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await apiClient.post('/auth/reissue', { accessToken, refreshToken });
        return response.data;
    } catch (error) {
        throw error;
    }
};