import { Injectable } from "@angular/core";
import { LoginRequestDTO } from "../models/login-request-dto";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { ResultResponse } from "../models/result-response";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserGetDTO } from "../models/user-get-dto";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RegisterDTO } from "../models/register-dto";
import { ResetPasswordDTO } from "../models/reset-password-dto";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  private userSubject = new BehaviorSubject<UserGetDTO | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(
    private httpClient: HttpClient
  ) {
    this.loadUser();
  }
  login(request: LoginRequestDTO): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.post<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + "/Users/Login",
      request
    );
  }
  register(request: RegisterDTO): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.post<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + "/Users/Register",
      request
    );
  }
  saveProfileInformations(
    request: any
  ): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.post<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + "/Users/SaveUserProfileInformations",
      request
    );
  }

  getUserData(): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.get<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + "/Users/GetUserData"
    );
  }
  SendPasswordResetCode(email: string): Observable<ResultResponse<string>> {
    return this.httpClient.post<ResultResponse<string>>(
      `${environment.apiEndpoint}/Users/SendPasswordResetCode?email=${email}`,
      null
    );
  }

  ResetPassword(data: ResetPasswordDTO): Observable<ResultResponse<string>> {
    return this.httpClient.post<ResultResponse<string>>(
      `${environment.apiEndpoint}/Users/ResetPassword`,
      data
    );
  }

  updateAvatar(newAvatarUrl: string) {
    const currentUser = this.userSubject.value;
    if (currentUser) {
      this.userSubject.next({ ...currentUser, avatar: newAvatarUrl });
    }
  }

  save_login_info(user: UserGetDTO) {
    localStorage.setItem("user", JSON.stringify(user));
    this.userSubject.next(user);
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }
  getUser(): UserGetDTO | null {
    return this.userSubject.value;
  }

  isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.userSubject.next(null);
  }

  loadUser() {
    const user = localStorage.getItem("user");
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
}
