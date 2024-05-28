const server = false;
const url = server ? "http://192.168.0.105:3000/api" : "http://192.168.0.105:3000/api";

const client = axios.create({
    baseURL: url
});

const get = async (endpoint) => {
    return await client.get(endpoint);
};

const post = async (endpoint, body, axiosConfig) => {
    try {
        return await client.post(endpoint, body, axiosConfig);
    } catch (error) {
        return error;
    }
};

const put = async (endpoint, data, axiosConfig) => {
    return await client.put(endpoint, data, axiosConfig);
};

const remove = async (endpoint, data, axiosConfig) => {
    return await client.delete(endpoint, data, axiosConfig);
};