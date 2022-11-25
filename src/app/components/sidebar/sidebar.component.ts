import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalUserService } from '../shared/services/local-user.service';
import { TableHeader } from '../table/models/table-header';
import { SidebarService } from '../shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  title: string = "Estudiantes";

  userName: string = "";

  isAdmin: boolean = false;

  valueIconRight: string = "";

  constructor(
    private router: Router, 
    private sidebarService: SidebarService,
    private localUserService: LocalUserService
  ) { }

  ngOnInit() {
    this.sidebarService.register(this);
    this.userName = this.localUserService.getUser();
    this.isAdmin = this.userName == "Administrador";
  }

  ngAfterViewInit(): void {
    let sidebar: any = document.getElementsByClassName("sidebar")[0];
    let btn: any = document.getElementById("btn");
    let searchBtn: any = document.getElementsByClassName("fa-search")[0];

    btn.onclick = () => {
      sidebar.classList.toggle("active");
    }
    // searchBtn.onclick = () => {
    //   sidebar.classList.toggle("active");
    // }
  }

  navigate(path: string){
    this.router.navigateByUrl(path);
  }

  changeTitle(title: string){
    this.title = title;
  }

  logout(): void {
    this.localUserService.removeUser();
    this.router.navigate(["auth"]);
  }

}
