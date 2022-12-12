import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomTeacherComponent } from 'src/app/cell-custom-teacher/cell-custom-teacher.component';
import { AuthService } from '../../_services/auth.service';
import { TokenService } from '../../_services/token.service';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem } from '../../sidebar/sidebar.component';


export class Teacher {
  private username: any;
  private fullname: any;
  private password: any;
  private email: any;
  private phone: any;
  private address: any;
  
  constructor(username: any, fullname: any, password: any, email: any, phone: any,address: any) {
    this.username = username;
    this.fullname = fullname;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

export class View {
  private page: any;
  private pageSize: any;
  private key_search: any;

  constructor(page: any, pageSize: any, key_search: any) {
    this.page = page;
    this.pageSize = pageSize;
    this.key_search = key_search;
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  menus: MenuItem[] = [
    {
      icon: fa.faGraduationCap,
      menu: Menu.Student,
      link: '/home/student'
    },
    {
      icon: fa.faChalkboardTeacher,
      menu: Menu.Teacher,
      link: '/home/teacher'
    },
    {
      icon: fa.faUserFriends,
      menu: Menu.AcademicAdmin,
      link: '/home/aca'
    },
    {
      icon: fa.faLandmark,
      menu: Menu.Class,
      link: '/home/class'
    },
    {
      icon: fa.faSitemap,
      menu: Menu.Pending,
      link: '/home/pending'
    },
    {
      icon: fa.faExchangeAlt,
      menu: Menu.UpdateSchedule,
      link: '/home/update-schedule'
    },
    {
      icon: fa.faSearchPlus,
      menu: Menu.ViewStudentsInAllClasses,
      link: '/home/view-students-in-classes'
    },
    {
      icon: fa.faSignOutAlt,
      menu: Menu.Logout,
      onClick: () => this.onLogout(),
    },
  ];

  title = 'AdminFE';
  userProfile?: any;

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch();
    }, 3000)

    this.userProfile = this.tokenService.getUserProfile();
  }

  username: any;
  fullname: any;
  password: any;
  email: any;
  phone: any;
  address: any;

  public teacher: any;
  public view: any;

  constructor(
    private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService,
    private tokenService: TokenService,
    private toastService: ToastrService,
    private router: Router,
  ) {
    this.teacher = new Teacher(this.username, this.fullname, this.password, this.email, this.phone, this.address);
    this.view = new View(1,10,"");
  };

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;

  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any;
  first: any;
  page: any;
  last: any;
  currentPage = 1;
  rangeWithDots: any;

  onSearchWarning(bodySearch: any): Observable<any>  {
    return this.http.post<any>('http://localhost:8070/api/admin/view_teacher',this.view);
  }

  pageX(page: number): void {
    this.currentPage = page;
    this.searchInforForm.get('page').setValues(this.currentPage);
    this.onSearch();
}

  onSearch() {
    this.onSearchWarning("l").subscribe(
        response => {
            console.log(response);
            this.rowData = response.resultData;
            this.totalResultSearch = response.totalRecordNoLimit;
            this.currentTotalDisplay =  Object.keys(this.rowData).length;
          
            this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);

            if ( Object.keys(this.rowData).length === 0) {
                this.first = 0;
            } else {
                this.first = (this.PAGE_SIZE * (this.page - 1)) + 1
            }
            this.last =  Object.keys(this.rowData).length + (this.PAGE_SIZE * (this.page - 1))
        }
    );
}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }


  STYLE_TABLE = {
    'font-weight': '500',
    'font-size': '12px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center'
  }


  createTable() {
    this.columnDefs = [
      {
        headerName: 'Order of list',
        valueGetter: (params: any) => {
          if (params.node.rowIndex == 0) {
            return params.node.rowIndex = 1;
          } else {
            params.node.rowIndex++;
            return params.node.rowIndex++;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      { headerName: 'User name', field: 'user_name', cellStyle: this.STYLE_TABLE },
      {headerName: 'Full name', field: 'full_name', cellStyle: this.STYLE_TABLE},
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Phone', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Address', field: 'address', cellStyle: this.STYLE_TABLE },
      { headerName: 'State', field: 'active', 
      valueGetter: (params: any) => {

      return params.node.rowIndex == true ? "Active" : "Deactive";
      }
      ,cellStyle: this.STYLE_TABLE 
      },
      {
        // headerName: "Action",
        // cellRendererFramework: CellCustomTeacherComponent,
      },
    ];
  }


  addTeacher() {
    this.teacher = new Teacher(this.username, this.fullname, this.password, this.email, this.phone, this.address);
    this.http.post<any>('http://localhost:8070/api/admin/add_teacher', this.teacher).subscribe(
      response => {
        if(response.state === true){
          this.onSearch();
          this.toast.success("Successfully");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Fail");
          this.modalRef?.hide();
        }
      }
    )
  }

  onLogout() {
    this.tokenService.doLogout();
    this.userProfile = undefined;
    this.toastService.success('Logout successfully');
    this.router.navigateByUrl('/');
  }
}
