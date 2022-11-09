import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CellCustomQuizComponent } from '../cell-custom-quiz/cell-custom-quiz.component';
import * as XLSX from 'xlsx';

export class Quiz {
  private aca_id: any;
  private level_id: any;
  private question: any;
  private answerA: any;
  private answerB: any;
  private answerC: any;
  private answerD: any;
  private correct: any;

  constructor(aca_id: any, level_id: any, question: any, answerA: any, answerB: any, answerC: any, answerD: any, correct: any) {
    this.aca_id = aca_id;
    this.level_id = level_id;
    this.question = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
    this.correct = correct;
  }
}

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
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  constructor(private http: HttpClient,
    private modalService: BsModalService,
    private toast: ToastrService) {
    this.quiz = new Quiz(this.aca_id, this.level_id, this.question, this.answerA, this.answerB, this.answerC, this.answerD, this.correct);
    this.view = new View(1, this.PAGE_SIZE, "");
  }

  public quiz: any;
  public view: any;
  columnDefs: any;
  rowData: any;
  modalRef: BsModalRef | undefined;
  totalResultSearch: any;
  currentTotalDisplay: any;
  totalPage: any;
  PAGE_SIZE: any = 7;
  defaultColDef: any;
  key: any;
  indexPage: any;
  index: any;
  aca_id: any;
  level_id: any;
  question: any;
  answerA: any;
  answerB: any;
  answerC: any;
  answerD: any;
  correct: any;
  excelData: any;

  ngOnInit(): void {
    this.createTable();
    setTimeout(() => {
      this.onSearch(this.index);
    }, 3000)
  }

  onSearchWarning(bodySearch: any): Observable<any> {
    return this.http.post<any>('http://localhost:8070/api/aca/get_quiz_paging', bodySearch);
  }

  readExcel(event: any){
      let file = event.target.files[0];
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (e) =>{
        var workBook = XLSX.read(fileReader.result, {type:'binary'});
        var sheetNames = workBook.SheetNames;
        this.excelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
        console.log(JSON.stringify(this.excelData));
      }
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  STYLE_TABLE = {
    'font-size': '15px',
    'align-items': 'center',
    'top': '30px',
    'overflow': 'hidden',
    'text-align': 'center',
    'font-weight': 'bold'
  }

  createTable() {

    this.defaultColDef = {
      sortable: true,
      filter: true
    };

    this.columnDefs = [
      {
        headerName: 'Order of list',
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
      { headerName: 'Question', field: 'question', cellStyle: this.STYLE_TABLE },
      { headerName: 'Answer A', field: 'answerA', cellStyle: this.STYLE_TABLE },
      { headerName: 'Answer B', field: 'answerB', cellStyle: this.STYLE_TABLE },
      { headerName: 'Answer C', field: 'answerC', cellStyle: this.STYLE_TABLE },
      { headerName: 'Answer D', field: 'answerD', cellStyle: this.STYLE_TABLE },
      { headerName: 'Correct answer', field: 'correct', cellStyle: this.STYLE_TABLE },
      {
          headerName: "Action",
          cellRendererFramework: CellCustomQuizComponent,
        },
    ];
  }

  saveQuiz(){
    if(this.excelData!==null){
      for(let i of this.excelData){
        this.aca_id = 2;
        this.level_id = 1;
        this.question = i.question;
        this.answerA = i.answerA;
        this.answerB = i.answerB;
        this.answerC = i.answerC;
        this.answerD = i.answerD;
        this.correct = i.correct;
        this.quiz = new Quiz(this.aca_id, this.level_id, this.question, this.answerA, this.answerB, this.answerC, this.answerD, this.correct);
     }
    }
  }

}
