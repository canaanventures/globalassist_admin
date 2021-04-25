import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
/* [ Constant ] */
import { CONST } from '../../shared/app.constant';
import { UserComponent } from './user.component';
import { HomeComponent } from 'src/app/pages/user/home/home.component';
import { ForgotPasswordComponent } from 'src/app/pages/user/forgot-password/forgot-password.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { AddUsersComponent } from 'src/app/pages/user/add-users/add-users.component';
import { MembersListComponent } from 'src/app/pages/user/members-list/members-list.component';
import { ReportApprovalComponent } from 'src/app/pages/user/report-approval/report-approval.component';
import { ReportHistoryComponent } from 'src/app/pages/user/report-history/report-history.component';
import { SendReportComponent } from 'src/app/pages/user/send-report/send-report.component';


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
      redirectTo: 'profile'
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
    },
    {
      path: CONST.PATH.USER.MEMBERLIST.SELF,
      component: MembersListComponent,
      data: {
        title: CONST.PATH.USER.MEMBERLIST.TITLE
      }
    },
    {
      path: CONST.PATH.USER.REPORTAPPROVAL.SELF,
      component: ReportApprovalComponent,
      data: {
        title: CONST.PATH.USER.REPORTAPPROVAL.TITLE
      }
    },
    {
      path: CONST.PATH.USER.REPORTHISTORY.SELF,
      component: ReportHistoryComponent,
      data: {
        title: CONST.PATH.USER.REPORTHISTORY.TITLE
      }
    },
    {
      path: CONST.PATH.USER.SENDREPORT.SELF,
      component: SendReportComponent,
      data: {
        title: CONST.PATH.USER.SENDREPORT.TITLE
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
    AddUsersComponent,
    MembersListComponent,
    ReportApprovalComponent,
    ReportHistoryComponent,
    SendReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    DxDataGridModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class UserModule { }
