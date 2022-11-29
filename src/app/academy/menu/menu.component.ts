import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  menus = [
    { text: 'Home', link: '/'},
    { text: 'Teacher Team', link: '/academy/teache-team'},
    { text: 'Student', link: '/academy/student-feedback'},
    { text: 'Class Schedule', link: '/academy/class-schedule'},
    { text: 'Timetable', link: '/'},
    { text: 'Quiz', link: '/academy/quiz'},
  ];
}