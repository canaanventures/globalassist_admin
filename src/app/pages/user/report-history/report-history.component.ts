import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-report-history',
  templateUrl: './report-history.component.html',
  styleUrls: ['./report-history.component.scss']
})
export class ReportHistoryComponent extends UserComponent implements OnInit {
  ReportList: Array<any> = [];
  user: any = JSON.parse(sessionStorage.getItem('globalassist'));
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
    this.ApiService.getAll('/report/getreports', { OperationId: 3, PostedBy: this.user.Id }).subscribe(response => {
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
    else if (action == 'edit') {
      sessionStorage.setItem('reportId', report.data.Id);
      sessionStorage.setItem("readonly", 'false');
      this.router.navigateByUrl('/sendreport');
    }
    else {

    }
  }

}
