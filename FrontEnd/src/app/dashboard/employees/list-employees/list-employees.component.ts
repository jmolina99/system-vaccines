import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-employees",
  templateUrl: "./list-employees.component.html",
  styleUrls: ["./list-employees.component.scss"],
})
export class ListEmployeesComponent implements OnInit {
  employees: any = [];

  dataFilter: any = {
    status_vaccine: "",
    type_vaccine: "",
    start_date: "",
    end_date: "",
  };

  dniEmployeeForUser: string = "";

  constructor(
    private employeesService: EmployeesService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.getEmployees();
  }

  ngOnInit(): void {}

  getEmployees() {
    return this.employeesService.getEmployees().subscribe(
      (res: any) => {
        res.data.forEach((element: any) => {
          this.employees.push(element);
        });
      },
      (err: any) => console.error(err)
    );
  }

  getEmployeesByParams() {
    if (
      this.dataFilter.status_vaccine == "" &&
      this.dataFilter.type_vaccine == "" &&
      this.dataFilter.start_date == "" &&
      this.dataFilter.end_date == ""
    ) {
      this.employees = [];
      this.getEmployees();
    }
    this.employeesService.getEmployeesByParams(this.dataFilter).subscribe(
      (res: any) => {
        this.employees = [];
        res.data.forEach((element: any) => {
          this.employees.push(element);
        });
      },
      (err: any) => console.error(err)
    );
  }

  removeEmployee(id: string) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "¿Está seguro que desea eliminar el empleado seleccionado?",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Empleado eliminado exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });
        this.employeesService.removeEmployee(id).subscribe((res) => {
          if (res) {
            window.location.reload();
          }
        });
      }
    });
  }

  checkEmployee(id: string) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "¿Está seguro que desea dar de alta al empleado seleccionado?",
      text: "Se creará un nuevo usuario para el empleado",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        let dataEmployee = {
          employee: { status_employee: true },
        };
        this.employeesService
          .updateEmployee(id, dataEmployee)
          .subscribe((res) => {
            if (res) {
              this.createNewUserFromEmployee(id);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Empleado dado de alta exitosamente",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  }

  createNewUserFromEmployee(id: string) {
    this.employeesService.getEmployeeById(id).subscribe(
      (res: any) => {
        this.dniEmployeeForUser = res.data.dni;

        let dataUser = {
          user: {
            rol: "employee",
            username: this.dniEmployeeForUser,
            password: this.dniEmployeeForUser,
          },
        };

        this.usersService.createUser(dataUser).subscribe((res: any) => {
          if (res) {
            console.log(res);
            let dataRelation = {
              entity: {
                id_employee: id,
                id_user: res.data._id,
              },
            };
            this.usersService
              .assignRelationUserEmployee(dataRelation)
              .subscribe();
            window.location.reload();
          }
        });
      },
      (err: any) => console.error(err)
    );
  }
}
