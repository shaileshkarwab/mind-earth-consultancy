import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgHttpLoaderComponent, NgHttpLoaderModule, Spinkit } from 'ng-http-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgHttpLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'report_admin_ui';
  public spinkit = Spinkit;
  constructor() {
    
  }

}
