import axios, {Axios} from "axios";
import {Urls} from "./Urls";
import {ContainerModule, interfaces} from "inversify"
import {Types} from "./Types";

const _cache = new Map();

async function refreshAccessToken() {
    let {data} = await axios.put(Urls.authentication(process.env.USER_EMAIL as string), {password: process.env.PASSWORD as string});
    return data.token;
}

function createAxios() {
    let axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(async config => {
        if (!_cache.has(process.env.USER_EMAIL as string)) {
            _cache.set(process.env.USER_EMAIL as string, await refreshAccessToken());
        }

        let token = _cache.get(process.env.USER_EMAIL as string);
        config.headers = {
            "authtoken": token,
            "userid": process.env.USER_EMAIL as string,
            "content-type": "application/json"
        }
        return config;
    }, error => Promise.reject(error));
    axiosInstance.interceptors.response.use(res => res, async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 419 && !originalRequest._retry) {
            originalRequest._retry = true;
            let token = await refreshAccessToken();
            _cache.set(process.env.USER_EMAIL as string, token);
            axiosInstance.defaults.headers.common['authtoken'] = _cache.get(process.env.USER_EMAIL as string);
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    })
    return axiosInstance;
}

const AxiosModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    const  axiosInstance = createAxios();
    bind<Axios>(Types.AXIOS).toConstantValue(axiosInstance);
})

export {AxiosModule}
