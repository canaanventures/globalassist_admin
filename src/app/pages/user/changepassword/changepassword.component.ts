import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserComponent } from 'src/app/modules/user/user.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangePasswordComponent extends UserComponent implements OnInit {
  changePasswordForm: FormGroup;
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
    this.changePasswordForm = new FormGroup({
      CurrentPassword: new FormControl("", [Validators.required]),
      NewPassword: new FormControl("", [Validators.required]),
      ConfirmPassword: new FormControl("", [Validators.required]),
      EmailId: new FormControl(this.user.EmailId, [Validators.required]),
      UserId: new FormControl(this.user.Id, [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    this.isSubmitted = true;
    if (this.changePasswordForm.valid) {
      if (this.changePasswordForm.value.NewPassword !== this.changePasswordForm.value.ConfirmPassword) {
        this.toastr.error('New password and confirm password not matching');
      }
      else {
        this.spinner.show();
        this.ApiService.create('/auth/changepassword', this.changePasswordForm.value).subscribe(response => {
          if ((response as any).isSuccess) {
            this.isSubmitted = false;
            this.changePasswordForm.reset();
            this.toastr.success(response.message);
          }
          else
            this.toastr.error((response as any).message);
          this.spinner.hide();
        })
      }
    }
  }

}
