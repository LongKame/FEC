import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PendingComponent } from '../pending/pending.component';


@Component({
  selector: 'app-cell-custom-pending',
  templateUrl: './cell-custom-pending.component.html',
  styleUrls: ['./cell-custom-pending.component.scss']
})
export class CellCustomPendingComponent implements ICellRendererAngularComp {

  modalRef: BsModalRef | undefined;

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private toast: ToastrService,
    private pending: PendingComponent
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

  updatePending() {

    this.http.put<any>('http://localhost:8070/api/admin/update_pending', this.params.data).subscribe(
      response => {
        if(response.state === true){
          this.pending.onSearch(this.pending.indexPage);
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
}
