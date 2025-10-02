import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ResetPasswordDTO } from "src/app/shared/models/reset-password-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  code: string = "";
  newPassword: string = "";
  newPasswordTextType: boolean = false;
  isLoading: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UsersService,
    private messageService: MessageService,
    private router : Router
  ) {}
  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params["email"];
    console.log(" this.email", this.email);
  }
  togglePassword() {
    this.newPasswordTextType = !this.newPasswordTextType;
  }
  resetPassword() {
    this.isLoading = true;
    const resetPassword: ResetPasswordDTO = {
      Email: this.email,
      NewPassword: this.newPassword,
      Otp: this.code
    };
    setTimeout(() => {
      this.userService
        .ResetPassword(resetPassword)
        .subscribe((result: ResultResponse<string>) => {
          if (result.isSuccess === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: result.body
            });
            this.router.navigate([`login`]);
          } else {
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: result.body
            });
          }
          this.isLoading = false;
        });
    }, 3000);
  }
  isPasswordInvalid(password: string): boolean {
    if (!password) {
      return false;
    }
    const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[.$,]).{11,}$/;
    return !pattern.test(password);
  }
  isSubmitDisabled(): boolean {
    return !this.code || !this.newPassword;
  }
}
