import { HttpClient } from "./httpClient";
import { SERVER } from "../lib/env";

class ApiService {
  constructor(cookie?: string) {
    this.apiEndpoint = `${SERVER}` as string;
  }

  private apiEndpoint: string;

  private headers: any = {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  };

  public async getUsers() {
    return await HttpClient.get(`${this.apiEndpoint}/users`, this.headers);
  }

  public async createProject(project: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/project/new`,
      this.headers,
      project
    );
  }

  public async getProjects(page: number, offset: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/projects?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async getProject(id: string, userID?: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/project/${id}?userID=${userID}`,
      this.headers
    );
  }

  public async createComment(comment: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/comment/new`,
      this.headers,
      comment
    );
  }

  public async getProjectLikes(id: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/like/project/${id}`,
      this.headers
    );
  }

  public async likeProject(id: string, like: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/project/like/${id}`,
      this.headers,
      like
    );
  }

  public async unlikeProject(id: string, like: FormData) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/project/unlike/${id}`,
      this.headers,
      like
    );
  }

  public async getUser(id: string) {
    return await HttpClient.get(`${this.apiEndpoint}/user/${id}`, this.headers);
  }

  public async getUserProfile(username: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/user/profile/${username}`,
      this.headers
    );
  }

  public async getUserProjects(username: string, page: number, offset: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/user/${username}/projects?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async getUserLikedProjects(
    username: string,
    page: number,
    offset: number
  ) {
    return await HttpClient.get(
      `${this.apiEndpoint}/user/${username}/projects/liked?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async getUserSavedProjects(
    username: string,
    page: number,
    offset: number
  ) {
    return await HttpClient.get(
      `${this.apiEndpoint}/user/${username}/projects/saved?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async isProjectSaved(id: string) {
    return await HttpClient.get(
      `${this.apiEndpoint}/project/save/${id}`,
      this.headers
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
    return await HttpClient.delete(
      `${this.apiEndpoint}/project/unsave/${id}`,
      this.headers,
      like
    );
  }

  public async updateProject(id: string, project: FormData) {
    return await HttpClient.put(
      `${this.apiEndpoint}/project/update/${id}`,
      this.headers,
      project
    );
  }

  public async deleteProject(id: string, project: FormData) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/project/delete/${id}`,
      this.headers,
      project
    );
  }

  public async search(value: string, page: number, offset: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/search?project=${value}&page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async updateUser(id: string, user: FormData) {
    return await HttpClient.put(
      `${this.apiEndpoint}/user/edit/${id}`,
      this.headers,
      user
    );
  }

  public async updatePassword(password: FormData) {
    return await HttpClient.put(
      `${this.apiEndpoint}/password/update`,
      this.headers,
      password
    );
  }

  public async deleteUser(id: string, user: FormData) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/user/delete/${id}`,
      this.headers,
      user
    );
  }

  public async filterTechnology(value: string, page: number, offset: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/technology/${value}?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async filterCategory(value: string, page: number, offset: number) {
    return await HttpClient.get(
      `${this.apiEndpoint}/category/${value}?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async reportProject(value: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/report/project`,
      this.headers,
      value
    );
  }

  public async reportComment(value: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/report/comment`,
      this.headers,
      value
    );
  }

  public async reportUser(value: FormData) {
    return await HttpClient.post(
      `${this.apiEndpoint}/report/user`,
      this.headers,
      value
    );
  }

  public async deleteComment(id: number, comment: FormData) {
    return await HttpClient.delete(
      `${this.apiEndpoint}/comment/delete/${id}`,
      this.headers,
      comment
    );
  }

  public async updateComment(id: number, comment: FormData) {
    return await HttpClient.put(
      `${this.apiEndpoint}/comment/edit/${id}`,
      this.headers,
      comment
    );
  }

  public async userAuth() {
    return await HttpClient.get(`${this.apiEndpoint}/userAuth`, this.headers);
  }

  public async getProjectsByType(
    filterName: string,
    page: number,
    offset: number
  ) {
    return await HttpClient.get(
      `${this.apiEndpoint}/projects/${filterName}?page=${page}&offset=${offset}`,
      this.headers
    );
  }

  public async commentSort(
    projectId: string,
    type: string,
    page: number,
    offset: number
  ) {
    return await HttpClient.get(
      `${this.apiEndpoint}/project/${projectId}/comments?comments_sort=${type}&page=${page}&offset=${offset}`,
      this.headers
    );
  }
}

export default ApiService;
