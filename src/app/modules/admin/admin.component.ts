import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../../shared/app.service';
import { AppComponent } from '../../app.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends AppComponent implements OnInit {
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
    // let User = JSON.parse(localStorage.getItem("JobPortal"));
    // if (User) {
    //   var Users = JSON.parse(User);
    //   if (Users && Users.roleId != 2) {
    //     this._gotoPath('/');
    //   }
    // }
    // else {
    //   this._gotoPath("/");
    // }
  }

  ngOnInit() {
  }

}
