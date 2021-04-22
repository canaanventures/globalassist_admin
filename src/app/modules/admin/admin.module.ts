import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/* [ Shared Module ] */
import { AppSharedModule } from '../../shared/app.shared.module';
/* [ Constant ] */
import { CONST } from '../../shared/app.constant';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from 'src/app/pages/admin/dashboard/dashboard.component';
import { ToastrModule } from "ngx-toastr";


const routes: Routes = [{
  path: '',
  component: AdminComponent,
  data: {
    title: 'admin'
  },
  children: [
    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'dashboard'
    }
  ]
}];

@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
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
export class AdminModule { }
