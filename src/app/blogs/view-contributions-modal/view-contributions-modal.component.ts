import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AddContributionModalComponent } from "../add-contribution-modal/add-contribution-modal.component";
import { BlogContributorDto } from "src/app/shared/models/blog-contributor-dto";
import { BlogService } from "src/app/shared/services/blog.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-view-contributions-modal",
  templateUrl: "./view-contributions-modal.component.html",
  styleUrls: ["./view-contributions-modal.component.scss"]
})
export class ViewContributionsModalComponent implements OnInit {
  isLoading: boolean = false;
  timer: any = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { contributors: BlogContributorDto[] },
    private blogService: BlogService,
    public dialogRef: MatDialogRef<AddContributionModalComponent>
  ) {}
  ngOnInit(): void {}
  downloadFile(filename: string) {
    this.isLoading = true;

    this.timer = setTimeout(() => {
      this.blogService
        .downloadFileByName(filename)
        .subscribe((results: Blob) => {
          saveAs(results, filename);
          this.isLoading = false;
          if (this.timer) {
            clearTimeout(this.timer);
          }
        });
    }, 2000);
  }
}
