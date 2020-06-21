// Angular
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

// Projeto-Interno
import { Pessoa } from 'app/core/model';

// Terceiros
import 'rxjs/add/operator/toPromise';

// Classe de Filtro para pessoa
export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {
  // Atibutos
  pessoasUrl = 'http://localhost:8080/pessoas';
  // tslint:disable-next-line: max-line-length
  tokenBearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTkyNzgwNTgzLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJmMTU3OTZkZC00ZDgzLTQ4ZTMtYjYyOC04MTZkMzYzNzhlYTYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.9Eh2651-svWrUtXsh_v9fJWUHvSDOD1VR5bTdGXkDSE';

  // Construtor
  constructor(private http: Http) { }

  // Metodo de pesquisa de pessoas com filtro ou sem filtro
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', this.tokenBearer);

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson  = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  // Metodo para listar todas as pessoas
  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    return this.http.get(this.pessoasUrl, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  // serviço para excluir pessoa
  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  // serviço para mudar status da pessoa
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  // serviço responsável por adicionar uma nova pessoa
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => response.json());
  }

  /**
   * Método responsável por atualizar pessoa
   * @param pessoa
   */
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
    .toPromise()
    .then(response => response.json() as Pessoa)
  }

  /**
   * Método responsável por pesquisar pessoa por código
   * @param codigo
   */
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
    .toPromise()
    .then(response => response.json() as Pessoa);
  }
}