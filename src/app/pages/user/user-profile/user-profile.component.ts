import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserComponent } from 'src/app/modules/user/user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends UserComponent implements OnInit {
  user: any = JSON.parse(sessionStorage.getItem('globalassist'));
  profileForm: FormGroup;
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
    this.profileForm = new FormGroup({
      Id: new FormControl(0, [Validators.required]),
      Salutations: new FormControl("Mr.", [Validators.required]),
      FirstName: new FormControl("", [Validators.required]),
      LastName: new FormControl("", [Validators.required]),
      EmailId: new FormControl("", [Validators.required]),
      PhoneNo: new FormControl("", [Validators.required]),
      Rolename: new FormControl("", [Validators.required]),
      RoleId: new FormControl("", [Validators.required]),
      Address: new FormControl("", []),
      State: new FormControl("", []),
      Country: new FormControl("", []),
      Pincode: new FormControl("", []),
      isActive: new FormControl(false, [Validators.required]),
      OrgName: new FormControl("", []),
      OrgId: new FormControl("", []),
      SupervisorId: new FormControl("", []),
      Supervisor: new FormControl("", []),
      CoordinatorId: new FormControl("", []),
      Coordinator: new FormControl("", []),
      userId: new FormControl(this.user.Id, [Validators.required])
    })
    this.setFormValue(this.user);
  }

  setFormValue(data) {
    this.profileForm.patchValue({
      Id: data.Id,
      Salutations: data.Salutations,
      FirstName: data.FirstName,
      LastName: data.LastName,
      EmailId: data.EmailId,
      PhoneNo: data.PhoneNo,
      RoleId: data.RoleId,
      isActive: data.isActive,
      Rolename: data.Rolename
    });
    if (this.user.RoleId != 1) {
      this.profileForm.patchValue({
        OrgId: data.OrgId,
        OrgName: data.OrgName,
        Address: data.Address,
        State: data.State,
        Country: data.Country,
        Pincode: data.Pincode,
        CoordinatorId: data.CoordinatorId,
        SupervisorId: data.SupervisorId,
        Supervisor: data.Supervisor,
        Coordinator: data.Coordinator
      })
    }
  }

  onProfileSubmit() {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      this.spinner.show();
      this.ApiService.create('/user/addusers', this.profileForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.toastr.success(response.message);
          sessionStorage.setItem('globalassist', JSON.stringify(response.data[0]));
          sessionStorage.setItem('roleId', response.data[0].RoleId);
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
  }

}
