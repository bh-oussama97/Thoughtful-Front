import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { ArticleDTO } from 'src/app/shared/models/article-dto';
import { ArticleGetDto } from 'src/app/shared/models/article-get-dto';
import { AuthorGetDto } from 'src/app/shared/models/author-get-dto';
import { CategoryGetDto } from 'src/app/shared/models/category-get-dto';
import { ResultResponse } from 'src/app/shared/models/result-response';
import { ArticleService } from 'src/app/shared/services/article.service';
import { AuthorService } from 'src/app/shared/services/author.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.scss'],
})
export class AddArticleModalComponent implements OnInit {
  authors: AuthorGetDto[] = [];
  authorSelected: AuthorGetDto = null;

  isLoading: boolean = false;
  categories: CategoryGetDto[] = [];

  request: ArticleDTO;
  categorySelected: CategoryGetDto = null;

  constructor(
    public dialogRef: MatDialogRef<AddArticleModalComponent>,
    private authorservice: AuthorService,
    private dialogService: DialogService,
    private articleService: ArticleService,
        private messageService: MessageService,
            private categoryService: CategoryService,
        
  
  ) {}
  ngOnInit(): void {
    this.request = this.initiateRequest();
    this.loadAuthors();
    this.loadCategories();
  }
  initiateRequest(): ArticleDTO {
    return {
      Title: '',
      Subtitle: '',
      Body: '',
      AuthorId: null,
      CategoryId: null,
      NumberOfLikes: null,
      NumberOfShares: null,
    };
  }
  loadAuthors() {
    this.authorservice
      .loadAuthors()
      .subscribe((response: ResultResponse<AuthorGetDto[]>) => {
        if (response.isSuccess === true) {
          this.authors = response.body;
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
        } else {
          this.dialogService.openServerErrorDialog(
            response.error.message,
            response.error.code
          );
        }
      });
  }
  save() {
    this.isLoading=true;
    console.log('request', this.request);
    this.articleService
      .addArticle(this.request)
      .subscribe((response: ResultResponse<ArticleGetDto>) => {
        if (response.isSuccess === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Article has been added successfully',
          });
          this.dialogRef.close(true);
        } else {
          this.dialogService.openServerErrorDialog(
            response.error.message,
            response.error.code
          );
        }
        this.isLoading=true;
      });
  }

  isValid(): boolean {
    return (
      this.request.Title !== '' &&
      this.request.Subtitle !== '' &&
      this.request.Body !== '' &&
      this.request.AuthorId !== null &&
      this.request.CategoryId !== null &&
      this.request.NumberOfLikes !== null &&
      this.request.NumberOfShares !== null
    );
  }
  onAuthorChange() {
    if (this.authorSelected !== null) {
      this.request.AuthorId = this.authorSelected.id;
    }
  }
  onCategoryChange(){
    if (this.categorySelected !== null) {
      this.request.CategoryId = this.categorySelected.id;
    }
  }
}
