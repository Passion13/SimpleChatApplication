import { Component, OnInit, AfterViewChecked, AfterViewInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
}
)
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;
  errorMessage: string="";
  display: boolean;
 
 
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private authenticate: AuthenticationService,
    private notification: MessageService
  ) {
 
  }
  ngOnInit(): void {
 
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      
    });
    localStorage.clear();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.notification.connect();

  }

  get login() {
   
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
   
    if (!this.loginForm.valid) {
      return;
    }
   

    this.loginForm.addControl('connectionid', this.formBuilder.control(this.notification.id, Validators.required));
    this.loading = true;
    this.authenticate.getAuthenticate(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.notification.getLogin(this.loginForm.getRawValue().username);
            localStorage.setItem('IEmployee', JSON.stringify(data));
            this.router.navigate(['/employee']);
          }
          else {
            this.loading = false;
            this.router.navigate([this.returnUrl]);
            this.errorMessage= 'Username or password is incorrect';
          }

        },
        error => {
          
          this.loading = false;
        });

    
  }

}
