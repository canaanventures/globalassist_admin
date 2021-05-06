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
  user: any = JSON.parse(sessionStorage.getItem('globalassist'));
  _opened: boolean = true;
  slide: string = 'push';
  isMobile: boolean = false;
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
    if (/Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
    }
  }

  _toggleOpened() {
    this._opened = !this._opened;
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.setActivePage();
      }
    })
    // var header: any = document.getElementsByClassName("animated")[0];
    // var btns = header.getElementsByTagName("li");
    // for (var i = 0; i < btns.length; i++) {
    //   btns[i].addEventListener("click", function () {
    //     var current = document.getElementsByClassName("active");
    //     current[0].className = current[0].className.replace("active", "");
    //     this.className += " active";
    //   });
    // }
  }
  ngAfterViewChecked() {
    this.setActivePage()
    // $('.sub-menu ul').hide();
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
    else if (page == 'add-org')
      this.router.navigateByUrl('/addorg');
    else if (page == 'org-list')
      this.router.navigateByUrl('/orglist');
    else if (page == 'logout') {
      sessionStorage.removeItem('globalassist');
      sessionStorage.removeItem('roleId');
      this.router.navigateByUrl('/login');
    }
    else if (page == 'changepassword')
      this.router.navigateByUrl('/changepassword');

  }

  setActivePage() {
    var current = document.getElementsByClassName("active");
    if (current.length > 0)
      current[0].className = current[0].className.replace("active", "");
    if (this.router.url.includes('profile')) {
      var target = document.getElementById('profile')
      target.className = ' active';
    }
    else if (this.router.url.includes('memberlist')) {
      var target = document.getElementById('memberlist')
      target.className = ' active';
    }
    else if (this.router.url.includes('addusers')) {
      var target = document.getElementById('addmember')
      target.className = ' active';
    }
    else if (this.router.url.includes('orglist')) {
      var target = document.getElementById('orglist')
      target.className = ' active';
    }
    else if (this.router.url.includes('addorg')) {
      var target = document.getElementById('addorg')
      target.className = ' active';
    }
    else if (this.router.url.includes('reportapproval')) {
      var target = document.getElementById('reportapproval')
      target.className = ' active';
    }
    else if (this.router.url.includes('sendreport') && this.user.RoleId != 2) {
      var target = document.getElementById('sendreport')
      target.className = ' active';
    }
    else if (this.router.url.includes('reporthistory')) {
      var target = document.getElementById('reporthistory')
      target.className = ' active';
    }
  }

}
