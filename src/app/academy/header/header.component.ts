import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService, UserRole } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';
import { FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  modalRef?: BsModalRef;
  formLogin!: FormGroup;
  formRegis!: FormGroup;
  userProfile?: any;

  

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private toastService: ToastrService,
    private router: Router,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) {}


  
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [null, []],
      password: [null, []],
    });
    this.formRegis = this.fb.group({
      username: [null, []],
      password: [null, []],
      fullname: [null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
    });
    this.userProfile = this.tokenService.getUserProfile();
  }

  readonly phoneFormControl = new FormControl('', [
    Validators.required, Validators.pattern(("[6-9]\\d{9}"))
  ]);

  openLoginForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openRegisForm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  onLogin() {
    const values = this.formLogin.getRawValue();
    this.authService.login(values).subscribe(
      (res) => {
        const accessToken = res.access_token;
        const decodeToken = this.tokenService.decodeToken(res.access_token);

        this.tokenService.saveAccessToken(accessToken);
        this.tokenService.saveRole(res.role);
        this.userProfile = JSON.parse(decodeToken.sub);
        this.tokenService.saveUserProfile(this.userProfile);

        this.formLogin.reset();
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

  onRegister() {
    const values = this.formRegis.getRawValue();
    console.log("aaaaaaaaaaaaaaaaa"+JSON.stringify(values));
    this.http.post<any>('http://localhost:8070/api/v1/registration', values).subscribe(
      (res) => {
        this.toastService.error('Send verification to your email');
      },
      (err) => {
        this.toastService.error('Register failed');
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
