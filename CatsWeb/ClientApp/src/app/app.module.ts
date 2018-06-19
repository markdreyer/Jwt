import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthorizationService } from '../services/authorization.service';
import { AuthInterceptor } from './app.interceptor';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'counter', component: CounterComponent },
      { path: 'counter', component: CounterComponent, canActivate: [AdminGuard] },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'unauthorized', component: UnauthorizedComponent },
    ])
  ],
  providers: [
    AuthorizationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
