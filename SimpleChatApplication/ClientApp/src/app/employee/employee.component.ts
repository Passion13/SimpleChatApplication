import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Http } from '@angular/http';
import { Component, OnInit, AfterViewInit, OnDestroy, OnChanges, AfterContentInit, Input } from '@angular/core';
import { MessageService } from '../services/message.service';
import { CodeNode } from 'source-list-map';
@Component({
  selector: 'app-employee',
  templateUrl:'./employee.component.html'
})

export class EmployeeComponent implements OnInit {
  employees: IEmployee[];
  
  userName: string;
  loginUser: string;
  loginUserId: number;
  //count: number;
  interval: any;
  //clients: any;
  receiverId: number;
  senderId: number;
 
  
  connectionId: string;
  private loadHistoryComponent = false;
  constructor(public http: Http, private router: Router, private authenticate: AuthenticationService,
    private notification: MessageService) {
    this.notification.connect();  
  }

  loadHistory(senderId, receiverId, name) {
    this.senderId = senderId;
    this.receiverId = receiverId;
    this.userName = name;
 
    this.loadHistoryComponent = true;
  }
  ngOnInit() {

    this.interval = setInterval(() => {
      this.refreshData();
    }, 5000);
    
    //this.count = this.notification.count;
    this.refreshData();
   
  }

  logout() {
    let userCredentials= JSON.parse(localStorage.getItem('IEmployee'))
    this.authenticate.logout(userCredentials.employeeId)
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  refreshData() {
   
    let userCredentials = JSON.parse(localStorage.getItem('IEmployee'));
    this.loginUserId = userCredentials.employeeId;
    this.loginUser = userCredentials.username;

    this.authenticate.getEmployees(this.loginUserId).subscribe(
     data => {   this.employees = data;
      },
      error => { });
   
  
  }
 

}

interface IEmployee {
  employeeId: number,
  userName: string,
  isOnline: boolean,
  connectionId: string,
  count: number;

}
