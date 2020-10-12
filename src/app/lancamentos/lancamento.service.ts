// Angular
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

// Terceiros
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

// Projeto-Interno
import { Lancamento } from 'app/core/model';
import { MoneyHttp } from 'app/seguranca/money-http';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl: string;

  constructor(private http: MoneyHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.descricao) {
      params = params.append('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoInicio) {
      params = params.append('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.lancamentosUrl}?resumo`, { params })
    .toPromise()
    .then(response => {
      const lancamentos = response.content;

      const resultado = {
        lancamentos,
        total: response.totalElements
      };

      return resultado;
    })
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
    .toPromise();
  }

  /**
   * Método responsável por atualizar um lançamento
   * @param lancamento
   */
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response;

      this.converterStringsParaDatas([lancamentoAlterado]);

      return lancamentoAlterado;
    });
  }

  /**
   * Método responsavel por pesquisar um lancamento pelo código
   * @param codigo
   */
  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response;
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

  urlUploadAnexo() {
    return `${this.lancamentosUrl}/anexo`;
  }
}