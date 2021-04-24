import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AppComponent implements OnInit {
  _opened: boolean = true;
  slide: string = 'push';
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

  _toggleOpened() {
    this._opened = !this._opened;
  }

  ngOnInit() {
    $('.sub-menu ul').hide();
  }

  ngAfterContentInit() {
    var header: any = document.getElementsByClassName("animated")[0];
    var btns = header.getElementsByTagName("li");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
      });
    }
  }

  submenu(e) {
    if (e.target.innerText.includes('Contact'))
      $('.sub-item').slideToggle("100");
  }

  Openpage(page) {
    if (page == 'profile')
      this.router.navigateByUrl('/profile');
    else if (page == 'add-member')
      this.router.navigateByUrl('/addusers');
    else if (page == 'member-list')
      this.router.navigateByUrl('/memberlist');
    else if (page == 'reportapproval')
      this.router.navigateByUrl('/reportapproval');
    else if (page == 'reporthistory')
      this.router.navigateByUrl('/reporthistory');
    else if (page == 'sendreport')
      this.router.navigateByUrl('/sendreport');
    else if (page == 'dashboard')
      this.router.navigateByUrl('/login');
    else if (page == 'logout')
      this.router.navigateByUrl('/login');
  }

}
