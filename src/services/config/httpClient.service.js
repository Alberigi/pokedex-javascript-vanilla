export class HttpClientService {
    constructor(clientHttp) {
        this.clientHttp = clientHttp;
    }

    async post(route, data) {
        try {
            const result = await this.clientHttp.post(route, data);
            return result.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }

    async get(route, params) {
        try {
            const result = await this.clientHttp.get(route, params);
            return result.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
    
    async getFetch(route, params) {
        try {
            const result = await fetch(route, params);
            const data = await result.json();
            return data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    }
}