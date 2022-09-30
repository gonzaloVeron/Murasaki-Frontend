import { Component, Input } from '@angular/core';
import { TableHeader } from './components/table/models/table-header';

export interface RouteInfo {
  path?: string;
  title: string;
  icon: string;
  class: string;
  subLinks?: {
    path: string;
    title: string;
    icon: string;
    class: string;
  }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Murasaki-Frontend';

  @Input() menuItems: any[] = [];
  @Input() logo = "";
  @Input() companyName = "";
  @Input() normal = true;
  @Input() mini = false;
  @Input() profileImage = '';
  @Input() name = '';
  @Input() email = '';
  @Input() link: string = 'https://aam.solutions';
}
