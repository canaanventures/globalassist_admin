import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-overall-report',
  templateUrl: './overall-report.component.html',
  styleUrls: ['./overall-report.component.scss']
})
export class OverallReportComponent extends UserComponent implements OnInit {
  ReportsList: Array<any> = [];
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
    this.ApiService.getAll('/report/overallreport', {
      OperationId: this.user.RoleId == 1 || this.user.RoleId == 2 || this.user.RoleId == 6 ? 1 : this.user.RoleId == 3 ? 3 : 4,
      CoordinatorId: this.user.Id, SupervisorId: this.user.Id
    }).subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.ReportsList = response.data;
      this.spinner.hide();
    })
  }

  Action(report, action) {
    if (action == 'info') {
      sessionStorage.setItem('reportId', report.data.Id);
      sessionStorage.setItem("readonly", 'true');
      this.router.navigateByUrl('/sendreport');
    }
  }

}
