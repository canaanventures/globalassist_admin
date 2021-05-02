import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent extends UserComponent implements OnInit {
  OrganizationList: Array<any> = [];
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
    this.ApiService.getAll('/org/getallorg', "").subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.OrganizationList = response.data;
      this.spinner.hide();
    })
  }

  Action(org, action) {
    if (action == 'info')
      sessionStorage.setItem("readonly", 'true');
    else
      sessionStorage.setItem("readonly", 'false');
    sessionStorage.setItem('orgId', org.data.id);
    this.router.navigateByUrl('/addorg');
  }

}
