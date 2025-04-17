import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultResponse } from '../models/result-response';
import { BlogGetDTO } from '../models/blog-get-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }
  getBlogs():Observable<ResultResponse<BlogGetDTO[]>>{
    return this.httpClient.get<ResultResponse<BlogGetDTO[]>>(environment.apiEndpoint + "/Blogs/GetBlogs");
  }
}
