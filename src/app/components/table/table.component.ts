import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from 'src/app/components/table/models/sort';
import { TableHeader } from 'src/app/components/table/models/table-header';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() data: Array<any> = [];
  @Input() autofill: boolean = false;
  @Input() total: number = 0;
  @Input() headers: TableHeader[] = [];
  @Input() multipleSort: boolean = false;
  @Output() sort: EventEmitter<{ sortBy: string, sort: string }> = new EventEmitter();

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

  edit(item: any) {

  }

  delete(item: any) {

  }

}
