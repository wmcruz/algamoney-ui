// Angular
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

// Projeto-Interno
import { Cidade, Estado, Pessoa } from 'app/core/model';

// Terceiros

import { MoneyHttp } from 'app/seguranca/money-http';

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
  constructor(private http: MoneyHttp) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  // Metodo de pesquisa de pessoas com filtro ou sem filtro
  pesquisar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.pessoasUrl}`, { params })
      .toPromise()
      .then(response => {
        const pessoas = response.content;

        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  // Metodo para listar todas as pessoas
  listarTodas(): Promise<any> {
    return this.http.get<any>(this.pessoasUrl)
      .toPromise()
      .then(response => response.content);
  }

  // serviço para excluir pessoa
  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  // serviço para mudar status da pessoa
  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers })
    .toPromise()
    .then(() => null);
  }

  // serviço responsável por adicionar uma nova pessoa
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
    .toPromise();
  }

  /**
   * Método responsável por atualizar pessoa
   * @param pessoa
   */
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
    .toPromise();
  }

  /**
   * Método responsável por pesquisar pessoa por código
   * @param codigo
   */
  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
    .toPromise();
  }

  listarEstados(): Promise<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl)
    .toPromise();
  }

  listarCidades(estado): Promise<Cidade[]> {
    const params = new HttpParams().append('estado', estado);

    return this.http.get<Cidade[]>(this.cidadesUrl, { params })
    .toPromise();
  }
}