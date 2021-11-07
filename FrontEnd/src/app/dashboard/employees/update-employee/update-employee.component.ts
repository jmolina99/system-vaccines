import { Component, OnInit } from "@angular/core";
import { EmployeesService } from "src/app/services/employees.service";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-employee",
  templateUrl: "./update-employee.component.html",
  styleUrls: ["./update-employee.component.scss"],
})
export class UpdateEmployeeComponent implements OnInit {
  idEmployee: any;
  dataSingleEmployee: any = [];
  employees: any = [];
  verify: boolean = false;

  constructor(
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
    this.employees.forEach((element: any) => {
      if (
        element._id != this.dataSingleEmployee._id &&
        element.dni === this.dataSingleEmployee.dni
      ) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "La cédula ingresada ya existe en el sistema",
          showConfirmButton: false,
          timer: 1500,
        });
        return (this.verify = false);
      } else {
        return (this.verify = true);
      }
    });

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
        this.dataSingleEmployee.dni &&
        this.dataSingleEmployee.names &&
        this.dataSingleEmployee.last_names &&
        this.dataSingleEmployee.email
      ) {
        let dataEmployee = {
          employee: this.dataSingleEmployee,
        };
        let pathEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        let pathOnlyLetters = /^[ñA-ZñÑáéíóúÁÉÍÓÚa-z _]*$/;
        let validateEmail = pathEmail.test(dataEmployee.employee.email!);
        let validateNames = pathOnlyLetters.test(dataEmployee.employee.names);
        let validateLastNames = pathOnlyLetters.test(dataEmployee.employee.last_names);
        let validateDni = this.validationDni(dataEmployee.employee.dni);
        if (validateNames && validateLastNames) {
          if (validateEmail) {
            if (validateDni) {
              this.employeesService
                .updateEmployee(this.idEmployee, dataEmployee)
                .subscribe(() => {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Empleado actualizado exitosamente",
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

        const odds = numberOne + numberThree + numberFive + numberSeven + numberNine;
        const sumTotal = pairs + odds;
        const firstDigitSum = String(sumTotal).substring(0, 1);
        const ten = (Number(firstDigitSum) + 1) * 10;
        let digitValidator = ten - sumTotal;
        if (digitValidator === 10) {
          digitValidator = 0;
        }
        if (digitValidator === latestDigit) {
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
