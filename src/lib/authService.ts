import { HttpClient } from "./httpClient";
import { SERVER } from "../lib/env";

class AuthService {
  constructor() {
    this.apiEndpoint = `${SERVER}`;
  }

  apiEndpoint: string;
  headers = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  public async login(credentials: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/login`,
      this.headers,
      credentials
    );
  }

  public async signup(credentials: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/signup`,
      this.headers,
      credentials
    );
  }

  public async signout(credentials: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/signout`,
      this.headers,
      credentials
    );
  }
}

export default AuthService;
