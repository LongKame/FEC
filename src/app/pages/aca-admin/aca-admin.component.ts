import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../_services/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

export class User {
  private user_name: any;

  constructor(user_name: any) {
    this.user_name = user_name;
  }
}

export class Teacher {
  private user_Id: any;
  private user_name: any;
  private full_name: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(user_Id: any, user_name: any, full_name: any, email: any, phone: any, address: any) {
    this.user_Id = user_Id;
    this.user_name = user_name;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

@Component({
  selector: 'app-aca-admin',
  templateUrl: './aca-admin.component.html',
  styleUrls: ['./aca-admin.component.scss']
})
export class AcaAdminComponent implements OnInit {

  userProfile?: any;
  modalRef: BsModalRef | undefined;

  constructor(
    private tokenService: TokenService,
    private toast: ToastrService,
    private modalService: BsModalService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.userProfile = this.tokenService.getUserProfile();
    setTimeout(() => {
      this.onLoad();
    }, 3000)
  }

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toast.success('Logout successfully');
    this.router.navigateByUrl('/');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  user: any;
  user_Id: any;
  user_name: any;
  full_name: any;
  email: any;
  phone: any;
  address: any;
  profile: any;
  user_id_param: any;
  user_name_param: any;
  full_name_param: any;
  email_param: any;
  phone_param: any;
  address_param: any;
  acad: any;

  onLoad() {
    if (this.tokenService.getUserProfile()?.username != null) {
      this.user = new User(this.tokenService.getUserProfile()?.username);
      console.log("oooooooo"+this.user);
      this.http.post<any>('http://localhost:8070/api/aca/get_profile_aca', this.user).subscribe(
        response => {
          this.profile = response;
          this.user_id_param = response.user_Id;
          this.user_name_param = response.user_name;
          this.full_name_param = response.full_name;
          this.email_param = response.email;
          this.phone_param = response.phone;
          this.address_param = response.address;
          console.log("oooooooo"+JSON.stringify(response));
        }
      )
    }
  }

  updateProfile() {
    this.acad = new Teacher(this.user_id_param, this.user_name_param, this.full_name_param, this.email_param, this.phone_param, this.address_param);
    this.http.put<any>('http://localhost:8070/api/aca/edit_profile_aca',this.acad).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Successfully");
          this.modalRef?.hide();
        }
        else {
          this.toast.error(response.message);
          this.modalRef?.hide();
        }
      }
    )
  }
}
