import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { LeftMenu } from '../models/left-menu';
import { Subscription } from 'rxjs';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { AuthRoutingModule } from "../auth-routing.module";
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-nav-bar',
  standalone: true,
  imports: [NgFor, NgClass, AuthRoutingModule, NgIf],
  templateUrl: './left-nav-bar.component.html',
  styleUrl: './left-nav-bar.component.css'
})
export class LeftNavBarComponent implements OnInit, OnDestroy {

  //variables
  menuService = inject(MenuService);
  menus: Array<LeftMenu> = [];
  menuSubscription!: Subscription;
  router = inject(Router);
  //methods
  ngOnInit(): void {
    this.menuSubscription = this.menuService.getLeftNavBar()
      .subscribe((next) => {
        this.menus = next.data;
      });
  }

  ngOnDestroy(): void {
    this.menuSubscription.unsubscribe();
  }

  toggleMenu(menu:LeftMenu)
  {
    if(menu.details.length > 0)
    {
    menu.toggle = !menu.toggle;
    }
    else 
    {
      this.router.navigate(['/','auth',menu.controller,menu.pageUrl]);
    }
  }
}
