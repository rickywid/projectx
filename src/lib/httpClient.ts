import formSerializer from './formSerializer';

export class HttpClient {
    public static async makeRequest(request: Request): Promise<Response> {
        const response = await fetch(request);
        return response;
    }

    public static async get(endpoint: string, headers={}): Promise<Response> {
        const request = new Request(endpoint, {
            body: null,
            headers,
            method: 'GET',
            mode: 'cors',
            credentials: 'include'
        });

        return await HttpClient.makeRequest(request);
    }

    public static async post(endpoint: string, headers={}, data: FormData): Promise<Response> {
        const request = new Request(endpoint, {
            body: formSerializer(data),
            headers,
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
        });

        return await HttpClient.makeRequest(request);
    }

    public static async put(endpoint: string, headers={}, data: FormData): Promise<Response> {
        const request = new Request(endpoint, {
            body: formSerializer(data),
            headers,
            method: 'PUT',
            mode: 'cors',
            credentials: 'include'
        });

        return await HttpClient.makeRequest(request);
    }

    public static async delete(endpoint: string, headers={}, data: FormData): Promise<Response> {
        const request = new Request(endpoint, {
            body: formSerializer(data),
            headers,
            method: 'DELETE',
            mode: 'cors'
        });

        return await HttpClient.makeRequest(request);
    }

}