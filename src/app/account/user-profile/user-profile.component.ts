import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import {
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { MessageService } from "primeng/api";
import { ResultResponse } from "src/app/shared/models/result-response";
import { UserGetDTO } from "src/app/shared/models/user-get-dto";
import { UserProfileDto } from "src/app/shared/models/user-profile-dto";
import { DialogService } from "src/app/shared/services/dialog.service";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  faSave = faArrowDown;

  avatarUrl: string = "../../../../assets/images/avatar_profile.png";
  isLoading: boolean = false;

  @ViewChild("fileInput") fileInput!: ElementRef<HTMLInputElement>;
  userData: UserGetDTO;
  userProfile: UserProfileDto = {
    id: "",
    userName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    avatar: ""
  };
  selectedFile: File = null;
  passwordTextType: boolean = false;
newPasswordTextType: boolean = false;
  constructor(
    private userService: UsersService,
    private dialogService: DialogService,
    private router: Router,
        private messageService: MessageService,
    
  ) {}
  ngOnInit(): void {
    this.userData = this.userService.getUser();

    this.userService.getUserData().subscribe((response:ResultResponse<UserGetDTO>)=>{
      if(response.isSuccess === true)
      {
          this.userProfile.email = response.body.email;
          this.userProfile.userName = response.body.userName;
          this.avatarUrl = response.body.avatar === null ? this.avatarUrl :response.body.avatar ;
      }
    });
  }
  onAvatarClick(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
 saveProfile() {
  this.isLoading = true;
  const formData = new FormData();
  formData.append("Id", this.userData.id);
  formData.append("UserName", this.userProfile.userName);
  formData.append("Email", this.userProfile.email);
  formData.append("OldPassword", this.userProfile.oldPassword);
  formData.append("NewPassword", this.userProfile.newPassword);
  formData.append("Avatar", this.selectedFile, this.selectedFile.name);

  setTimeout(() => {
    this.userService.saveProfileInformations(formData).subscribe({
      next: (response: ResultResponse<UserGetDTO>) => {
        if (response.isSuccess === true) {
          this.userService.updateAvatar(this.selectedFile.name);
                    this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "profile has been added successfully"
          });
          this.router.navigate(["user-profile"]);
        } else {
          this.dialogService.openServerErrorDialog(
            response.error.message,
            response.error.code
          );
        }
        this.isLoading = false;
      },
      error: (error) => {
        // Handle HTTP errors, e.g., 400 validation errors
        console.error('API error', error);

        if (error.status === 400 && error.error?.errors) {
          const validationErrors = error.error.errors;

          // Example: display NewPassword error
          if (validationErrors.NewPassword) {
            const msg = validationErrors.NewPassword.join(', ');
            this.dialogService.openServerErrorDialog(msg);
          }

          // Or iterate all errors
          Object.keys(validationErrors).forEach(field => {
            const messages = validationErrors[field];
            console.warn(`${field}: ${messages.join(', ')}`);
          });
        } else {
          this.dialogService.openServerErrorDialog(
            error.message || 'An unexpected error occurred',
            error.status
          );
        }

        this.isLoading = false;
      }
    });
  }, 2000);
}
togglePassword() {
    this.passwordTextType = !this.passwordTextType;
  }
  toggleNewPassword() {
    this.newPasswordTextType = !this.newPasswordTextType;
  }
}
