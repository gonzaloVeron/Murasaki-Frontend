import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarComponent } from '../../sidebar/sidebar.component';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebar: SidebarComponent

  constructor() { }

  changeTitle(title: string){
    setTimeout(() => {
      this.sidebar.changeTitle(title);
    }, 10);
  }

  register(sidebar: SidebarComponent){
    this.sidebar = sidebar;
  }

}
