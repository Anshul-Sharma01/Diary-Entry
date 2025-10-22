// API Configuration
const getApiConfig = () => {
    const envUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    // If the environment URL already includes /diary, extract the base URL
    const baseUrl = envUrl.replace('/diary', '');

    return {
        baseUrl,
        authUrl: baseUrl,
        diaryUrl: `${baseUrl}/diary`
    };
};

export const apiConfig = getApiConfig();