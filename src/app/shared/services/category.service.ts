import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryGetDto } from '../models/category-get-dto';
import { ResultResponse } from '../models/result-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

    getCategories() : Observable<ResultResponse<CategoryGetDto[]>>
    {
        return this.httpClient.get<ResultResponse<CategoryGetDto[]>>(environment.apiEndpoint +"/Category/GetCategories");
    }

  
}
