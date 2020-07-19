import { HttpClient } from './httpClient';

class ApiService{
    constructor(cookie?: string) {
        // this.cookie = cookie as string;
        this.apiEndpoint = `${process.env.REACT_APP_SERVER}` as string;
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

      public async updateProject(id: string, project: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.put(
          `${this.apiEndpoint}/project/update/${id}`,
          this.headers,
          project
        );
      }

      public async deleteProject(id: string, project: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
           `${this.apiEndpoint}/project/delete/${id}`,
          this.headers,
          project
        );
      }

      public async search(value: string) {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/search?project=${value}`,
          this.headers,
        );
      }

      public async updateUser(id: string, user: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.put(
          `${this.apiEndpoint}/user/edit/${id}`,
          this.headers,
          user
        );
      }

      public async updatePassword(password: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.put(
          `${this.apiEndpoint}/password/update`,
          this.headers,
          password
        );
      }

      public async deleteUser(id: string, user: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
          `${this.apiEndpoint}/user/delete/${id}`,
          this.headers,
          user
        );
      }      

      public async filterTechnology(value: string) {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/technology/${value}`,
          this.headers,
        );
      }

      public async filterCategory(value: string) {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/category/${value}`,
          this.headers,
        );
      }

      public async reportProject(value: FormData) {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
          `${this.apiEndpoint}/report/project`,
          this.headers,
          value
        );
      }

      public async reportComment(value: FormData) {  
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.post(
          `${this.apiEndpoint}/report/comment`,
          this.headers,
          value
        );
      }

      public async deleteComment(id: number, comment: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.delete(
          `${this.apiEndpoint}/comment/delete/${id}`,
          this.headers,
          comment
        );
      }   

      public async updateComment(id: number, comment: FormData) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.put(
          `${this.apiEndpoint}/comment/edit/${id}`,
          this.headers,
          comment
        );
      }   

      public async userAuth() {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/userAuth`,
          this.headers,
        );
      }

      public async getProjectsByType(filterName: string) {
        // this.headers['cookie'] = this.cookie;
        return await HttpClient.get(
          `${this.apiEndpoint}/projects/${filterName}`,
          this.headers,
        );
      }
}

export default ApiService;