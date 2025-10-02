import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginRequestDTO } from "src/app/shared/models/login-request-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { UserGetDTO } from "src/app/shared/models/user-get-dto";
import { DialogService } from "src/app/shared/services/dialog.service";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  selectedEmail: string = "";
  selectedPassword: string = "";
  isLoading: boolean = false;
  timer: any = 0;
  fieldTextType: boolean = false;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private dialogService: DialogService,
  ) {}
  ngOnInit(): void {}
  onSubmit(event: any) {
    if (event.keyCode === 13) {
      this.login();
    }
  }
  login() {
    this.isLoading = true;
    this.timer = setTimeout(() => {
      const loginRequest: LoginRequestDTO = {
        email: this.selectedEmail,
        password: this.selectedPassword
      };
      if (loginRequest !== null) {
        this.usersService
          .login(loginRequest)
          .subscribe((response: ResultResponse<UserGetDTO>) => {
            if (response.isSuccess == true) {
              this.usersService.save_login_info(response.body);
              this.usersService.setToken(response.body.token);
              this.router.navigateByUrl("articles");
            } else {
              this.dialogService.openServerErrorDialog(
                response.error.message,
                response.error.code
              );
            }
            this.isLoading = false;
          });
      }
    }, 2000);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  forgetPassword(){
    this.router.navigate(['forget-password']);
  }
}
