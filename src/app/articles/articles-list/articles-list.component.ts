import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { ArticleGetDto } from "src/app/shared/models/article-get-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { ArticleService } from "src/app/shared/services/article.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ArticleDetailsModalComponent } from "../article-details-modal/article-details-modal.component";
import { AddCategoryArticleModalComponent } from "../add-category-article-modal/add-category-article-modal.component";
import { AddAuthorArticleModalComponent } from "../add-author-article-modal/add-author-article-modal.component";
import { YesNoConfirmComponent } from "src/app/shared/components/yes-no-confirm/yes-no-confirm.component";
import { MessageService } from "primeng/api";
import { DialogService } from "src/app/shared/services/dialog.service";
import { AddArticleModalComponent } from "../add-article-modal/add-article-modal.component";
import { EditArticleModalComponent } from "../edit-article-modal/edit-article-modal.component";

@Component({
  selector: "app-articles-list",
  templateUrl: "./articles-list.component.html",
  styleUrls: ["./articles-list.component.css"]
})
export class ArticlesListComponent implements OnInit, AfterViewInit {
  articlesDataSource: MatTableDataSource<ArticleGetDto>;
  articlesColumns: string[] = [
    "Title",
    "Subtitle",
    "Body",
    "CreatedDate",
    "NumberOfLikes",
    "NumberOfShares",
    "Id",
    "toolsmenu"
  ];
  isArticlesLoading: boolean = false;
  timer: any = 0;
  @ViewChild(MatSort) sort: MatSort;
  sortedData: ArticleGetDto[] = [];
  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.articlesDataSource = new MatTableDataSource();
    this.loadArticles();
  }
  ngAfterViewInit() {
    this.articlesDataSource.sort = this.sort;
  }
  loadArticles() {
    this.isArticlesLoading = true;
    this.timer = setTimeout(() => {
      this.articleService
        .getArticlesList()
        .subscribe((response: ResultResponse<ArticleGetDto[]>) => {
          if (response.isSuccess === true) {
            this.sortedData = response.body.slice();
            this.articlesDataSource.data = response.body;
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.isArticlesLoading = false;
          }
        });
    }, 2000);
  }
  loadArticleDetails(element) {
    this.dialog.open(ArticleDetailsModalComponent, {
      panelClass: "dialog-default",
      width: "1000px",
      disableClose: true,
      autoFocus: false,
      data: element
    });
  }
  sortData(sort: Sort) {
    const data = this.articlesDataSource.data.slice();
    if (!sort.active || sort.direction === "") {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active.toLowerCase()) {
        case "body":
          return this.compare(a.body, b.body, isAsc);
        case "createddate":
          return this.compare(a.dateCreated, b.dateCreated, isAsc);
        case "numberoflikes":
          return this.compare(a.numberOfLikes, b.numberOfLikes, isAsc);
        case "numberofshares":
          return this.compare(a.numberOfShares, b.numberOfShares, isAsc);
        case "title":
          return this.compare(a.title, b.title, isAsc);
        case "subtitle":
          return this.compare(a.subtitle, b.subtitle, isAsc);
        default:
          return 0;
      }
    });
    this.articlesDataSource.data = this.sortedData;
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  EditArticle(element) {
    this.dialog
      .open(EditArticleModalComponent, {
        panelClass: "dialog-default",
        width: "600px",
        disableClose: true,
        autoFocus: false,
        data: { articleSelected: element }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadArticles();
        }
      });
  }
  addCategory(element) {
    this.dialog
      .open(AddCategoryArticleModalComponent, {
        panelClass: "dialog-default",
        width: "1000px",
        disableClose: true,
        autoFocus: false,
        data: { category: element.category, articleSelected: element }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadArticles();
        }
      });
  }
  deleteArtikel(articleId: number) {
    this.dialog
      .open(YesNoConfirmComponent, {
        data: {
          message: `Are you sure you want to delete article with id ${articleId} ?`,
          title: `Article deletion`,
          yesDisabled: false
        },
        closeOnNavigation: false
      })
      .afterClosed()
      .subscribe((msg) => {
        // do nothing
        if (msg === true) {
          this.articleService
            .deleteArticle(articleId)
            .subscribe((response: ResultResponse<string>) => {
              if (response.isSuccess) {
                this.messageService.add({
                  severity: "success",
                  summary: "Success",
                  detail: response.body
                });
                this.loadArticles();
              } else {
                this.dialogService.openServerErrorDialog(
                  response.error.message,
                  response.error.code
                );
              }
            });
        } else {
        }
      });
  }

  AddAuthor(element) {
    this.dialog
      .open(AddAuthorArticleModalComponent, {
        panelClass: "dialog-default",
        width: "1000px",
        disableClose: true,
        autoFocus: false,
        data: { author: element.author, articleSelected: element }
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadArticles();
        }
      });
  }
  addArticle() {
    this.dialog
      .open(AddArticleModalComponent, {
        panelClass: "dialog-default",
        width: "600px",
        disableClose: true,
        autoFocus: false
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.loadArticles();
        }
      });
  }
}
