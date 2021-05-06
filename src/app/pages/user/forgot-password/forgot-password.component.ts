import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;
  isSubmitted: boolean = false;
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public ApiService: ApiService,
    public location: Location,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      UserEmail: new FormControl(this.activatedRoute.snapshot.queryParamMap.get('email').replace(/'/g, "").toString(), [Validators.required]),
      HashKey: new FormControl(this.activatedRoute.snapshot.queryParamMap.get('hash').replace(/'/g, "").toString(), [Validators.required]),
      Password: new FormControl("", [Validators.required]),
      ConfirmPassword: new FormControl("", [Validators.required])
    })
  }

  onResetSubmit() {
    debugger
    this.isSubmitted = true;
    if (this.resetForm.valid && this.resetForm.value.Password == this.resetForm.value.ConfirmPassword) {
      this.spinner.show();
      this.ApiService.create('/auth/resetpassword', this.resetForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.router.navigateByUrl('/login');
          this.spinner.hide();
        }
        else {
          this.spinner.hide();
          this.toastr.error((response as any).message);
        }
      })
    }
    else {
      this.toastr.error("Password does not match");
    }
  }

}
