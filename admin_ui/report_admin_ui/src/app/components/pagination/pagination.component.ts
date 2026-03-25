import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbPagination } from "@ng-bootstrap/ng-bootstrap";
import { PageOut, PaginationMeta } from '../../models/pagination-meta';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbPagination, FormsModule, NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {

  page: number = 10;
  pageSizes: number[] = [10, 20, 50, 70, 100];
  @Input() pagination?: PaginationMeta;
  pageOut?: PageOut = {};
  @Output() pageChangeEvent = new EventEmitter<PageOut>();
  ngOnInit(): void {

  }

  pageChange(newPage: number) {
    this.emitEvent();
  }

  pageSizeChangeEvent() {
    this.pagination!.CurrentPage = 1;
    this.emitEvent();
  }

  emitEvent() {
    this.pageOut = {
      CurrentPage: this.pagination?.CurrentPage,
      PageSize: this.pagination?.PageSize
    };
    this.pageChangeEvent.emit(this.pageOut);
  }
}
