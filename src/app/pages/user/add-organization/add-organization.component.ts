import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent extends UserComponent implements OnInit {
  isSubmitted: boolean = false;
  isReadyOnly: Boolean = false;
  organizationForm: FormGroup;
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
    this.organizationForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      userId: new FormControl(this.user.Id, [Validators.required]),
      name: new FormControl("", [Validators.required]),
      emailId: new FormControl("", [Validators.required, Validators.email]),
      phoneNo: new FormControl("", [Validators.required]),
      address: new FormControl("", [Validators.required]),
      state: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      isActive: new FormControl(true, [Validators.required]),
    })
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('orgId') !== null) {
      this.spinner.show();
      this.ApiService.getAll('/org/getallorg', { OrgId: sessionStorage.getItem('orgId') }).subscribe(response => {
        if (!(response as any).isSuccess)
          this.toastr.error(response.message);
        else
          this.setFormValue(response.data);
        this.spinner.hide();
      })
    }
  }

  ngOnDestroy() {
    sessionStorage.removeItem('orgId');
    sessionStorage.removeItem('readonly');
  }

  setFormValue(response) {
    this.organizationForm.patchValue({
      id: response.id,
      name: response.name,
      emailId: response.emailId,
      phoneNo: response.phoneNo,
      address: response.address,
      state: response.state,
      city: response.city,
      country: response.country,
      isActive: response.isActive
    })
    debugger
    if (sessionStorage.getItem('readonly') && sessionStorage.getItem('readonly') != null && (sessionStorage.getItem('readonly') == 'true')) {
      this.isReadyOnly = true;
      this.organizationForm.disable();
    }
  }

  onFormSubmit() {
    this.isSubmitted = true;
    if (this.organizationForm.valid) {
      this.spinner.show();
      this.ApiService.create('/org/addorg', this.organizationForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.isSubmitted = false;
          sessionStorage.removeItem('orgId');
          sessionStorage.removeItem('readonly');
          this.toastr.success(response.message);
          this.organizationForm.reset();
          this.router.navigateByUrl('/orglist')
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
  }

}
