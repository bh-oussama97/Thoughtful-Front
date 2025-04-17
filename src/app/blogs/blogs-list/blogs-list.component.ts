import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BlogGetDTO } from 'src/app/shared/models/blog-get-dto';
import { ResultResponse } from 'src/app/shared/models/result-response';
import { BlogService } from 'src/app/shared/services/blog.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css'],
})
export class BlogsListComponent implements OnInit {

  isBlogLoading: boolean = false;
  blogDatasource: MatTableDataSource<BlogGetDTO>;
  authorsColumns: string[] = ['Name', 'Description', 'CreatedDate'];
  timer:any=0;
  constructor(private blogService:BlogService,private dialogService:DialogService){}
  ngOnInit(): void {
    this.blogDatasource = new MatTableDataSource();
    this.loadBlogs();
  }
  loadBlogs(){
    this.isBlogLoading=true;
            this.timer = setTimeout(()=>{
              this.blogService.getBlogs().subscribe((response:ResultResponse<BlogGetDTO[]>)=>{
                if(response.isSuccess === true)
                {
                  this.blogDatasource.data = response.body;
                  if(this.timer) {
                    clearTimeout(this.timer);
                }
            
                this.isBlogLoading = false;
                }
                else{
                  this.dialogService.openServerErrorDialog(
                    response.error.message,
                    response.error.code
                  );
                }
              });
            },2000);
  }
}
