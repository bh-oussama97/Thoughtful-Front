import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ArticleGetDto } from "src/app/shared/models/article-get-dto";
import { AuthorGetDto } from "src/app/shared/models/author-get-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { ArticleService } from "src/app/shared/services/article.service";
import { AuthorService } from "src/app/shared/services/author.service";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "app-add-author-article-modal",
  templateUrl: "./add-author-article-modal.component.html",
  styleUrls: ["./add-author-article-modal.component.css"]
})
export class AddAuthorArticleModalComponent implements OnInit {
  authors: AuthorGetDto[] = [];

  authorSelected: AuthorGetDto;
  isLoading: boolean = false;
  timer: any = 0;
  constructor(
    public dialogRef: MatDialogRef<AddAuthorArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authorservice: AuthorService,
    private dialogService: DialogService,
    private articleService: ArticleService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadAuthors();
  }
  loadAuthors() {
    this.authorservice
      .loadAuthors()
      .subscribe((response: ResultResponse<AuthorGetDto[]>) => {
        if (response.isSuccess === true) {
          this.authors = response.body;
          if (this.data) {
            this.authorSelected = this.authors.find(
              (c) => c.id === this.data.author.id
            );
          }
        } else {
          this.dialogService.openServerErrorDialog(
            response.error.message,
            response.error.code
          );
        }
      });
  }

  save() {
    this.isLoading = true;
    this.timer = setTimeout(() => {
      this.articleService
        .setAuthor(this.authorSelected.id, this.data.articleSelected.id)
        .subscribe((response: ResultResponse<ArticleGetDto>) => {
          if (response.isSuccess === true) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Author has been added successfully",
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
}
