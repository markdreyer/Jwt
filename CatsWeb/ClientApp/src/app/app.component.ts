import { Component, OnInit, Inject } from '@angular/core';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(public authService: AuthorizationService, @Inject('BASE_URL') public baseUrl: string) {

  }
  ngOnInit() {
    this.authService.login().subscribe(
      data => {
        if (data.sub) {
          console.warn(`User: ${this.authService.claims.sub} LOGGED IN`);
        } else {
          console.warn('User failed to authorize in app');
        }
      },
      error => {
        console.error('Error while calling the server to authorize the user');
      }
    );
  }
}
