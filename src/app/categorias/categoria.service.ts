import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CategoriaService {

  // Variaveis da classe
  categoriasUrl = 'http://localhost:8080/categorias';
  // tslint:disable-next-line: max-line-length
  token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTkxNzU4MTg0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIwZDQ5OGRiYi03OGQ4LTQxMjUtODZmYy0xOTE2OWVlNmVlMjQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.qAP4Rn1DSF6tMgshSStLBphoGXwU5y4roChyjOsvM3A';

  // Construtor
  constructor(private http: Http) { }

  // Métodos
  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', this.token);

    return this.http.get(this.categoriasUrl, { headers })
    .toPromise()
    .then(response => response.json());
  }
}