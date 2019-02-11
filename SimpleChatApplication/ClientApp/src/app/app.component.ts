import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  , providers: [AuthenticationService, MessageService]
})
export class AppComponent {
  title = 'app';
}
