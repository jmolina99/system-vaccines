import { Injectable } from "@angular/core";
import { User } from "../models/user";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class PermissionsService {
  private token!: string;
  private userLogin!: User;
  private rol!: string;

  constructor() {}

  decodeToken(token: string): boolean {
    const decoded: any = jwt_decode(token);

    if (decoded) {
      let userData = {
        _id: decoded._id,
        username: decoded.username,
        rol: decoded.rol,
      };

      sessionStorage.setItem("USER_DATA", JSON.stringify(userData));

      this.token = token;
      this.userLogin = decoded.username || null;
      return true;
    } else {
      return false;
    }
  }

  obtainToken(): string {
    return this.token;
  }

  obtainPersonLogin(): object {
    return this.userLogin;
  }
}
