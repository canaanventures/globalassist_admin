import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  UserEmail: any = '';
  constructor(
    public router: Router,
    public ApiService: ApiService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      UserEmail: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", [Validators.required])
    })
  }

  onLoginSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.spinner.show();
      this.ApiService.getAll('/auth/login', this.loginForm.value).subscribe(response => {
        if ((response as any).isSuccess) {
          this.toastr.success(response.message);
          sessionStorage.setItem('globalassist', JSON.stringify(response.data[0]));
          sessionStorage.setItem('roleId', response.data[0].RoleId);
          this.router.navigateByUrl('/profile');
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
  }

  forgotPassword() {
    if (this.UserEmail !== "") {
      this.spinner.show();
      this.ApiService.create('/auth/forgotpassword', { UserEmail: this.UserEmail }).subscribe(response => {
        if ((response as any).isSuccess) {
          this.toastr.success(response.message);
          $('#closeModal').click();
        }
        else
          this.toastr.error((response as any).message);
        this.spinner.hide();
      })
    }
    else
      this.toastr.error('Email Id is required');
  }
}
