import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3500/api";
  }

  createUser(user: object) {
    return this.http.post(`${this.url}/postUser`, user);
  }

  assignRelationUserEmployee(entity: object) {
    return this.http.post(`${this.url}/postRelationUserEmployee`, entity);
  }

  login(user: object) {
    return this.http.post(`${this.url}/login`, user);
  }
}
