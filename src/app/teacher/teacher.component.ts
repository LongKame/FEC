import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { CellCustomTeacherComponent } from '../cell-custom-teacher/cell-custom-teacher.component';


export class Teacher {
  private user_name: any;
  private full_name: any;
  private imageUrl: any;
  private password: any;
  private email: any;
  private phone: any;
  private address: any;

  constructor(user_name: any, full_name: any, imageUrl: any, password: any, email: any, phone: any, address: any) {
    this.user_name = user_name;
    this.full_name = full_name;
    this.imageUrl = imageUrl;
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
  myImage!: Observable<any>;
  base64code!: any;


  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.indexPage);
    }, 3000)
  }

  user_name: any;
  full_name: any;
  imageUrl: any;
  password: any;
  email: any;
  phone: any;
  address: any;

  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
      this.teacher = new Teacher(this.user_name, this.full_name, this.imageUrl, this.password, this.email, this.phone, this.address);
  };

  columnDefs: any;
  rowData: any
  modalRef: BsModalRef | undefined;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 10;
  currentPage = 1;
  defaultColDef: any;
  key: any;
  indexPage: any;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/admin/view_teacher', bodySearch);
  }

  onSearch(index: number, btn?: any) {
    let listBtn = document.getElementsByClassName('btn-pag')
    for (let i = 0; i < listBtn.length; i++) {
      const element = listBtn[i];
      element.setAttribute('style', '{color:blue}')
    }
    if (index === null || index === undefined) {
      index = 1;
      const eleSelect = document.getElementById('btn' + (0).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    if (btn) {
      btn.target.style.color = "white"
    } else {
      const eleSelect = document.getElementById('btn' + (index - 1).toString())
      if (eleSelect) {
        eleSelect!.style.color = "white"
      }
    }
    this.indexPage = index;
    this.view = new View(index, this.PAGE_SIZE, this.key);
    this.onSearchWarning(this.view).subscribe(
      response => {
        this.rowData = response.resultData;
        this.totalResultSearch = response.totalRecordNoLimit;
        this.currentTotalDisplay = Object.keys(this.rowData).length;
        this.totalPage = Math.ceil(this.totalResultSearch / this.PAGE_SIZE);
      }
    );
  }

  prev(): void {
    if (this.indexPage > 1) {
      this.indexPage--;
    }
    if (this.indexPage < 1) {
      this.indexPage = 1
    }
    this.onSearch(this.indexPage);
  }

  next(): void {
    this.indexPage++;
    if (this.indexPage > this.totalPage) {
      this.indexPage = this.totalPage
    }
    this.onSearch(this.indexPage);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  STYLE_TABLE = {
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight': 'bold',
  }

  STYLE_IMAGE = {
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight': 'bold',
    'margin-top': '-30px'
  }

  createTable() {

    this.defaultColDef = {
      sortable: true,
      filter: true, 
      editable: true,
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
      { headerName: 'Full name', field: 'full_name', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'Image', field: 'imageUrl',
        cellRenderer: (params: any) => {
          return `<img src="${params.value}" width="60px" height="80px">`;
        }
        , cellStyle: this.STYLE_IMAGE
      },
      { headerName: 'Email', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'Phone', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'Address', field: 'address', cellStyle: this.STYLE_TABLE },
      {
        headerName: 'State', field: 'active',
        cellRenderer: (params: any) => {
          return `<input disabled='true' type='checkbox' ${params.value ? 'checked' : ''} />`;
        },
        cellStyle: this.STYLE_TABLE
      },
      { headerName: "Action", cellRendererFramework: CellCustomTeacherComponent, },
    ];
  }

  addTeacher() {
    this.teacher = new Teacher(this.user_name, this.full_name, this.myImage, this.password, this.email, this.phone, this.address);
    this.http.post<any>('http://localhost:8070/api/admin/add_teacher', this.teacher).subscribe(
      response => {
        if (response.state === true) {
          this.onSearch(this.indexPage);
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

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subsciber: Subscriber<any>) => {
      this.readFile(file, subsciber)
    })
    observable.subscribe((d) => {
      console.log(d);
      this.myImage = d;
      this.base64code = d;
    })
  }

  readFile(file: File, subsciber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subsciber.next(filereader.result);
      subsciber.complete();
    }
    filereader.onerror = () => {
      subsciber.error();
      subsciber.complete();
    }
  }
}
