import { Component } from '@angular/core';
import { AuthRoutingModule } from "../auth-routing.module";
import { LeftNavBarComponent } from "../left-nav-bar/left-nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { TopNavigationBarComponent } from "../top-navigation-bar/top-navigation-bar.component";

@Component({
  selector: 'app-auth-lay-out',
  standalone: true,
  imports: [AuthRoutingModule, LeftNavBarComponent, FooterComponent, TopNavigationBarComponent],
  templateUrl: './auth-lay-out.component.html',
  styleUrl: './auth-lay-out.component.css'
})
export class AuthLayOutComponent {

}
