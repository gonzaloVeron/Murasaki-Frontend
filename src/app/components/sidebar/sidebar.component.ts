import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from '../table/models/table-header';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  title: string = "Estudiantes";

  valueIconRight: string = "";

  constructor(private router: Router, private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.register(this);
  }

  ngAfterViewInit(): void {
    let sidebar: any = document.getElementsByClassName("sidebar")[0];
    let btn: any = document.getElementById("btn");
    let searchBtn: any = document.getElementsByClassName("fa-search")[0];

    btn.onclick = () => {
      sidebar.classList.toggle("active");
    }
    searchBtn.onclick = () => {
      sidebar.classList.toggle("active");
    }
  }

  navigate(path: string){
    // console.log("Navigating to: " + path);
    this.router.navigateByUrl(path);
  }

  changeTitle(title: string){
    this.title = title;
  }

}
