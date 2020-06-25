import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  oauthTokenUtl = 'http://localhost:8080/oauth/token';

  constructor(private http: Http) { }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUtl, body, { headers })
    .toPromise()
    .then(response => {
      console.log(response);
    })
    .catch(erro => {
      console.log(erro);
    });
  }
}