import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RelationUserEmployeeService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3500/api";
  }

  getRelationUserEmployeeByUserId(idUser: string) {
    return this.http.get(`${this.url}/getRelationUserEmployeeByUserId/${idUser}`);
  }
}
