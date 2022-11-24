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
  ) {}

  ngOnInit(): void {
    this.onLoad();
  }

  course: any;

  openViewDetail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openClassDetail(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onLoad() {
    this.http.get<any>('http://localhost:8070/api/common/get_course').subscribe(
      response => {
        this.course = response;
      }
    );
  }

}
