import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AcaComponent } from './aca/aca.component';
import { ClassComponent } from './class/class.component';
import { AcaAdminComponent } from './pages/aca-admin/aca-admin.component';
import { CourseComponent } from './course/course.component';


const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'teacher', component: TeacherComponent },
      { path: 'student', component: StudentComponent },
      { path: 'aca', component: AcaComponent },
      { path: 'class', component: ClassComponent },
    ]
  }, 
  {
    path: 'aca-admin', component: AcaAdminComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'course', component: CourseComponent },
    ]
  }, 
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
