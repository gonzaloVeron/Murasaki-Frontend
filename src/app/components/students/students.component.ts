import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TableHeader } from 'src/app/components/table/models/table-header';
import { StudentsService } from './services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  @Input() menuItems: any[] = [];
  @Input() logo = "";
  @Input() companyName = "";
  @Input() normal = true;
  @Input() mini = false;
  @Input() profileImage = '';
  @Input() name = '';
  @Input() email = '';
  @Input() link: string = 'https://aam.solutions';

  loading: boolean = false;
  students: any[] = [];
  total: number = 0;
  limit: number = 5;
  headers: TableHeader[] = [
    { name: "Nombre", key: "name" },
    { name: "Nivel", key: "jlptLevel" },
    { name: "Id Profesor", key: "teacherDTO.name" },
    { name: "", key: "" },
  ];

  sort: { sortBy: string, sort: string } = { sortBy: '', sort: 'DESC' };

  onSort(event: any){
    console.log(event);
  }

  constructor(private studentsService: StudentsService, private router: Router) { }

  ngOnInit() {
    this.studentsService.getAllStudents().subscribe({
      next: (response: any) => {
        this.students = response;
      },
      error: (errMsg) => {
        console.error(errMsg);
      }
    })
  }

  toStudentDetail(student: any){
    this.router.navigate(["app", "sidebar", "student", student.id]);
  }

  find(event: any){
    console.log(event);
  }

}
