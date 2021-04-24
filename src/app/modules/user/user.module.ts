import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
/* [ Constant ] */
import { CONST } from '../../shared/app.constant';
import { UserComponent } from './user.component';
import { HomeComponent } from 'src/app/pages/user/home/home.component';
import { ForgotPasswordComponent } from 'src/app/pages/user/forgot-password/forgot-password.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { AddUsersComponent } from 'src/app/pages/user/add-users/add-users.component';


const routes: Routes = [{
  path: '',
  component: UserComponent,
  data: {
    title: 'user'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: CONST.PATH.USER.HOME.SELF,
      component: HomeComponent,
      data: {
        title: CONST.PATH.USER.HOME.TITLE
      }
    },
    {
      path: CONST.PATH.USER.FORGET_PASSWORD.SELF,
      component: ForgotPasswordComponent,
      data: {
        title: CONST.PATH.USER.FORGET_PASSWORD.TITLE
      }
    },
    {
      path: CONST.PATH.USER.PROFILE.SELF,
      component: UserProfileComponent,
      data: {
        title: CONST.PATH.USER.PROFILE.TITLE
      }
    },
    {
      path: CONST.PATH.USER.ADDUSERS.SELF,
      component: AddUsersComponent,
      data: {
        title: CONST.PATH.USER.ADDUSERS.TITLE
      }
    }
  ]
}];

@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    ForgotPasswordComponent,
    UserProfileComponent,
    AddUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class UserModule { }
