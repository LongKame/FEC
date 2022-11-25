import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class Course {
  private id: any;
  private levelId: any;
  private name: any;
  private fee: any;
  private createdAt: any;
  private updatedAt: any;
  private numberSlot: any;
  private image: any;
  private description: any;

  constructor(id: any, levelId: any, name: any, fee: any, createdAt: any, updatedAt: any, numberSlot: any, image: any, description: any) {
    this.id = id;
    this.levelId = levelId;
    this.name = name;
    this.fee = fee;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.numberSlot = numberSlot;
    this.image = image;
    this.description = description;
  }
}

export class Course1{
  private id: any;

  constructor(id: any) {
    this.id = id;
  }
}

export class Classes{
  private courseId: any;

  constructor(courseId: any) {
    this.courseId = courseId;
  }
}

export class Classes1{
  private class_id: any;
  private user_name: any;

  constructor(class_id: any, user_name: any) {
    this.class_id = class_id;
    this.user_name = user_name;
  }
}

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modalRef?: BsModalRef;
  form!: FormGroup;
  userProfile?: any;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  course: any;
  classes: any;
  classes1: any;
  id: any;
  rowView: any;
  rowClass: any;
  courseId: any;
  class_id: any;
  user_name: any;

  openViewDetail(template: TemplateRef<any>, id: any) {
    this.id = id;
    this.course = new Course1(this.id);
    console.log(this.course);
    this.http.post<any>('http://localhost:8070/api/common/get_course_by_id',this.course).subscribe(
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
    );
    this.modalRef = this.modalService.show(template);
  }

  openClassDetail(template: TemplateRef<any>, id: any) {
    this.courseId = id;
    this.classes = new Classes(this.courseId);
    console.log(this.classes);
    this.http.post<any>('http://localhost:8070/api/common/get_class_by_course_id',this.classes).subscribe(
      response => {
        this.rowClass = response;
        console.log("xxxxxxxxxxxxxx"+JSON.stringify(this.rowClass));
      }
    );
    this.modalRef = this.modalService.show(template);
  }

  register(id: any) {
    this.class_id = id;
    this.user_name = "longgiang";
    this.classes1 = new Classes1(this.class_id, this.user_name);
    this.http.post<any>('http://localhost:8070/api/student/register_course',this.classes1).subscribe(
      response => {
        console.log("xxxxxxxxxxxxxx"+JSON.stringify(response));
      }
    );
  }

  onLoad() {
    this.http.get<any>('http://localhost:8070/api/common/get_course').subscribe(
      response => {
        this.course = response;
      }
    );
  }

}
