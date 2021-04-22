import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute, Router
} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';
/* [ App Service ] */
import { ApiService } from './shared/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public ApiService: ApiService,
    public location: Location,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) {
  }
}
