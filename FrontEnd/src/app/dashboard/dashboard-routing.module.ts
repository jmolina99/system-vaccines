import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEmployeesComponent } from "./employees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import { UpdateEmployeeComponent } from "./employees/update-employee/update-employee.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "list-employees", component: ListEmployeesComponent },
  { path: "create-employee", component: CreateEmployeeComponent },
  { path: "update-employee/:id", component: UpdateEmployeeComponent },
  { path: "profile", component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
