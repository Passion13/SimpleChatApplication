import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Subject } from 'rxjs';
import { IEmployeeMessage } from '../employee/employee.model';


@Injectable()
export class MessageService {
  private connection: signalR.HubConnection;
  employeeMessage=new Subject<IEmployeeMessage>();
  count: number;
  isOnline: boolean;
  //clients = new Subject<client>();
  id: any;
  connect() {

    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .configureLogging(signalR.LogLevel.Debug)
        .build();

      //this.connection.on('NewOnlineUser', (onlineUser: string) => {

      //  this.clients.next({ user: onlineUser, data: "" });
      //});
      this.connection.on('GetLogin', (x: string) => {
        this.id = x
        //localStorage.setItem('key', onlineUser);
      });

      this.connection.on('ReceiveMessage', (user: string, message: string, time: string, loginUser: string) => {

        this.employeeMessage.next({
          receiverId: 0, connectionId: '', employeeId: 0, isRead: false, message: message
          , senderName: user, receiverName: loginUser , createdDate: time
        });
      });
      //this.connection.on('updateCount', (count: number) => {
      //  this.count = count;
      //});

      this.connection.start().catch(err => { console.error(err); });
    }
  }
  disconnect() {
    if (this.connection) {
      this.connection.stop();
      this.connection = null;
    }
  }

  send(loginUser, username, message) {
    this.connection.invoke("SendPrivateMessage", loginUser, message, username).catch(err => { console.error(err); });
  }
  getConnectionId() {

    this.connection.invoke("GetConnectionId").then(x => {
      this.id = x;
    }).catch(err => { console.error(err); });;

  }
  getLogin(name) {

    this.connection.invoke("Login", name).then(x => {
      this.id = x;
    }).catch(err => { console.error(err); });;

  }
  getOnline(name) {
    this.connection.invoke("IsOnline", name).then(x => {
      this.isOnline = x;
    }).catch(err => { console.error(err); });;

  }
  //getClients() {
  //  //let test = localStorage.getItem('key');
  //    this.connection.invoke("GetAllActiveConnections").catch(err => { console.error(err); });
  //}
}
//export interface Message {
//  user: string;
//  content: string;
//  time: string;
//  loginUser: string
//}
//export interface client {
//  user: string;
//  data: string;

//}
