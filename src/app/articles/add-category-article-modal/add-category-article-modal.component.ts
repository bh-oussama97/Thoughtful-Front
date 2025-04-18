import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleGetDto } from 'src/app/shared/models/article-get-dto';
import { CategoryGetDto } from 'src/app/shared/models/category-get-dto';
import { ResultResponse } from 'src/app/shared/models/result-response';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category-article-modal',
  templateUrl: './add-category-article-modal.component.html',
  styleUrls: ['./add-category-article-modal.component.css'],
})
export class AddCategoryArticleModalComponent implements OnInit {
  categories: CategoryGetDto[] = [];
  categorySelected: CategoryGetDto = null;
  isLoading: boolean = false;
  timer:any=0;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryArticleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private dialogService: DialogService,
    private articleService: ArticleService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService
      .getCategories()
      .subscribe((response: ResultResponse<CategoryGetDto[]>) => {
        if (response.isSuccess === true) {
          this.categories = response.body;
          if (this.data) {
            this.categorySelected = this.categories.find(
              (c) => c.id === this.data.category.id
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
   this.timer= setTimeout(()=>{
      this.articleService
      .addCategoryToArticle(
        this.categorySelected.id,
        this.data.articleSelected.id
      )
      .subscribe((response: ResultResponse<ArticleGetDto>) => {
        if (response.isSuccess === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category has been added successfully',
          });
          if(this.timer) {
            clearTimeout(this.timer);
        }
          this.dialogRef.close(true)
        } else {
          this.dialogService.openServerErrorDialog(
            response.error.message,
            response.error.code
          );
        }
        this.isLoading = false;
      });
    },2000);
   
  }
}
