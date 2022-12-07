import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

export enum Menu {
  Teacher = 'Teacher',
  Curriculum = 'Curriculum',
  Room = 'Room',
  Quiz = 'Quiz',
  Student = 'Student',
  Time = 'Time',
  TimeTable = 'Time Table',
  AcademicAdmin = 'Academic Admin',
  Class = 'Class',
  Course = 'Course',
  Pending = 'Pending',
  Logout = 'Logout',
}

export type MenuItem = {
  menu: Menu;
  icon: IconDefinition;
  link?: string;
  onClick?: () => void;
};

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() menus: MenuItem[] = [];
  showingTooltip: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 1023px)'])
      .subscribe((result: BreakpointState) => {
        if (result.matches) {
          this.showingTooltip = true
          return;
        }

        this.showingTooltip = false;
      });
  }
}
