import {Injectable} from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {CustomHttpResponse} from "../model/custom-http-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

  public resetPassword(email: string): Observable<any> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/ressetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(userId: number): Observable<any> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
  }

  public addUserToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    let users: User[] = JSON.parse(localStorage.getItem('users'));
    if (users) {
      return users;
    }
    return null;
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('isActive', JSON.stringify(user.isActive));
    formData.append('isNotLocked', JSON.stringify(user.isNotLocked));
    formData.append('profileImage', profileImage);
    return formData;
  }
}
