import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HttpModule } from '@angular/http';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeMessageComponent } from './employee/employeemessage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeComponent,
    EmployeeMessageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),

    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'employee', component: EmployeeComponent }
    
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
