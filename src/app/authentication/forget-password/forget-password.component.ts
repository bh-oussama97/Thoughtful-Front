import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../shared/services/users.service";
import { ResultResponse } from "../../shared/models/result-response";
import { DialogService } from "../../shared/services/dialog.service";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Component({
  selector: "app-forget-password",
  templateUrl: "./forget-password.component.html",
  styleUrls: ["./forget-password.component.scss"]
})
export class ForgetPasswordComponent implements OnInit {
  selectedEmail: string = "";
  isLoading: boolean = false;

  constructor(
    private userService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  onForgetPassword(event: any) {
    if (event.keyCode === 13) {
      this.forgetPassword();
    }
  }
forgetPassword() {
  this.isLoading = true;

  this.userService
    .SendPasswordResetCode(this.selectedEmail)
    .subscribe((result: ResultResponse<string>) => {
      if (result.isSuccess === true) {
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: result.body,
          life: 3000 
        });

        setTimeout(() => {
          this.router.navigate([`reset-password/${this.selectedEmail}`]);
        }, 3000);

      } else {
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: result.body,
          life: 2000 
        });
      }

      this.isLoading = false;
    });
}

}
