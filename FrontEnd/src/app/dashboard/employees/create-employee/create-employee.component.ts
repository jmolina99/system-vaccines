import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { Employee } from "src/app/models/employee";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-create-employee",
  templateUrl: "./create-employee.component.html",
  styleUrls: ["./create-employee.component.scss"],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee = {
    dni: "",
    names: "",
    last_names: "",
    email: "",
    birthday: "",
    address: "",
    phone: "",
    status_vaccine: false,
    type_vaccine: "",
    date_vaccine: "",
    doses_vaccine: 0,
    status_employee: false,
  };
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createEmployee() {
    if (
      this.employee.dni &&
      this.employee.names &&
      this.employee.last_names &&
      this.employee.email
    ) {
      let dataEmployee = {
        employee: this.employee,
      };
      let pathEmail =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      let pathOnlyLetters = /^[ñA-ZñÑáéíóúÁÉÍÓÚa-z _]*$/;
      let validateEmail = pathEmail.test(dataEmployee.employee.email!);
      let validateNames = pathOnlyLetters.test(dataEmployee.employee.names);
      let validateLastNames = pathOnlyLetters.test(
        dataEmployee.employee.last_names
      );
      let validateDni = this.validationDni(dataEmployee.employee.dni);
      if (validateNames && validateLastNames) {
        if (validateEmail) {
          if (validateDni) {
            this.employeesService.createEmployee(dataEmployee).subscribe(() => {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Empleado registrado exitosamente",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => this.router.navigate(["dashboard/list-employees"]));
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "warning",
              title: "Por favor, ingrese una cédula válida",
              showConfirmButton: false,
              timer: 1500,
            });
          }
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

  validationDni(ci: any) {
    if (ci.length === 10) {
      const digitRegion = ci.substring(0, 2);
      if (digitRegion >= String(0) && digitRegion <= String(24)) {
        const latestDigit = Number(ci.substring(9, 10));
        const pairs =
          Number(ci.substring(1, 2)) +
          Number(ci.substring(3, 4)) +
          Number(ci.substring(5, 6)) +
          Number(ci.substring(7, 8));

        let numberOne: any = ci.substring(0, 1);
        numberOne = numberOne * 2;
        if (numberOne > 9) {
          numberOne = numberOne - 9;
        }

        let numberThree: any = ci.substring(2, 3);
        numberThree = numberThree * 2;
        if (numberThree > 9) {
          numberThree = numberThree - 9;
        }

        let numberFive: any = ci.substring(4, 5);
        numberFive = numberFive * 2;
        if (numberFive > 9) {
          numberFive = numberFive - 9;
        }

        let numberSeven: any = ci.substring(6, 7);
        numberSeven = numberSeven * 2;
        if (numberSeven > 9) {
          numberSeven = numberSeven - 9;
        }

        let numberNine: any = ci.substring(8, 9);
        numberNine = numberNine * 2;
        if (numberNine > 9) {
          numberNine = numberNine - 9;
        }

        const odds =
          numberOne + numberThree + numberFive + numberSeven + numberNine;
        const sumTotal = pairs + odds;
        const firstDigitSum = String(sumTotal).substring(0, 1);
        const ten = (Number(firstDigitSum) + 1) * 10;
        let digitValidator = ten - sumTotal;
        if (digitValidator === 10) {
          digitValidator = 0;
        }
        if (digitValidator === latestDigit) {
          console.log("Cédula válida");
          return true;
        } else {
          return false;
        }
      } else {
        console.log("Cédula no válida");
        return false;
      }
    } else {
      console.log("Cédula con más de 10 dígitos");
      return false;
    }
  }
}
