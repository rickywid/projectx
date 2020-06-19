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
          `${this.apiEndpoint}/project/new`,
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
          `${this.apiEndpoint}/comment/new`,
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
           `${this.apiEndpoint}/project/like/${id}`,
          this.headers,
          like
        );
      }

      public async unlikeProject(id: string, like: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
           `${this.apiEndpoint}/project/unlike/${id}`,
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

      public async getUserProfile(username: string) {
        return await HttpClient.get(
          `${this.apiEndpoint}/user/profile/${username}`,
          this.headers,
        );
      }    

      
      public async isProjectSaved(id: string) {
        return await HttpClient.get(
          `${this.apiEndpoint}/project/save/${id}`,
          this.headers,
        );
      }    

      public async saveProject(id: string, project: FormData) {
        return await HttpClient.post(
          `${this.apiEndpoint}/project/save/${id}`,
          this.headers,
          project
        );
      }    

      public async unSaveProject(id: string, like: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
           `${this.apiEndpoint}/project/unsave/${id}`,
          this.headers,
          like
        );
      }
}

export default ApiService;