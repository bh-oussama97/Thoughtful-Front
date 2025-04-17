import { Injectable } from '@angular/core';
import { LoginRequestDTO } from '../models/login-request-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResultResponse } from '../models/result-response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserGetDTO } from '../models/user-get-dto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterDTO } from '../models/register-dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private userSubject = new BehaviorSubject<UserGetDTO | null>(null);
  user$ = this.userSubject.asObservable();
  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {this.loadUser();}
  login(request: LoginRequestDTO): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.post<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + '/Users/Login',
      request
    );
  }
  register(request: RegisterDTO): Observable<ResultResponse<UserGetDTO>> {
    return this.httpClient.post<ResultResponse<UserGetDTO>>(
      environment.apiEndpoint + '/Users/Register',
      request
    );
  }


  // saveLoginInfos(usersData: UserGetDTO) {
  //   const userJson = JSON.stringify(usersData);
  //   localStorage.setItem('userJson', userJson);
  // }
  // getLoginInfo(): UserGetDTO {
  //   const userJson = localStorage.getItem('userJson');
  //   return JSON.parse(userJson);
  // }
  // logout() {
  //   localStorage.clear();
  // }
  // setToken(token: string) {
  //   localStorage.setItem('Token', token);
  // }
  // getToken() {
  //   return localStorage.getItem('Token');
  // }
  save_login_info(user: UserGetDTO) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken()
  {
    return localStorage.getItem('token');
  }
  getUser(): UserGetDTO | null {
    return this.userSubject.value;
  }

  isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }

  private loadUser() {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
}
