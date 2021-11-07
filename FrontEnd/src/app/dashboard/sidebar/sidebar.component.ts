import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  dataUserLogin: any;
  constructor(private router: Router) {
    this.dataUserLogin = JSON.parse(sessionStorage.getItem("USER_DATA")!);
  }

  ngOnInit(): void {}

  logout() {
    sessionStorage.clear();
    this.router.navigate(["/login"]);
  }
}
