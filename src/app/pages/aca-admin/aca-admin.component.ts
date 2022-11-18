import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'app-aca-admin',
  templateUrl: './aca-admin.component.html',
  styleUrls: ['./aca-admin.component.scss']
})
export class AcaAdminComponent implements OnInit {
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
