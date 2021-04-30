import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';
@Component({
  selector: 'app-report-approval',
  templateUrl: './report-approval.component.html',
  styleUrls: ['./report-approval.component.scss']
})
export class ReportApprovalComponent extends UserComponent implements OnInit {
  ReportList: Array<any> = [];
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    ApiService: ApiService,
    location: Location,
    spinner: NgxSpinnerService,
    toastr: ToastrService
  ) {
    super(
      activatedRoute,
      router,
      ApiService,
      location,
      spinner,
      toastr
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.ApiService.getAll('/report/getreports', { OperationId: this.user.RoleId == 3 ? 5 : 6, SupervisorId: this.user.Id, CoordinatorId: this.user.Id }).subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.ReportList = response.data;
      this.spinner.hide();
    })
  }

  Action(report, action) {
    if (action == 'info') {
      sessionStorage.setItem('reportId', report.data.Id);
      sessionStorage.setItem("readonly", 'true');
      this.router.navigateByUrl('/sendreport');
    }
    else {
      this.spinner.show();
      this.ApiService.create('/report/approvereport', { RoleId: this.user.RoleId, ReportId: report.data.Id, isApproved: action == 'approve' ? true : false, Remarks: '', userId: this.user.Id }).subscribe(response => {
        if ((response as any).isSuccess) {
          this.toastr.success((response as any).message);
          this.ReportList = response.data;
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
  }

}
