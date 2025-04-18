import { Injectable } from '@angular/core';
import {
  HttpClient
} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ArticleGetDto } from '../models/article-get-dto';
import { ResultResponse } from '../models/result-response';
import { ArticleDTO } from '../models/article-dto';
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient:HttpClient) { }

  getArticlesList() : Observable<ResultResponse<ArticleGetDto[]>>
  {
      return this.httpClient.get<ResultResponse<ArticleGetDto[]>>(environment.apiEndpoint +"/Article/GetArticles");
  }

  addCategoryToArticle(categoryId:number,articleId:number):Observable<ResultResponse<ArticleGetDto>>{
    return this.httpClient.put<ResultResponse<ArticleGetDto>>(environment.apiEndpoint +"/Article/AddCategory?id="+articleId+"&categoryId="+categoryId,null);
  }

  setAuthor(authorId:number,articleId:number):Observable<ResultResponse<ArticleGetDto>>{
    return this.httpClient.put<ResultResponse<ArticleGetDto>>(environment.apiEndpoint +"/Article/SetAuthor?id="+articleId+"&authorId="+authorId,null);
  }
  deleteArticle(articleId:number):Observable<ResultResponse<string>>{
    return this.httpClient.delete<ResultResponse<string>>(environment.apiEndpoint +"/Article/DeleteArticle?id="+articleId);

  }

  addArticle(articleDto:ArticleDTO):Observable<ResultResponse<ArticleGetDto>>{
    return this.httpClient.post<ResultResponse<ArticleGetDto>>(environment.apiEndpoint +"/Article/CreateArticle",articleDto);

  }
}
