import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CONST } from './shared/app.constant';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthInterceptor } from './shared/auth-interceptor';
import { ResponseInterceptor } from './shared/response-interceptor';
import { ApiService } from './shared/app.service';
import { AppSharedModule } from './shared/app.shared.module';
import { SidebarModule } from 'ng-sidebar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './pages/user/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: CONST.PATH.LOGIN.SELF,
    component: LoginComponent
  },
  {
    path: CONST.PATH.USER.RESET_PASSWORD.SELF,
    component: ForgotPasswordComponent
  }];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppSharedModule,
    NgxSpinnerModule,
    SidebarModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
