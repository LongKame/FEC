import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {
  menus = [
    { text: 'About Us', link: '/'},
    { text: 'Teacher Team', link: '/'},
    { text: 'Course', link: '/'},
    { text: 'Class Schedule', link: '/'},
    { text: 'Register Class',  link: '/'},
    { text: 'Timetable', link: '/'},
    { text: 'Quiz', link: '/academy/quiz'},
  ];
}