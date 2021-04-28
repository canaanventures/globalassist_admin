import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from 'src/app/modules/user/user.component';
import * as moment from 'moment';
@Component({
  selector: 'app-send-report',
  templateUrl: './send-report.component.html',
  styleUrls: ['./send-report.component.scss']
})
export class SendReportComponent extends UserComponent implements OnInit {
  reportForm: FormGroup;
  isSubmitted: boolean = false;
  user: any = JSON.parse(sessionStorage.getItem('globalassist'));
  isReadyOnly: Boolean = false;
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
    if (sessionStorage.getItem('reportId') && sessionStorage.getItem('reportId') != null)
      this.getReportById(sessionStorage.getItem('reportId'));
  }

  getReportById(reportId) {
    this.spinner.show();
    this.ApiService.getAll('/report/getreports', { OperationId: 2, ReportId: reportId }).subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.setFormValue(response.data[0])
      this.spinner.hide();
    })
  }


  ngOnInit(): void {
    this.reportForm = new FormGroup({
      Id: new FormControl(0, [Validators.required]),
      UserId: new FormControl(this.user.Id, [Validators.required]),
      AppMonth: new FormControl(moment(new Date()).format('MMMM YYYY'), [Validators.required]),
      NoOfVillages: new FormControl("", [Validators.required]),
      NoOfPersonHeard: new FormControl(0, [Validators.required]),
      NoOfMen: new FormControl(0, [Validators.required]),
      NoOfWomen: new FormControl(0, [Validators.required]),
      NoOfChildren: new FormControl(0, [Validators.required]),
      NoOfNewGroup: new FormControl("", [Validators.required]),
      NoOfLevel1Leader: new FormControl("", [Validators.required]),
      NoOfLevel2Leader: new FormControl("", [Validators.required]),
      NoOfLevel3Leader: new FormControl("", [Validators.required]),
      NoOfVolunteers: new FormControl("", [Validators.required]),
      NoOfSocialProjects: new FormControl("", [Validators.required]),
      NoOfBeneficiaries: new FormControl("", [Validators.required]),
      isGoodPoints: new FormControl("Yes", [Validators.required]),
      GoodPoints: new FormControl("", []),
      isConcernReport: new FormControl("Yes", [Validators.required]),
      ConcernPoints: new FormControl("", []),
      isPhotoShared: new FormControl("Yes", [Validators.required]),
      isVideoShared: new FormControl("Yes", [Validators.required]),
      SupervisorRemarks: new FormControl("", []),
      CoordinatorRemarks: new FormControl("", [])
    });
    if (sessionStorage.getItem('readonly') && sessionStorage.getItem('readonly') != null && (sessionStorage.getItem('readonly') == 'true')) {
      this.isReadyOnly = true;
      this.reportForm.disable();
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('reportId');
    sessionStorage.removeItem('readonly');
  }

  setFormValue(response) {
    this.reportForm.patchValue({
      Id: response.Id,
      AppMonth: response.AppMonth,
      NoOfVillages: response.NoOfVillages,
      NoOfPersonHeard: response.NoOfPersonHeard,
      NoOfMen: response.NoOfMen,
      NoOfWomen: response.NoOfWomen,
      NoOfChildren: response.NoOfChildren,
      NoOfNewGroup: response.NoOfNewGroup,
      NoOfLevel1Leader: response.NoOfLevel1Leader,
      NoOfLevel2Leader: response.NoOfLevel2Leader,
      NoOfLevel3Leader: response.NoOfLevel3Leader,
      NoOfVolunteers: response.NoOfVolunteers,
      NoOfSocialProjects: response.NoOfSocialProjects,
      NoOfBeneficiaries: response.NoOfBeneficiaries,
      isGoodPoints: response.isGoodPoints,
      isConcernReport: response.isConcernReport,
      GoodPoints: response.GoodPoints,
      ConcernPoints: response.ConcernPoints,
      isPhotoShared: response.isPhotoShared,
      isVideoShared: response.isVideoShared,
      SupervisorRemarks: response.SupervisorRemarks == null ? '' : response.SupervisorRemarks,
      CoordinatorRemarks: response.CoordinatorRemarks == null ? '' : response.CoordinatorRemarks
    })
  }

  getPersonHeard() {
    let number = parseInt(this.reportForm.value.NoOfMen) + parseInt(this.reportForm.value.NoOfWomen) + parseInt(this.reportForm.value.NoOfChildren);
    this.reportForm.patchValue({ NoOfPersonHeard: number });
  }

  onReportSubmit() {
    this.isSubmitted = true;
    if (this.reportForm.valid) {
      this.spinner.show();
      this.ApiService.create('/report/submitreport', this.reportForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.reportForm.reset();
          sessionStorage.removeItem('reportId');
          sessionStorage.removeItem('readonly');
          this.toastr.success(response.message);
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.toastr.error((response as any).message);
        }
      })
    }
  }

}
