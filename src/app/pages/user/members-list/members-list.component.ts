import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';
@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent extends UserComponent implements OnInit {
  MemberList: Array<any> = [];
  CommonApi: any;
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
    this.CommonApi = ApiService.api;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.ApiService.getAll('/user/getusers', { OperationId: this.user.RoleId == 3 ? 4 : 1, PostedBy: this.user.Id, CoordinatorId: this.user.Id }).subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.MemberList = response.data;
      this.spinner.hide();
    })
  }

  downloadCVV(fileName) {
    let downloadLink = this.CommonApi + "/recruiter/downloadcvv?fileName=" + fileName;
    window.open(downloadLink);
  }

  Action(report, action) {
    if (action == 'info') {
      sessionStorage.setItem('memberId', report.data.Id);
      sessionStorage.setItem("readonly", 'true');
      this.router.navigateByUrl('/addusers');
    }
    else if (action == 'edit') {
      sessionStorage.setItem('memberId', report.data.Id);
      sessionStorage.setItem("readonly", 'false');
      this.router.navigateByUrl('/addusers');
    }
  }

}
