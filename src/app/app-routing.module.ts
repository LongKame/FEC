import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AcaComponent } from './aca/aca.component';
import { ClassComponent } from './class/class.component';
import { AcaAdminComponent } from './pages/aca-admin/aca-admin.component';
import { CourseComponent } from './course/course.component';
import { RoomComponent } from './room/room.component';
import { QuizComponent } from './quiz/quiz.component';
import { PendingComponent } from './pending/pending.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewAcaComponent } from './view-aca/view-aca.component';
import { ViewClassComponent } from './view-class/view-class.component';
import { ViewTimetableComponent } from './view-timetable/view-timetable.component';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { UserRole } from './_services/auth.service';


const routes: Routes = [
  {
    path: 'academy',
    loadChildren: () => import('./academy/academy.module').then(m => m.AcademyModule)
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      role: UserRole.ROLE_ADMIN,
    },
    children: [
      { path: 'teacher', component: TeacherComponent },
      { path: 'student', component: StudentComponent },
      { path: 'aca', component: AcaComponent },
      { path: 'class', component: ClassComponent },
      { path: 'pending', component: PendingComponent },
    ]
  }, 
  {
    path: 'aca-admin', component: AcaAdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      role: UserRole.ROLE_ACADEMIC_ADMIN,
    },
    children: [
      { path: 'course', component: CourseComponent },
      { path: 'room', component: RoomComponent },
      { path: 'quiz', component: QuizComponent },
    ]
  }, 
  {
    path: 'teacher-page', component: TeacherPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      role: UserRole.ROLE_TEACHER,
    },
    children: [
      { path: 'viewstudent', component: ViewStudentComponent },
      { path: 'viewteacher', component: ViewTeacherComponent },
      { path: 'viewaca', component: ViewAcaComponent },
      { path: 'viewclass', component: ViewClassComponent },
      { path: 'timetable', component: ViewTimetableComponent },
    ]
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], },
  {
    path: '',
    redirectTo: '/academy',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
