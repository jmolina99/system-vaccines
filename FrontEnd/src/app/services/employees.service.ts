import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class EmployeesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = "http://localhost:3500/api";
  }

  getEmployees() {
    return this.http.get(`${this.url}/getEmployees`);
  }

  getEmployeeById(id: string) {
    return this.http.get(`${this.url}/getEmployeeById/${id}`);
  }

  getEmployeesByParams(dataFilter: any) {
    return this.http.post(`${this.url}/getEmployeesByParams`, dataFilter);
  }

  createEmployee(employee: object) {
    return this.http.post(`${this.url}/postEmployee`, employee);
  }

  updateEmployee(id: string, employee: object) {
    return this.http.put(`${this.url}/putEmployee/${id}`, employee);
  }

  removeEmployee(id: string) {
    return this.http.delete(`${this.url}/removeEmployee/${id}`);
  }
}
