import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AcaComponent } from './aca/aca.component';
import { CellCustomAcaComponent } from './cell-custom-aca/cell-custom-aca.component';
import { ClassComponent } from './class/class.component';
import { CellCustomTeacherComponent } from './cell-custom-teacher/cell-custom-teacher.component';
import { CellCustomStudentComponent } from './cell-custom-student/cell-custom-student.component';
import { AcaAdminComponent } from './pages/aca-admin/aca-admin.component';
import { StdComponent } from './pages/std/std.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { CellCustomCourseComponent } from './cell-custom-course/cell-custom-course.component';
import { RoomComponent } from './room/room.component';
import { CellCustomRoomComponent } from './cell-custom-room/cell-custom-room.component';
import { QuizComponent } from './quiz/quiz.component';
import { CellCustomQuizComponent } from './cell-custom-quiz/cell-custom-quiz.component';
import { PendingComponent } from './pending/pending.component';
import { CellCustomPendingComponent } from './cell-custom-pending/cell-custom-pending.component';
import { CurriculumComponent } from './curriculum/curriculum.component';

// import 'ag-grid-enterprise'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    TeacherComponent,
    AcaComponent,
    CellCustomAcaComponent,
    ClassComponent,
    CellCustomTeacherComponent,
    CellCustomStudentComponent,
    AcaAdminComponent,
    StdComponent,
    StudentComponent,
    CourseComponent,
    CellCustomCourseComponent,
    RoomComponent,
    CellCustomRoomComponent,
    QuizComponent,
    CellCustomQuizComponent,
    PendingComponent,
    CellCustomPendingComponent,
    CurriculumComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: false,
    }),
  ],
  providers: [],
  entryComponents:[CellCustomTeacherComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
