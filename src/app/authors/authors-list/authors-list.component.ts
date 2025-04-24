import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { AuthorGetDto } from "src/app/shared/models/author-get-dto";
import { ResultResponse } from "src/app/shared/models/result-response";
import { AuthorService } from "src/app/shared/services/author.service";

@Component({
  selector: "app-authors-list",
  templateUrl: "./authors-list.component.html",
  styleUrls: ["./authors-list.component.css"]
})
export class AuthorsListComponent implements OnInit {
  authorsDatasource: MatTableDataSource<AuthorGetDto>;
  authorsColumns: string[] = ["Name", "Biography", "DateOfBirth", "Id"];
  isAuthorLoading: boolean = false;
  timer: any = 0;

  constructor(private authorsService: AuthorService) {}
  ngOnInit(): void {
    this.authorsDatasource = new MatTableDataSource();
    this.loadAuthors();
  }
  loadAuthors() {
    this.isAuthorLoading = true;
    this.timer = setTimeout(() => {
      this.authorsService
        .loadAuthors()
        .subscribe((response: ResultResponse<AuthorGetDto[]>) => {
          if (response.isSuccess === true) {
            this.authorsDatasource.data = response.body;
            if (this.timer) {
              clearTimeout(this.timer);
            }
            this.isAuthorLoading = false;
          }
        });
    }, 2000);
  }
}
