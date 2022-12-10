import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {Message} from "primeng/api";
import {firstValueFrom} from "rxjs";
import {User} from "../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {HeaderType} from "../enum/header-type.enum";
import {FormBuilder, FormGroup} from "@angular/forms";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public isLoadingSignIn: boolean = false;
  public user: User;
  public authMessage: Message[];
  public loginForm: FormGroup;

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [RxwebValidators.required()]],
      userPassword: ['', [RxwebValidators.required()]]
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }
  }

  ngOnDestroy(): void {
  }

  async onLogin(user: User): Promise<void> {
    this.isLoadingSignIn = true;
    const login = await firstValueFrom(this.authenticationService.login(user)).catch((err: HttpErrorResponse) => {
      this.authMessage = [{severity: 'error', summary: 'Error', detail: this.checkMessage(err.message)}];
      return this.isLoadingSignIn = false;
    });
    const loginResponse = login as HttpResponse<any>;
    const token = loginResponse.headers.get(HeaderType.JWT_TOKEN);
    this.authenticationService.saveToken(token);
    this.authenticationService.addUserToLocalCache(loginResponse.body);
    await this.router.navigateByUrl('/user/management');
    this.isLoadingSignIn = false;
  }

  checkMessage(message: string): string {
    return message ? message : "An error occurred, please try again";
  }

}
