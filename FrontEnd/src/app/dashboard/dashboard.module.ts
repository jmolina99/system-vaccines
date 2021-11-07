import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { SidebarComponent } from "./sidebar/sidebar.component";
import { ListEmployeesComponent } from "./employees/list-employees/list-employees.component";
import { CreateEmployeeComponent } from "./employees/create-employee/create-employee.component";
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    SidebarComponent,
    ListEmployeesComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
})
export class DashboardModule {}
