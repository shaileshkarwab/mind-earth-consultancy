import { Component, Input } from '@angular/core';
import { TableColumn } from './table-column';
import { JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [NgFor,JsonPipe],
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.css'
})
export class GenericTableComponent<T> {
  @Input() columns: TableColumn[] = [];
  @Input() data: T[] = [];
}
