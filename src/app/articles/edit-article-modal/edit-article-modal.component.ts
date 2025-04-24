import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MessageService } from "primeng/api";
import { ArticleDTO } from "src/app/shared/models/article-dto";
import { ArticleGetDto } from "src/app/shared/models/article-get-dto";
import { AuthorGetDto } from "src/app/shared/models/author-get-dto";
import { CategoryGetDto } from "src/app/shared/models/category-get-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { ArticleService } from "src/app/shared/services/article.service";
import { AuthorService } from "src/app/shared/services/author.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { DialogService } from "src/app/shared/services/dialog.service";

@Component({
  selector: "app-edit-article-modal",
  templateUrl: "./edit-article-modal.component.html",
  styleUrls: ["./edit-article-modal.component.scss"]
})
export class EditArticleModalComponent implements OnInit {
  request: ArticleDTO;
  authors: AuthorGetDto[] = [];
  authorSelected: AuthorGetDto;

  isLoading: boolean = false;
  categories: CategoryGetDto[] = [];
  categorySelected: CategoryGetDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { articleSelected: ArticleGetDto },
    private authorservice: AuthorService,
    private dialogService: DialogService,
    private articleService: ArticleService,
    private messageService: MessageService,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<EditArticleModalComponent>
  ) {}
  ngOnInit(): void {
    this.loadAuthors();
    this.loadCategories();
    this.request = this.initiateRequest();
  }

  initiateRequest(): ArticleDTO {
    return {
      Title: this.data.articleSelected.title,
      Subtitle: this.data.articleSelected.subtitle,
      Body: this.data.articleSelected.body,
      AuthorId: this.data.articleSelected.authorId,
      CategoryId: this.data.articleSelected.category.id,
      NumberOfLikes: this.data.articleSelected.numberOfLikes,
      NumberOfShares: this.data.articleSelected.numberOfShares
    };
  }

  loadAuthors() {
    this.authorservice
      .loadAuthors()
      .subscribe((response: ResultResponse<AuthorGetDto[]>) => {
        if (response.isSuccess === true) {
          this.authors = response.body;
          if (this.authors) {
            this.authorSelected = this.authors.find(
              (c) => c.id === this.data.articleSelected.author.id
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
  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: ResultResponse<CategoryGetDto[]>) => {
        if (response.isSuccess === true) {
          this.categories = response.body;
          if (this.categories) {
            this.categorySelected = this.categories.find(
              (c) => c.id === this.data.articleSelected.category.id
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
  isValid(): boolean {
    return (
      this.request.Title !== "" &&
      this.request.Subtitle !== "" &&
      this.request.Body !== "" &&
      this.request.AuthorId !== null &&
      this.request.CategoryId !== null &&
      this.request.NumberOfLikes !== null &&
      this.request.NumberOfShares !== null
    );
  }
  save() {
    this.articleService
      .updateArticle(this.request, this.data.articleSelected.id)
      .subscribe((result: ResultResponse<ArticleGetDto>) => {
        if (result.isSuccess) {
          this.messageService.add({
            severity: "success",
            summary: "Success",
            detail: "Article has been updated successfully"
          });
          this.dialogRef.close(true);
        } else {
          this.dialogService.openServerErrorDialog(
            result.error.message,
            result.error.code
          );
        }
      });
  }
  onAuthorChange() {
    if (this.authorSelected !== null) {
      this.request.AuthorId = this.authorSelected.id;
    }
  }
  onCategoryChange() {
    if (this.categorySelected !== null) {
      this.request.CategoryId = this.categorySelected.id;
    }
  }
}
