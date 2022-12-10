import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationService} from "./service/authentication.service";
import {UserService} from "./service/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {ButtonModule} from "primeng/button";
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {UserComponent} from './user/user.component';
import {AuthenticationGuard} from "./guard/authentication.guard";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {CarouselModule} from "primeng/carousel";
import {DividerModule} from "primeng/divider";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessagesModule} from "primeng/messages";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RxFormBuilder, RxReactiveFormsModule} from "@rxweb/reactive-form-validators";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CarouselModule,
    CheckboxModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    RippleModule,
    HttpClientModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
