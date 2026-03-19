import { Component, inject } from '@angular/core';
import { UserService } from '../../no-auth/service/user.service';
import { TokenService } from '../../no-auth/service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-navigation-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-navigation-bar.component.html',
  styleUrl: './top-navigation-bar.component.css'
})
export class TopNavigationBarComponent {
  userService = inject(UserService);
  tokenService = inject(TokenService);
  router = inject(Router);
  logOut() {
    this.userService.logout(this.tokenService.getRefresToken())
      .subscribe(() => {
        this.tokenService.remove();
        this.router.navigate(['/login']);
      });
  }
}
