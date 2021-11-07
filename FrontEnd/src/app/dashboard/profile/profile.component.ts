import { Component, OnInit } from "@angular/core";
import { RelationUserEmployeeService } from "src/app/services/relation-user-employee.service";
import { EmployeesService } from "src/app/services/employees.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  dataUserLogin: any;
  dataAllUser: any = [];

  dataSingleEmployee: any = [];
  constructor(
    private relationUserEmployeeService: RelationUserEmployeeService,
    private employeesService: EmployeesService
  ) {
    this.dataUserLogin = JSON.parse(sessionStorage.getItem("USER_DATA")!);
  }

  ngOnInit(): void {
    if (this.dataUserLogin._id !== "") {
      this.getDataUserEmployee();
    }
  }

  getDataUserEmployee() {
    return this.relationUserEmployeeService
      .getRelationUserEmployeeByUserId(this.dataUserLogin._id)
      .subscribe((res: any) => {
        this.employeesService.getEmployeeById(res.data.id_employee).subscribe(
          (res: any) => {
            console.log(res);
            this.dataSingleEmployee = res.data;
          },
          (err: any) => console.error(err)
        );
      });
  }
}
