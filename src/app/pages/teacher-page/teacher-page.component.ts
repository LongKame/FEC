import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent implements OnInit {
  userProfile?: any;

  constructor(
    private tokenService: TokenService,
    private toastService: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.tokenService.getUserProfile();
  }

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toastService.success('Logout successfully');
    this.router.navigateByUrl('/');
  }
}
