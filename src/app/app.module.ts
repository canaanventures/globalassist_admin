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

const routes: Routes = [{
  path: CONST.PATH.LOGIN.SELF,
  component: LoginComponent
}];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
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
    RouterModule.forChild(routes),
  ],
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
