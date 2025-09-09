import { AfterViewInit, Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";
import { UserGetDTO } from "../../models/user-get-dto";
import { faArrowRightFromBracket, faGear, faUser } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, AfterViewInit {
  user: UserGetDTO | null = null;
    faSettings = faGear;
      faUser = faUser;
  faLogout = faArrowRightFromBracket;

  constructor(private usersService: UsersService, private router: Router) {}
  ngAfterViewInit(): void {
    const navItems = document.querySelectorAll<HTMLLIElement>(
      ".nav-item .nav-link"
    );

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        navItems.forEach((li) => li.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }
  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this.usersService.logout();
    this.router.navigateByUrl("login");
  }
}
