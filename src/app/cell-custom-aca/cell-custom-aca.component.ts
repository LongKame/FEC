import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';
import { HomeComponent } from '../pages/home/home.component';
import { TeacherComponent } from '../teacher/teacher.component';
import { AcaComponent } from '../aca/aca.component';

export class AcademicAdmin {
  private id: any;
  private user_name: any;
  private full_name: any;
  private email: any;
  private phone: any;
  private address: any;
  
  constructor(id: any, user_name: any, full_name: any,email: any, phone: any,address: any) {
    this.id = id;
    this.user_name = user_name;
    this.full_name = full_name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}

@Component({
  selector: 'app-cell-custom-aca',
  templateUrl: './cell-custom-aca.component.html',
  styleUrls: ['./cell-custom-aca.component.scss']
})
export class CellCustomAcaComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private app: AppComponent,
    private home: HomeComponent,
    private aca: AcaComponent,
    private toast: ToastrService
  ) { }


  data: any;
  params: any;
  user: any;

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


  updateAca() {
    this.user = new AcademicAdmin(this.params.data.user_Id, "", this.params.data.full_name
      , "", this.params.data.phone, this.params.data.address);
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" + JSON.stringify(JSON.stringify(this.user)));
    this.http.put<any>('http://localhost:8070/api/admin/edit_acad', this.user).subscribe(
      response => {
        console.log("kkkkkkkkkkkkkkkkkkkk"+JSON.stringify(response));
        if(response.state === true){
          this.aca.onSearch(this.aca.indexPage);
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

  deleteAca(){
    this.user = new AcademicAdmin(this.params.data.user_Id, null, null, null, null, null);
    this.http.put<any>('http://localhost:8070/api/admin/delete_acad', this.user).subscribe(
      response => {
        if(response.state === true){
          this.aca.onSearch(this.aca.indexPage);
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
