import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { BoxIcon } from '../../constants/box-icon';
import { DtoUserList } from '../../features/auth/user-controller/models/dto-user-list';

@Component({
  selector: 'app-user-list-card',
  standalone: true,
  imports: [],
  templateUrl: './user-list-card.component.html',
  styleUrl: './user-list-card.component.css'
})
export class UserListCardComponent {
  boxIcon = BoxIcon;
  @Input() user?: DtoUserList
  readonly len:number = 15;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  get fullName(): string {
    const name = `${this.user?.firstName ?? ''} ${this.user?.lastName ?? ''}`.trim();
    return name.length > this.len ? name.substring(0, this.len) + '...' : name;
  }

  deleteCommand()
  {
    this.delete.emit(this.user!.rowId);
  }

  editCommand()
  {
    this.edit.emit(this.user!.rowId);
  }
}
