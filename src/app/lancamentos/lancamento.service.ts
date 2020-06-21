// Angular
import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

// Terceiros
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

// Projeto-Interno
import { Lancamento } from 'app/core/model';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';
  // tslint:disable-next-line: max-line-length
  tokenBearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTkyNzAwMzk5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJmZDFlOTY0ZC0wYzhhLTQ2NjctYjQ3ZC1jMjMxZWI1MmJlMDMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.KQmRSeNSYxdKju491argN1TETJuEDW4lNYr1tmNX_7c';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoInicio) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const lancamentos = responseJson.content;

      const resultado = {
        lancamentos,
        total: responseJson.totalElements
      };

      return resultado;
    })
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
    .toPromise()
    .then(response => response.json());
  }

  /**
   * Método responsável por atualizar um lançamento
   * @param lancamento
   */
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`, JSON.stringify(lancamento), { headers })
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response.json() as Lancamento;

      this.converterStringsParaDatas([lancamentoAlterado]);

      return lancamentoAlterado;
    });
  }

  /**
   * Método responsavel por pesquisar um lancamento pelo código
   * @param codigo
   */
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    headers.append('Authorization', this.tokenBearer);

    return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
    .toPromise()
    .then(response => {
      const lancamento = response.json() as Lancamento;
      this.converterStringsParaDatas([lancamento]);

      return lancamento;
    });
  }

  /**
   * Método responsável por converter as datas que vem do BD no formato de String p/ Date
   * @param lancamentos
   */
  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}