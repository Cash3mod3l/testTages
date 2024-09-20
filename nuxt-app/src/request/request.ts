import axios, {AxiosRequestConfig} from 'axios';

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
    return axios.request<T>(config)
        .then((response: AxiosResponse<T>) => response.data)
        .catch((error) => {
            console.error('Ошибка запроса:', error);
            throw error;
        });
}