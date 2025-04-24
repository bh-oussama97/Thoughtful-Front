import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-error-handler-dialog",
  templateUrl: "./error-handler-dialog.component.html",
  styleUrls: ["./error-handler-dialog.component.css"]
})
export class ErrorHandlerDialogComponent {
  public title = "Network Error";
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
}
