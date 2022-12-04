import { Component, OnInit, TemplateRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/_services/token.service';

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
  private classId: any;
  private username: any;

  constructor(classId: any, username: any) {
    this.classId = classId;
    this.username = username;
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
    private tokenService: TokenService,
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
  detail: any;

  onSearchWarning(course: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/common/get_course_by_id', course);
  }

  openViewDetail(template: TemplateRef<any>, id: any) {
    this.id = id;
    this.course = new Course1(this.id);
    console.log(this.course);
    this.onSearchWarning(this.course).subscribe(
      response => {
        console.log("xyxyxyxyx"+JSON.stringify(response));
        this.detail = response;
        console.log(JSON.stringify(response));
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
    this.classes1 = new Classes1(this.class_id, this.tokenService.getUserProfile()?.username);
    this.http.post<any>('http://localhost:8070/api/common/register_course',this.classes1).subscribe(
      response => {
        if (response.state === true) {
          this.toast.success("Successfully");
          this.modalRef?.hide();
        }
        else {
          this.toast.error(response.message);
          this.modalRef?.hide();
        }
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
