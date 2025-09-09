import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { RegisterDTO } from "src/app/shared/models/register-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { UserGetDTO } from "src/app/shared/models/user-get-dto";
import { DialogService } from "src/app/shared/services/dialog.service";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  isLoading: boolean = false;
  timer: any = 0;
  passwordTextType: boolean = false;
newPasswordTextType: boolean = false;

  constructor(
    private dialogService: DialogService,
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group(
      {
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[\$\.,])(?=.*\d)[A-Za-z\d\$\.,]{11,}$/
          )
        ]),
        confirmPassword: new FormControl("", [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[\$\.,])(?=.*\d)[A-Za-z\d\$\.,]{11,}$/
          )
        ]),
        email: new FormControl("", [Validators.required, Validators.email])
      },
      { validators: this.passwordMatchValidator }
    );
  }
  ngOnInit(): void {}
  onRegisterSubmit(event) {
    if (event.keyCode === 13) {
      this.register();
    }
  }
  register() {
    this.isLoading = true;
    const userRegisterBody: RegisterDTO = {
      username: this.registrationForm.get("username").value,
      password: this.registrationForm.get("password").value,
      email: this.registrationForm.get("email").value
    };
    this.timer = setTimeout(() => {
      this.userService
        .register(userRegisterBody)
        .subscribe((response: ResultResponse<UserGetDTO>) => {
          if (response.isSuccess === true) {
            this.router.navigate(["login"]);
            this.isLoading = false;
          } else {
            this.dialogService.openServerErrorDialog(
              response.error.message,
              response.error.code
            );
            this.isLoading = false;
          }
        });
    }, 2000);
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get("password")?.value;
    const confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
  togglePassword() {
    this.passwordTextType = !this.passwordTextType;
  }
  toggleNewPassword() {
    this.newPasswordTextType = !this.newPasswordTextType;
  }
}
