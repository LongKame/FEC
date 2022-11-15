import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';

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
  selector: 'app-view-timetable',
  templateUrl: './view-timetable.component.html',
  styleUrls: ['./view-timetable.component.scss']
})
export class ViewTimetableComponent implements OnInit {

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.indexPage);
    }, 3000)
  }
  public teacher: any;
  public view: any;

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
  };

  columnDefs: any;
  rowData: any

  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 4;
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
        headerName: 'Slot',
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
      { headerName: 'MON', field: 'user_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'TUE', field: 'full_name', cellStyle: this.STYLE_TABLE },
      { headerName: 'WED', field: 'email', cellStyle: this.STYLE_TABLE },
      { headerName: 'THU', field: 'phone', cellStyle: this.STYLE_TABLE },
      { headerName: 'FRI', field: 'address', cellStyle: this.STYLE_TABLE },
      { headerName: 'SAT', field: 'address', cellStyle: this.STYLE_TABLE },
      { headerName: 'SUN', field: 'address', cellStyle: this.STYLE_TABLE },
    ];
  }


}
