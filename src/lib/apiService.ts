import { HttpClient } from './httpClient';

class ApiService{
    constructor(cookie?: string) {
        // this.cookie = cookie as string;
        this.apiEndpoint = `http://localhost:5000/api` as string;
    }
    // private cookie: string;
    private apiEndpoint: string;

    private headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }

    public async getUsers() {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/users`,
          this.headers,
        );
      }

      public async createProject(project: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
          `${this.apiEndpoint}/projects`,
          this.headers,
          project
        );
      }

      public async getProjects() {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/projects`,
          this.headers,
        );
      }


      public async getProject(id: string) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/project/${id}`,
          this.headers,
        );
      }

      public async createComment(comment: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
          `${this.apiEndpoint}/comment`,
          this.headers,
          comment
        );
      }
      
      public async getProjectLikes(id: string) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/like/project/${id}`,
          this.headers,
        );
      }

      public async likeProject(id: string, like: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
           `${this.apiEndpoint}/like/project/${id}`,
          this.headers,
          like
        );
      }

      public async unlikeProject(id: string, like: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
           `${this.apiEndpoint}/like/project/${id}`,
          this.headers,
          like
        );
      }

      public async getUser(id: string) {
        return await HttpClient.get(
          `${this.apiEndpoint}/user/${id}`,
          this.headers,
        );
      }     
}

export default ApiService;