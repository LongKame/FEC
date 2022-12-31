import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomTeacherComponent } from '../cell-custom-teacher/cell-custom-teacher.component';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'AdminFE';

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch();
    }, 3000)
  }

  username: any;
  fullname: any;
  password: any;
  email: any;
  phone: any;
  address: any;

  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.teacher = new Teacher(this.username, this.fullname, this.password, this.email, this.phone, this.address);
    this.view = new View(1,10,"");
  };

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;

  

  onLoad() {
    this.http.post<any>('http://localhost:8070/api/admin/view_teacher',this.view).subscribe(
      response => {
        // this.rowData = response.dataResult;
        // console.log("Xxxxxxxxxxxxxxxx"+JSON.stringify(response.dataResult));
      }
    );
  }

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
    // console.log(this.searchInforForm.value);
    this.onSearchWarning("l").subscribe(
        response => {
            console.log(response);
            this.rowData = response.resultData;
            console.log("yyyyyyyyyyyyyyyy"+this.rowData);
            this.totalResultSearch = response.totalRecordNoLimit;
            this.currentTotalDisplay =  Object.keys(this.rowData).length;
          
            this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
            // this.rangeWithDots = this.commonService.pagination(this.currentPage, this.totalPage);

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
        headerName: 'Số thứ tự',
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
      { headerName: 'Tên tài khoản', field: 'user_name', cellStyle: this.STYLE_TABLE },
      {headerName: 'Tên người dùng', field: 'full_name', cellStyle: this.STYLE_TABLE},
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Số điện thoại', field: 'phone', cellStyle: this.STYLE_TABLE },
      {headerName: 'Địa chỉ', field: 'address', cellStyle: this.STYLE_TABLE },
      {headerName: 'Trạng thái', field: 'active', 
      valueGetter: (params: any) => {

      return params.node.rowIndex == true ? "Active" : "Deactive";
      }
      ,cellStyle: this.STYLE_TABLE 
      },
      {
        headerName: 'Hành động',
        cellRendererFramework: CellCustomTeacherComponent,
      },
    ];
  }


  addTeacher() {
    this.teacher = new Teacher(this.username, this.fullname, this.password, this.email, this.phone, this.address);
    this.http.post<any>('http://localhost:8070/api/admin/add_teacher', this.teacher).subscribe(
      response => {
        if(response.state === true){
          this.onSearch();
          this.toast.success("Thêm thành công");
          this.modalRef?.hide();
        }
        else{
          this.toast.error("Thêm thất bại");
          this.modalRef?.hide();
        }
      }
    )
  }


}
