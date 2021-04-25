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
    this.reportForm = new FormGroup({
      Id: new FormControl(0, [Validators.required]),
      UserId: new FormControl("", [Validators.required]),
      AppMonth: new FormControl("", [Validators.required]),
      NoOfVillages: new FormControl("", [Validators.required]),
      NoOfPersonHeard: new FormControl("", [Validators.required]),
      NoOfMen: new FormControl("", [Validators.required]),
      NoOfWomen: new FormControl("", [Validators.required]),
      NoOfChildren: new FormControl("", [Validators.required]),
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
      SupervisorRemarks: response.isVideoShared,
      CoordinatorRemarks: response.isVideoShared
    })
  }

  onReportSubmit() {
    this.isSubmitted = true;
    if (this.reportForm.valid) {
      this.spinner.show();
      this.ApiService.getAll('/auth/login', this.reportForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
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
