import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import {  MessageService } from '../services/message.service';
import { IEmployeeMessage } from './employee.model';



@Component({
  selector: 'app-employeeMessage',
  templateUrl:'./employeemessage.component.html'
})
export class EmployeeMessageComponent implements OnInit,OnChanges {
  employeeMessage: IEmployeeMessage[];
  //senderId: number;
  notificationSubscription: Subscription;
  userId: number;
  loginUser: string;
  
  @Input() senderId: number;
  @Input() receiverId: number;
  @Input() userName: string;

 
  //private _hubConnection: HubConnection;
  messageForm = this.fb.group({
    message: ['', Validators.required]
    
  });
 // messages: Message[];

  private connectionIsEstablished = false;
  constructor(private _http: Http,  private activateRoute: ActivatedRoute,
    private authenticate: AuthenticationService, private notification: MessageService,
    private fb: FormBuilder) {

  }
  getEmployeeMessages(senderId,receiverId) {
    //let userCredentials = JSON.parse(localStorage.getItem('IEmployee'));
    //this.senderId = userCredentials.employeeId;
    this.authenticate.getEmployeeMessages(senderId, receiverId)
      .subscribe(data => {
 
        this.employeeMessage = data;

        
      });

    
   
  }


  ngOnInit() {
   
    this.loginUser = JSON.parse(localStorage.getItem('IEmployee')).username;

    //this.notificationSubscription = this.authenticate.getEmployeeMessages.subscribe(msg => {
    //  this.messages.push(msg);
    //});
   

    this.notification.connect();
    this.getEmployeeMessages(this.senderId, this.receiverId);
  }

  onSubmit() {
    let userCredentials = JSON.parse(localStorage.getItem('IEmployee'));
    
    this.notification.send(userCredentials.username, this.userName, this.messageForm.getRawValue().message);
    let Employeemessage = { senderId: this.senderId, receiverId: this.receiverId, message:this.messageForm.getRawValue().message}
    this.authenticate.saveMessage(Employeemessage)
      .subscribe(
      data => {
       // this.getEmployeeMessages(this.senderId, this.receiverId);

        },
        error => {
      });
    this.notification.employeeMessage.subscribe(value => {
      //console.log(value);
     
      this.employeeMessage.push(value);
    });

    this.clearForm();
  }
  ngOnChanges() {
   // this.messages = [];
 
    this.clearForm();
  }

  clearForm() {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]

    });
  }

}
