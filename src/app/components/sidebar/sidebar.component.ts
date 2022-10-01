import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from '../table/models/table-header';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @Input() menuItems: any[] = [];
  @Input() logo = "";
  @Input() companyName = "";
  @Input() normal = true;
  @Input() mini = false;
  @Input() profileImage = '';
  @Input() name = '';
  @Input() email = '';
  @Input() link: string = 'https://aam.solutions';


  valueIconRight: string = "";

  loading: boolean = false;
  students: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "Nivel", key: "jlptLevel" },
    { name: "Id Profesor", key: "teacherDTO.name" },
    { name: "Acciones", key: "" },
  ];

  sort: { sortBy: string, sort: string } = { sortBy: '', sort: 'DESC' };

  onSort(event: any){
    console.log(event);
  }

  toStudentDetail(student: any){
    this.router.navigate(["app", "student", student.id]);
  }

  constructor(private router: Router) { }

  ngOnInit() {
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

}
