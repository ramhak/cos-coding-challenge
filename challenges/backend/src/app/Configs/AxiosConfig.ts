import axios, {Axios} from "axios";
import {Urls} from "./Urls";
import {ContainerModule, interfaces} from "inversify"
import {Types} from "./Types";

const baseUrl = "https://api-core-dev.caronsale.de/api/v1";
const _cache = new Map();
const userId = "buyer-challenge@caronsale.de";
const password = "Test123.";

async function refreshAccessToken() {
    let {data} = await axios.put(Urls.authentication(userId), {password: password});
    return data.token;

}

function createAxios() {
    let axiosInstance = axios.create({baseURL: baseUrl});

    axiosInstance.interceptors.request.use(async config => {
        if (!_cache.has(userId)) {
            _cache.set(userId, await refreshAccessToken());
        }

        let token = _cache.get(userId);
        config.headers = {
            "authtoken": token,
            "userid": userId,
            "content-type": "application/json"
        }
        return config;
    }, error => Promise.reject(error));
    axiosInstance.interceptors.response.use(res => res, async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;
            let token = await refreshAccessToken();
            _cache.set(userId, token);
            axiosInstance.defaults.headers.common['authtoken'] = _cache.get(userId);
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    })
    return axiosInstance;
}

const AxiosModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    let axiosInstance = createAxios();
    bind<Axios>(Types.AXIOS).toConstantValue(axiosInstance);
})

export {AxiosModule}
