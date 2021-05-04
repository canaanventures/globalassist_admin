import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent extends UserComponent implements OnInit {
  addMemberForm: FormGroup;
  isSubmitted: boolean = false;
  organizationList: Array<any> = [];
  CoordinatorList: Array<any> = [];
  SupervisorList: Array<any> = [];
  memberId: Number = sessionStorage.getItem('memberId') !== null ? parseInt(sessionStorage.getItem('memberId')) : 0;
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
    this.addMemberForm = new FormGroup({
      Id: new FormControl(0, [Validators.required]),
      Salutations: new FormControl("Mr.", [Validators.required]),
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      RoleId: new FormControl("5", [Validators.required]),
      EmailId: new FormControl("", [Validators.required, Validators.email]),
      PhoneNo: new FormControl("", [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
      Address: new FormControl("", []),
      OrgId: new FormControl(this.user.RoleId > 2 ? this.user.OrgId : "", []),
      State: new FormControl("", []),
      Country: new FormControl("", []),
      Pincode: new FormControl("", []),
      CoordinatorId: new FormControl({ value: "", disabled: true }, []),
      SupervisorId: new FormControl({ value: "", disabled: true }, []),
      UserId: new FormControl(this.user.Id, [Validators.required]),
    })
    if (this.user.RoleId > 2) {
      this.onOrganizationChange(this.user.OrgId);
      this.addMemberForm.controls['OrgId'].disable();
    }
  }


  ngOnInit(): void {
    this.spinner.show();
    this.ApiService.getAll('/org/getallorg', { OrgId: 0 }).subscribe(response => {
      if (!(response as any).isSuccess)
        this.toastr.error((response as any).message);
      else
        this.organizationList = response.data;
      this.spinner.hide();
    })
  }

  setFormValue(response) {
    this.addMemberForm.patchValue({
      Id: response.Id,
      Salutations: response.Salutations,
      FirstName: response.FirstName,
      LastName: response.LastName,
      RoleId: response.RoleId,
      EmailId: response.EmailId,
      PhoneNo: response.PhoneNo,
      isActive: response.isActive
    })
    if (response.RoleId !== 1 && response.RoleId !== 2) {
      this.addMemberForm.patchValue({
        OrgId: response.OrgId,
        Address: response.Address,
        State: response.State,
        Country: response.Country,
        Pincode: response.Pincode,
        CoordinatorId: response.CoordinatorId
      })

      if (response.RoledId == 5) {
        this.addMemberForm.patchValue({
          SupervisorId: response.SupervisorId
        })
      }
    }
  }

  onOrganizationChange(orgId) {
    if (orgId != '') {
      this.spinner.show();
      this.ApiService.getAll('/user/getusers', { OperationId: 3, OrgId: orgId }).subscribe(response1 => {
        if (!(response1 as any).isSuccess)
          this.toastr.error((response1 as any).message);
        else {
          this.CoordinatorList = response1.data.filter(x => x.RoleId == 3)
          this.SupervisorList = response1.data.filter(x => x.RoleId == 4)
          this.addMemberForm.controls['CoordinatorId'].enable();
          this.addMemberForm.controls['SupervisorId'].enable();
        }
        this.spinner.hide();
      })
    }
    else {
      this.CoordinatorList = [];
      this.SupervisorList = [];
      this.addMemberForm.controls['CoordinatorId'].disable();
      this.addMemberForm.controls['SupervisorId'].disable();
    }
  }

  onFormSubmit() {
    this.isSubmitted = true;
    if (this.addMemberForm.valid) {
      this.spinner.show();
      this.ApiService.create('/user/addusers', this.addMemberForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.isSubmitted = false;
          this.addMemberForm.reset();
          this.toastr.success(response.message);
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
  }



}
