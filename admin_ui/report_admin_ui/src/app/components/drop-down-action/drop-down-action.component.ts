import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down-action',
  standalone: true,
  imports: [],
  templateUrl: './drop-down-action.component.html',
  styleUrl: './drop-down-action.component.css'
})
export class DropDownActionComponent {
  @Input() data?:string;
  @Output() editEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<string>();
  editCommand()
  {
    this.editEvent.emit(this.data!);
  }

  deleteCommand()
  {
    this.deleteEvent.emit(this.data!);
  }
}
