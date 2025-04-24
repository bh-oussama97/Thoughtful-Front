import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ResultResponse } from '../models/result-response';
import { BlogGetDTO } from '../models/blog-get-dto';
import { environment } from 'src/environments/environment';
import { ContributionDTO } from '../models/contribution-dto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient:HttpClient) { }
  getBlogs():Observable<ResultResponse<BlogGetDTO[]>>{
    return this.httpClient.get<ResultResponse<BlogGetDTO[]>>(environment.apiEndpoint + "/Blogs/GetBlogs");
  }

  addContribution(constribution) :Observable<ResultResponse<string>>
  {
    return this.httpClient.post<ResultResponse<string>>(environment.apiEndpoint + "/Blogs/AddContribution",constribution);

  }

  downloadFileByName(filename: string) {
    const url = environment.apiEndpoint + '/Blogs/GetFile?filename=' + filename;
    return this.httpClient.get(url, { responseType: "blob" })
    
  }
}
