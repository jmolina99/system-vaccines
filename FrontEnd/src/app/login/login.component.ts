import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { PermissionsService } from "../services/permissions.service";
import { User } from "../models/user";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: User = {
    rol: "",
    username: "",
    password: "",
  };

  dataUserLogin: any;

  constructor(
    private usersService: UsersService,
    private permissionsServices: PermissionsService,
    private router: Router
  ) {
    this.dataUserLogin = JSON.parse(sessionStorage.getItem("USER_DATA")!);
  }

  ngOnInit(): void {}

  login() {
    if (this.user.rol && this.user.username && this.user.password) {
      let dataUser = {
        user: this.user,
      };
      this.usersService.login(dataUser).subscribe((res: any) => {
        if (res.sms == "not found") {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Usuario no registrado en el sistema",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.sms == "incorrect password") {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Nombre de usuario o contraseña incorrectos",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          if (this.permissionsServices.decodeToken(res.token)) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Inicio de sesión exitosa",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              if(this.user.rol == "administrator") {
                this.router.navigate(["dashboard/list-employees"]);
              } else if (this.user.rol == "employee") {
                this.router.navigate(["dashboard/profile"]);
              }
            });
          }
        }
      });
    } else {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Por favor, complete todos los campos para continuar",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
