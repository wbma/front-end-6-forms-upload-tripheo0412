import {Component, OnInit} from '@angular/core';
import {User} from '../interfaces/user';
import {MediaService} from '../services/media.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  constructor(public mediaService: MediaService, private router: Router) { }

  user: User = {
    username: '',
    password: '',
    email: '',
  };

  register() {
    console.log(this.user);
    this.mediaService.register(this.user).
      subscribe(response => {
        console.log(response);
        this.mediaService.username = this.user.username;
        this.mediaService.password = this.user.password;
        this.mediaService.login();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  ngOnInit() {

  }

}
