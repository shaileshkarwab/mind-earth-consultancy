import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonModel } from '../../models/button-model';
import { NgFor, NgClass, Location } from '@angular/common';
import { ToolBarAction } from '../../constants/tool-bar-action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-bar',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './tool-bar.component.html',
  styleUrl: './tool-bar.component.css'
})
export class ToolBarComponent {
  @Input() buttons:Array<ButtonModel> = [];
  @Output() clickEvent = new EventEmitter<ToolBarAction>();
  location = inject(Location);
  toolBarClickEvent(btn:ButtonModel)
  {
      if(btn.key == ToolBarAction.BACK)
      {
        this.location.back();
        return;
      }
      this.clickEvent.emit(btn.key);
  }
}
