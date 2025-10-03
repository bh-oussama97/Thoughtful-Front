import { Component, ElementRef, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ResultResponse } from "src/app/shared/models/result-response";
import { UserGetDTO } from "src/app/shared/models/user-get-dto";
import { BlogService } from "src/app/shared/services/blog.service";
import { DialogService } from "src/app/shared/services/dialog.service";
import { UsersService } from "src/app/shared/services/users.service";

@Component({
  selector: "app-add-contribution-modal",
  templateUrl: "./add-contribution-modal.component.html",
  styleUrls: ["./add-contribution-modal.component.scss"]
})
export class AddContributionModalComponent {
  File: ElementRef;
  selectedFile: File = null;
  note: string = "";
  connectedUser: UserGetDTO;
  isLoading: boolean = false;
  timer: any = 0;

  constructor(
    public dialogRef: MatDialogRef<AddContributionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private blogService: BlogService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.connectedUser = this.userService.getUser() as UserGetDTO;
  }
  add() {
    this.isLoading = true;
    const formData = new FormData();
    formData.append("BlogId", this.data.blog.id);
    formData.append("ContributorId", this.connectedUser.id);
    formData.append("Note", this.note);
    formData.append("File", this.selectedFile, this.selectedFile.name);

    this.timer = setTimeout(() => {
      this.blogService
        .addContribution(formData)
        .subscribe((response: ResultResponse<string>) => {
          if (response["isSuccess"] === true) {
            this.isLoading = false;
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: response.body,
                          life: 3000
            });
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.dialogRef.close(true);
          } else {
            this.dialogService.openServerErrorDialog(
              response.error.message,
              response.error.code
            );
          }
          this.isLoading = false;
        });
    }, 2000);
  }
  onFileUploadChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  deleteFiles() {
    this.selectedFile = null;
  }
  isValid() {
    return this.selectedFile !== null && this.note !== "";
  }
}
