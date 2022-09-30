import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/table/models/table-header';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, AfterViewInit {

  // @ViewChild('btn', {static: false}) btn: ElementRef | undefined;
  // @ViewChild('sidebar', {static: false}) sidebar: ElementRef | undefined;
  // @ViewChild('btn', {static: false}) btn: ElementRef | undefined;

  // btn: any = document.querySelector("#btn");

  sidebar = document.querySelector(".sidebar");
  searchBtn = document.querySelector("bx-search");

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

  constructor(private studentsService: StudentsService, private router: Router) { }

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

  ngOnInit() {

    // this.studentsService.getAllStudents().subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.students = response;
    //   },
    //   error: (errMsg) => {
    //     console.error(errMsg);
    //   }
    // })



  }

  toStudentDetail(student: any){
    this.router.navigate(["app", "student", student.id]);
  }

  find(){
    console.log(this.valueIconRight);
  }

}
