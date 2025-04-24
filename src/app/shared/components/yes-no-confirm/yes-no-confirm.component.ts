import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { YesNoConfirmModel } from "../../models/yes-no-confirm-model";

@Component({
  selector: "app-yes-no-confirm",
  templateUrl: "./yes-no-confirm.component.html",
  styleUrls: ["./yes-no-confirm.component.css"]
})
export class YesNoConfirmComponent implements OnInit {
  message: string[] = [];
  formatMessageAsList = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: YesNoConfirmModel,
    private dialogRef: MatDialogRef<YesNoConfirmComponent>
  ) {}
  ngOnInit(): void {
    if (Array.isArray(this.data.message) === true) {
      this.message = this.data.message as string[];
    } else {
      this.message = [this.data.message as string];
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
