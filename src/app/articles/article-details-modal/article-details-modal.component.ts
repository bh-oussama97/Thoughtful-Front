import { Component, Inject, OnInit } from "@angular/core";
import { ArticleGetDto } from "src/app/shared/models/article-get-dto";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-article-details-modal",
  templateUrl: "./article-details-modal.component.html",
  styleUrls: ["./article-details-modal.component.css"]
})
export class ArticleDetailsModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ArticleGetDto,
    public dialogRef: MatDialogRef<ArticleDetailsModalComponent>
  ) {}
  ngOnInit(): void {}
}
