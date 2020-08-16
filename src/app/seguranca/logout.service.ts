// Angular
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

// Projeto-Interno
import { AuthService } from './auth.service';

// Terceiros
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class LogoutService {

  tokenRevokeUrl: string;

  constructor(
    private http: AuthHttp,
    private auth: AuthService
    ) {
      this.tokenRevokeUrl = `${environment.apiUrl}/tokens/revoke`;
    }

  logout() {
    return this.http.delete(this.tokenRevokeUrl, { withCredentials: true})
    .toPromise()
    .then(() => {
      this.auth.limparAccessToken();
    });
  }
}