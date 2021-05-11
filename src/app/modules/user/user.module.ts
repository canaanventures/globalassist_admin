import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from "ngx-toastr";
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { ChartsModule } from 'ng2-charts';

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
/* [ Constant ] */
import { CONST } from '../../shared/app.constant';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from 'src/app/pages/user/changepassword/changepassword.component';
import { UserProfileComponent } from 'src/app/pages/user/user-profile/user-profile.component';
import { AddUsersComponent } from 'src/app/pages/user/add-users/add-users.component';
import { MembersListComponent } from 'src/app/pages/user/members-list/members-list.component';
import { ReportApprovalComponent } from 'src/app/pages/user/report-approval/report-approval.component';
import { ReportHistoryComponent } from 'src/app/pages/user/report-history/report-history.component';
import { SendReportComponent } from 'src/app/pages/user/send-report/send-report.component';
import { AddOrganizationComponent } from 'src/app/pages/user/add-organization/add-organization.component';
import { OrganizationListComponent } from 'src/app/pages/user/organization-list/organization-list.component';
import { OverallReportComponent } from 'src/app/pages/user/overall-report/overall-report.component';
let user = JSON.parse(sessionStorage.getItem('globalassist'));
let path = '/login';
if (user && user !== null)
  path = '/profile';

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
      redirectTo: path
    },
    {
      path: CONST.PATH.USER.CHANGEPASSWORD.SELF,
      component: ChangePasswordComponent,
      data: {
        title: CONST.PATH.USER.CHANGEPASSWORD.TITLE
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
      path: CONST.PATH.USER.ADDORG.SELF,
      component: AddOrganizationComponent,
      data: {
        title: CONST.PATH.USER.ADDORG.TITLE
      }
    },
    {
      path: CONST.PATH.USER.ORGLIST.SELF,
      component: OrganizationListComponent,
      data: {
        title: CONST.PATH.USER.ORGLIST.TITLE
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
    },
    {
      path: CONST.PATH.USER.OVERALLHISTORY.SELF,
      component: OverallReportComponent,
      data: {
        title: CONST.PATH.USER.OVERALLHISTORY.TITLE
      }
    }
  ]
}];

@NgModule({
  declarations: [
    UserComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    AddUsersComponent,
    MembersListComponent,
    ReportApprovalComponent,
    ReportHistoryComponent,
    SendReportComponent,
    AddOrganizationComponent,
    OrganizationListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppSharedModule,
    DxDataGridModule,
    ChartsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ],
  providers: [],
})
export class UserModule { }
