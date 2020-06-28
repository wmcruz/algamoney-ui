import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthService {

  oauthTokenUtl = 'http://localhost:8080/oauth/token';
  jwtPayload: any;

  constructor(private http: Http,
    private jwtHelper: JwtHelper) {
      this.carregarToken();
    }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUtl, body, { headers })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.json().access_token);
    })
    .catch(erro => {
      if (erro.status === 400) {
        const responseJson = erro.json();

        if (responseJson.error === 'invalid_grant') {
          return Promise.reject('Usuário ou senha inválida!');
        }
      }

      return Promise.reject(erro);
    });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }
}