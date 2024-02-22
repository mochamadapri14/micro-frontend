import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableHeader } from './interface-table';

@Component({
  selector: 'custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnChanges {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() headers: TableHeader[] = [];
  @Input() collections: any[] = [];

  @Output() pageChanged = new EventEmitter<PageEvent>();
  @Output() onSelected = new EventEmitter<any>();

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource(this.collections);

  pageIndex = 0;
  pageSize = 10;
  resultLength: number = 0;
  constructor() { }

  ngOnChanges(): void {
    this.headers = [...this.headers, { column: 'action', label: 'Action' }];
    this.resultLength = this.collections.length;
    this.displayedColumns = this.headers.length > 0 ? this.headers.map(p => p.column) : [];
    this.dataSource = new MatTableDataSource(this.collections)
  }

  handlePageEvent(e: PageEvent) {
    this.resultLength = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.pageChanged.emit(e);
  }

  selectionRow(action: string, collector: any): void {
    this.onSelected.emit({
      action: action,
      collector: collector
    });
  }

}

