import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

export class TimeTable {
  private user_name: any;
  private date_study: any;

  constructor(user_name: any, date_study: any) {
    this.user_name = user_name;
    this.date_study = date_study;
  }
}

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.scss']
})


export class TimeTableComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) { 
    }

    ngOnInit(): void {
      setTimeout(() => {
        this.onSearch();
      }, 3000)
    }

  onSearchWarning(): Observable<any>  {
    return this.http.get<any>('http://localhost:8070/api/common/get_every_week');
  }

  weekData: any;
  timeTable: any;

  onSearch() {
    this.onSearchWarning().subscribe(
      response => {
        this.weekData = response;
        console.log("xxxxxxxxxxxxxx"+JSON.stringify(this.weekData));
      }
    )
  }

  getDataForDays() {
    this.timeTable = new TimeTable("","");
    this.http.post<any>('http://localhost:8070/api/common/get_timt_table',this.timeTable).subscribe(
      response => {
        
      }
    )
  }

}
