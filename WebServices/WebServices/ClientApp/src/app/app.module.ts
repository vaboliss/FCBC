import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BackwardChainingComponent } from './backward-chaining/backward-chaining.component';
import { ForwardChainingComponent } from './forward-chaining/forward-chaining.component';
import { ResultPageComponent } from './result-page/result-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BackwardChainingComponent,
    ForwardChainingComponent,
    ResultPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'backwardChaining', component: BackwardChainingComponent },
      { path: 'forwardChaining', component: ForwardChainingComponent },
      { path: 'result', component: ResultPageComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
