import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Message} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host: string = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.host}/user/login`, user, {observe: 'response'});
  }

  public register(user: User): Observable<any> {
    return this.http.post<User>(
      `${this.host}/user/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') { // check if token is not null
      this.logOut();
      return false;
    }
    if (this.jwtHelper.decodeToken(this.token)?.sub != null || '') { // check token if return null after decoded
      return false;
    }
    if (!this.jwtHelper.isTokenExpired(this.token)) { // check if token not expired
      this.loggedInUsername = this.jwtHelper.decodeToken().sub;
      return true;
    }
    return false;
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

}
