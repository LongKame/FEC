import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';

export class View {
  private id: any;

  constructor(id: any) {
    this.id = id;
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
  id: any;
  class_name: any;
  second_of_week: any = 3;

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/teacher/get_time_table_class', bodySearch);
  }

  onSearch(index: number, btn?: any) {
    this.indexPage = index;
    this.id=13;
    this.view = new View(this.id);
    this.onSearchWarning(this.view).subscribe(
      response => {
        this.rowData = response.time_table;
        console.log("xxxxxxxxxxxxxxxxxxxx"+JSON.stringify(this.rowData));
      }
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
      {
        headerName: 'MON', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==1 || params.data.second_of_week==1){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=1 || params.data.second_of_week!=1){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'TUE', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==2 || params.data.second_of_week==2){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=2 || params.data.second_of_week!=2){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'WED', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==3 || params.data.second_of_week==3){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=3 || params.data.second_of_week!=3){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'THU', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==4 || params.data.second_of_week==4){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=4 || params.data.second_of_week!=4){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'FRI', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==5 || params.data.second_of_week==5){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=5 || params.data.second_of_week!=5){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'SAT', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==6 || params.data.second_of_week==6){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=6 || params.data.second_of_week!=6){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
      {
        headerName: 'SUN', field: 'first_of_week&second_of_week&class_name&room_name',
        cellRenderer: (params: any) => {
          if(params.data.first_of_week==7 || params.data.second_of_week==7){
            params.value=params.data.class_name+" at "+params.data.room_name;
            return params.value;
          }else if(params.data.first_of_week!=7 || params.data.second_of_week!=7){
            params.value="----------------";
            return params.value;
          }
        }
        , cellStyle: this.STYLE_TABLE
      },
    ];
  }
}
