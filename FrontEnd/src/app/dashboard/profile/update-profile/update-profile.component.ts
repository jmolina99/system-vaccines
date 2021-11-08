import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-profile",
  templateUrl: "./update-profile.component.html",
  styleUrls: ["./update-profile.component.scss"],
})
export class UpdateProfileComponent implements OnInit {
  idEmployee: any;
  dataSingleEmployee: any = [];
  employees: any = [];
  verify: boolean = false;

  constructor(
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.idEmployee = this.activatedRoute.snapshot.params.id;
    this.getEmployeeById(this.idEmployee);
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployeeById(id: string) {
    return this.employeesService.getEmployeeById(id).subscribe(
      (res: any) => {
        this.idEmployee = id;
        this.dataSingleEmployee = res.data;
        if (this.dataSingleEmployee.date_vaccine !== "") {
          this.dataSingleEmployee.date_vaccine = this.datePipe.transform(
            this.dataSingleEmployee.date_vaccine,
            "yyyy-MM-dd"
          );
        }
      },
      (err: any) => console.error(err)
    );
  }

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

  updateEmployee() {
    console.log(this.dataSingleEmployee);
    if (this.dataSingleEmployee.status_vaccine == "true") {
      this.dataSingleEmployee.status_vaccine = true;
    } else {
      this.dataSingleEmployee.status_vaccine = false;
    }
    this.employees.forEach((element: any) => {
      if (
        element._id != this.dataSingleEmployee._id &&
        element.email === this.dataSingleEmployee.email
      ) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "El correo ingresado ya existe en el sistema",
          showConfirmButton: false,
          timer: 1500,
        });
        return (this.verify = false);
      } else {
        return (this.verify = true);
      }
    });

    if (this.verify == true) {
      if (
        this.dataSingleEmployee.names &&
        this.dataSingleEmployee.last_names &&
        this.dataSingleEmployee.email &&
        this.dataSingleEmployee.birthday &&
        this.dataSingleEmployee.address &&
        this.dataSingleEmployee.phone &&
        this.dataSingleEmployee.type_vaccine &&
        this.dataSingleEmployee.date_vaccine &&
        this.dataSingleEmployee.doses_vaccine
      ) {
        if (this.dataSingleEmployee.status_vaccine == false) {
          this.dataSingleEmployee.type_vaccine = "";
          this.dataSingleEmployee.date_vaccine = "";
          this.dataSingleEmployee.doses_vaccine = 0;
        }
        let dataEmployee = {
          employee: this.dataSingleEmployee,
        };
        let pathEmail =
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let pathOnlyLetters = /^[ñA-ZñÑáéíóúÁÉÍÓÚa-z _]*$/;
        let pathPhone = /^0[0-9]{1}[0-9]{8}$/;
        let validateEmail = pathEmail.test(dataEmployee.employee.email!);
        let validateNames = pathOnlyLetters.test(dataEmployee.employee.names);
        let validateLastNames = pathOnlyLetters.test(dataEmployee.employee.last_names);
        let validatePhone = pathPhone.test(dataEmployee.employee.phone!);

        if (validateNames && validateLastNames) {
          if (validatePhone) {
            if (dataEmployee.employee.doses_vaccine <= 9 && dataEmployee.employee.doses_vaccine >= 0) {
              if (validateEmail) {
                this.employeesService
                  .updateEmployee(this.idEmployee, dataEmployee)
                  .subscribe(() => {
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Empleado actualizado exitosamente",
                      showConfirmButton: false,
                      timer: 1500,
                    }).then(() => this.router.navigate(["dashboard/profile"]));
                  });
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "warning",
                  title: "Por favor, ingrese un correo electrónico válido",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            } else {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "Por favor, ingrese un número de dosis válido",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Por favor, ingrese un teléfono celular válido",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Por favor, ingrese solo letras en nombres y apellidos",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
}
