import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserRole } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  form!: FormGroup;
  userProfile?: any;

  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastService: ToastrService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, []],
      password: [null, []],
    });
    this.userProfile = this.tokenService.getUserProfile();
  }

  openLoginForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onLogin() {
    const values = this.form.getRawValue();
    this.authService.login(values).subscribe(
      (res) => {
        const accessToken = res.access_token;
        const decodeToken = this.tokenService.decodeToken(res.access_token);

        this.tokenService.saveAccessToken(accessToken);
        this.tokenService.saveRole(res.role);
        this.userProfile = JSON.parse(decodeToken.sub);
        this.tokenService.saveUserProfile(this.userProfile);

        this.form.reset();
        this.modalRef?.hide();
        this.toastService.success('Login successfully');
        this.ngZone.run(() => {
          this.router.navigateByUrl(this.getRedirectURLbyRole(res.role as UserRole));
        });
      },
      (err) => {
        this.toastService.error('Login failed');
      }
    );
  }

  getRedirectURLbyRole(role: UserRole) {    
    switch (role) {
      case UserRole.ROLE_ADMIN:
        return '/home/teacher';
      case UserRole.ROLE_ACADEMIC_ADMIN:
        return '/aca-admin/course';
      case UserRole.ROLE_TEACHER:
        return '/teacher-page/viewteacher';
      case UserRole.ROLE_STUDENT:
        return '/student-page/student';
      default:
        return '/';
    }
  }

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toastService.success('Logout successfully');
    this.router.navigateByUrl('/');
  }
}
