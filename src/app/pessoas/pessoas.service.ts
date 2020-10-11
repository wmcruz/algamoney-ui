// Angular
import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { environment } from 'environments/environment';

// Projeto-Interno
import { Cidade, Estado, Pessoa } from 'app/core/model';

// Terceiros
import 'rxjs/add/operator/toPromise';
import { AuthHttp } from 'angular2-jwt';

// Classe de Filtro para pessoa
export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoasService {
  // Atibutos
  pessoasUrl: string;
  cidadesUrl: string;
  estadosUrl: string;

  // Construtor
  constructor(private http: AuthHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  // Metodo de pesquisa de pessoas com filtro ou sem filtro
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
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
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  // serviço para excluir pessoa
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  // serviço para mudar status da pessoa
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
    .toPromise()
    .then(() => null);
  }

  // serviço responsável por adicionar uma nova pessoa
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json());
  }

  /**
   * Método responsável por atualizar pessoa
   * @param pessoa
   */
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa))
    .toPromise()
    .then(response => response.json() as Pessoa)
  }

  /**
   * Método responsável por pesquisar pessoa por código
   * @param codigo
   */
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(response => response.json() as Pessoa);
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get(this.estadosUrl)
    .toPromise()
    .then(response => response.json());
  }

  listarCidades(estado): Promise<Cidade[]> {
    const params = new URLSearchParams();
    params.set('estado', estado);

    return this.http.get(this.cidadesUrl, { search: params})
    .toPromise()
    .then(response => response.json());
  }
}