import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthorGetDto } from "../models/author-get-dto";
import { ResultResponse } from "../models/result-response";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthorService {
  constructor(private httpClient: HttpClient) {}

  loadAuthors(): Observable<ResultResponse<AuthorGetDto[]>> {
    return this.httpClient.get<ResultResponse<AuthorGetDto[]>>(
      environment.apiEndpoint + "/Authors/GetAuthors"
    );
  }
}
