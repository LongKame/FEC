import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomComponent } from 'src/app/cell-custom/cell-custom.component';

export class Teacher {
  private user_name: any;
  private full_name: any;
  private password: any;
  private email: any;
  private phone: any;
  private address: any;
  
  constructor(user_name: any, full_name: any, password: any, email: any, phone: any,address: any) {
    this.user_name = user_name;
    this.full_name = full_name;
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
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  title = 'AdminFE';

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  user_name: any;
  full_name: any;
  password: any;
  email: any;
  phone: any;
  address: any;

  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.teacher = new Teacher(this.user_name, this.full_name, this.password, this.email, this.phone, this.address);
    this.view = new View(1,10,"");
  };

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;

  
  searchInforForm: any;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 5;
  first: any;
  page: any;
  last: any;
  currentPage = 1;
  rangeWithDots: any;
  defaultColDef: any;

  onSearchWarning(bodySearch: any): Observable<any>  {
    return this.http.post<any>('http://localhost:8070/api/admin/view_teacher',bodySearch);
  }

  onSearch(index: number) {
    if(index === null || index === undefined ){
      index=1;
    }
    this.view = new View(index,this.PAGE_SIZE,"");
    this.onSearchWarning(this.view).subscribe(
        response => {
            console.log(JSON.stringify(response));
            this.rowData = response.resultData;
            this.totalResultSearch = response.totalRecordNoLimit;
            this.currentTotalDisplay =  Object.keys(this.rowData).length;
            this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
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
    // 'font-weight': '500',
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight':'bold',
  }


  createTable() {

    this.defaultColDef = {
      sortable: true,
      filter: true
    };

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
      { headerName: 'Full name', field: 'full_name', cellStyle: this.STYLE_TABLE},
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Phone', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Address', field: 'address', cellStyle: this.STYLE_TABLE },
      { headerName: 'State', field: 'active'
      // , 
      // valueGetter: (params: any) => {
      //   return params.node = params.value === true ? "Active" : "Deactive";
      // }
      ,cellStyle: this.STYLE_TABLE 
      },
      {
        headerName: "Action",
        cellRendererFramework: CellCustomComponent,
      },
    ];
  }

  index: any;
  

  addTeacher() {
    this.teacher = new Teacher(this.user_name, this.full_name, this.password, this.email, this.phone, this.address);
    this.http.post<any>('http://localhost:8070/api/admin/add_teacher', this.teacher).subscribe(
      response => {
        if(response.state === true){
          this.onSearch(this.index);
          this.toast.success("Successfully");
          this.modalRef?.hide();
        }
        else{
          this.toast.error(response.message);
          this.modalRef?.hide();
        }
      }
    )
  }


}
