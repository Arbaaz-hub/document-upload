import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('drawer') drawer!: MatDrawer; // Reference to the mat-drawer
  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //This is being used to check the user is authenticated or not.
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  //This is used to logout from the app and close the sidebar.
  onLogout() {
    this.authService.logout();
    this.drawer.close();
  }

  //This is used to unsubscribe the observable.
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
