import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from 'src/app/components/table/models/sort';
import { TableHeader } from 'src/app/components/table/models/table-header';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() isLoading: boolean = false;
  @Input() totalRecords: number = 0;
  @Input() data: Array<any> = [];
  @Input() autofill: boolean = false;
  @Input() total: number = 0;
  @Input() headers: TableHeader[] = [];
  @Input() multipleSort: boolean = false;
  @Output() sort: EventEmitter<{ sortBy: string, sort: string }> = new EventEmitter();
  @Output("pageChange") pageChange: EventEmitter<{page: number}> = new EventEmitter(); 
  @Output("onSearch") onSearch: EventEmitter<string> = new EventEmitter();
  @Output("onAdd") onAdd: EventEmitter<void> = new EventEmitter();

  searchText: string = "";

  constructor() {

  }

  ngOnInit(): void {
  }

  public onClickHeader(header: TableHeader) {
    if (this.multipleSort) this.headers.filter(h => h.active).map(h => h.active = false);
    header.active = header.active ? false : true;

    if (header.sortable) {
      header.sort = header.sort === Sort.ASC ? Sort.DESC : Sort.ASC;
      this.sort.emit({ sortBy: header.key, sort: header.sort });
    }
  }

  emitSearch(){
    // this.onSearch.emit((this.mode == "nivel") ? {mode: "nivel", level: this.searchText, teacherName: null} : {mode: "profesor", level: null, teacherName: this.searchText});
    this.onSearch.emit(this.searchText);
  }

  changePage(event: any){
    this.pageChange.emit(event);
  }

  add(){
    this.onAdd.emit();
  }

  // changeSearchText(e: any){
  //   this.searchText = e.target.value;
  // }

  // OnBlurDesde(event: any){
  //   let day: number = parseInt(event.target.value.slice(0, 2));
  //   let month: number = parseInt(event.target.value.slice(3, 5));
  //   let year: number = parseInt(event.target.value.slice(6, 10));
    
  //   let result = `${year}-${month}-${day}`;

  //   let hours: number = parseInt(event.target.value.slice(11, 13));
  //   let minutes: number = parseInt(event.target.value.slice(14, 17));

  //   result += ` ${hours}:${minutes}:00`;
    
  //   this.desde = result;
  // }

  // OnBlurHasta(event: any){
  //   let day: number = parseInt(event.target.value.slice(0, 2));
  //   let month: number = parseInt(event.target.value.slice(3, 5));
  //   let year: number = parseInt(event.target.value.slice(6, 10));
    
  //   let result = `${year}-${month}-${day}`;

  //   let hours: number = parseInt(event.target.value.slice(11, 13));
  //   let minutes: number = parseInt(event.target.value.slice(14, 17));

  //   result += ` ${hours}:${minutes}:00`;
    
  //   this.hasta = result;
  // }


}
