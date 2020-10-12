import { Injectable } from '@angular/core';


import { environment } from 'environments/environment';
import { MoneyHttp } from 'app/seguranca/money-http';

@Injectable()
export class CategoriaService {

  // Variaveis da classe
  categoriasUrl: string;

  // Construtor
  constructor(private http: MoneyHttp) {
      this.categoriasUrl = `${environment.apiUrl}/categorias`;
    }

  // Métodos
  listarTodas(): Promise<any> {
    return this.http.get(this.categoriasUrl)
    .toPromise();
  }
}