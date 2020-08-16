import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';
import { environment } from 'environments/environment';

@Injectable()
export class CategoriaService {

  // Variaveis da classe
  categoriasUrl: string;

  // Construtor
  constructor(private http: AuthHttp) {
      this.categoriasUrl = `${environment.apiUrl}/categorias`;
    }

  // Métodos
  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
    .toPromise()
    .then(response => response.json());
  }
}