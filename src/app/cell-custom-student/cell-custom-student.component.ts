import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../pages/home/home.component';
import { StudentComponent } from '../student/student.component';


export class Student {
  private student_Id: any;
  private user_Id: any;
  private role_Id: any;
  private class_Id: any;
  private class_name: any;
  private user_name: any;
  private full_name: any;
  private email: any;
  private phone: any;
  private address: any;
  private active: any;
  private from_date: any;
  private courses: any;
  private classes: any;

  constructor(student_Id: any, user_Id: any, role_Id: any,class_Id: any, class_name: any,user_name: any,full_name: any,email: any,phone: any,address: any,active: any) {
    this.student_Id = student_Id;
    this.user_Id = user_Id;
    this.role_Id = role_Id;
    this.class_Id = class_Id;
    this.class_name = class_name;
    this.user_name = user_name;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.active = user_name;
  }
}

@Component({
  selector: 'app-cell-custom-student',
  templateUrl: './cell-custom-student.component.html',
  styleUrls: ['./cell-custom-student.component.scss']
})
export class CellCustomStudentComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private app: AppComponent,
    private home: HomeComponent,
    private student: StudentComponent,
    private toast: ToastrService
  ) { }

  closeResult: string = "";
  data: any;
  params: any;
  user: any;
  courses: any;
  classes: any;

  agInit(params: any): void {
    this.data = params;
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  updateTeacher() {
    // this.user = new Student(this.params.data.user_Id, "", this.params.data.full_name
    //   , "", this.params.data.phone, this.params.data.address);
    this.http.put<any>('http://localhost:8070/api/admin/edit_teacher', this.user).subscribe(
      response => {
        console.log("kkkkkkkkkkkkkkkkkkkk"+JSON.stringify(response));
        if(response.state === true){
          this.student.onSearch(this.student.indexPage);
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

  deleteTeacher(){
    this.http.put<any>('http://localhost:8070/api/admin/delete_teacher', this.user).subscribe(
      response => {
        if(response.state === true){
          this.student.onSearch(this.student.indexPage);
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
}
