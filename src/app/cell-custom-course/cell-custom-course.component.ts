import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { CourseComponent } from '../course/course.component';

export class Course {
  private id: any;
  private levelId: any;
  private course_name: any;
  private createdAt: any;
  private updatedAt: any;
  private numberSlot: any;

  constructor(id: any, levelId: any, course_name: any, createdAt: any, updatedAt: any, numberSlot: any) {
    this.id = id;
    this.levelId = levelId;
    this.course_name = course_name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.numberSlot = numberSlot;
  }
}


@Component({
  selector: 'app-cell-custom-course',
  templateUrl: './cell-custom-course.component.html',
  styleUrls: ['./cell-custom-course.component.scss']
})
export class CellCustomCourseComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private course: CourseComponent,
    private toast: ToastrService
  ) { }

  public courses: any;

  data: any;
  params: any;
  user: any;
  course_name: any;

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

  updateCourse() {
    console.log(JSON.stringify(this.params.id));
    this.params.data.levelId=1;
    this.course_name = this.params.name;
    this.courses = new Course(this.params.data.id,this.params.data.levelId, this.params.data.course_name,this.params.data.createdAt
      ,this.params.data.updatedAt, this.params.data.numberSlot);
      console.log(""+ JSON.stringify(this.courses));
    this.http.put<any>('http://localhost:8070/api/aca/edit_course', this.courses).subscribe(
      response => {
        if(response.state === true){
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

  deleteCourse(){
    // this.http.delete<any>('http://localhost:8070/api/aca/delete_course', this.params.data.id).subscribe(
    //   response => {
    //     if(response.state === true){
    //       this.course.onSearch(this.course.index);
    //       this.toast.success("Successfully");
    //       this.modalRef?.hide();
    //     }
    //     else{
    //       this.toast.error("Fail");
    //       this.modalRef?.hide();
    //     }
    //   }
    // )
  }
}
