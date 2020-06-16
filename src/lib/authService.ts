import { HttpClient } from './httpClient';

class AuthService {
    constructor() {
        this.apiEndpoint = 'http://localhost:5000/api'
    }

    apiEndpoint: string;
    headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }

    login(credentials: any) {
        const request = new Request(`
            ${this.apiEndpoint}/login`, 
            { 
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify(credentials),
                credentials: 'include'
            }
        )
        return HttpClient.makeRequest(request)
    }
    
    signup(credentials: any) {
        const request = new Request(`
            ${this.apiEndpoint}/signup`, 
            { 
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify(credentials)
            }
        )
        return HttpClient.makeRequest(request)
    }

    signout() {
        const request = new Request(`
            ${this.apiEndpoint}/signout`, 
            { 
                headers: this.headers,
                method: 'POST',
                body: JSON.stringify({})
            }
        )
        return HttpClient.makeRequest(request)
    }
}

export default AuthService;
 