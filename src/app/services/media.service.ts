import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  status: string;
  file: File;
  title: string;
  description: string;

  baseURL = 'http://media.mw.metropolia.fi/wbma';

  constructor(private http: HttpClient, private router: Router) { }

  public login() {

    const body = {
      username: this.username,
      password: this.password,
    };
    console.log('username ' + this.username);
    console.log('password ' + this.password);

    const setting = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.baseURL + '/login', body, setting).
      subscribe(response => {
        console.log(response['token']);
        localStorage.setItem('token', response['token']);
        this.router.navigate(['front']);
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.status = error.error.message;
      });
  }

  public getUserData() {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token')),
    };
    return this.http.get(this.baseURL + '/users/user', settings);
  }

  public register(user) {
    return this.http.post(this.baseURL + '/users', user);
  }

  upload(formData) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };

    return this.http.post(this.baseURL + '/media', formData, settings).subscribe(response => {
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });

  }

}
