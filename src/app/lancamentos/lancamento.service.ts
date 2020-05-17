import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: Http) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();
    // tslint:disable-next-line: max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCJdLCJub21lIjoiQWRtaW5pc3RyYWRvciIsImV4cCI6MTU4OTY3NTkyMiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9DQURBU1RSQVJfQ0FURUdPUklBIiwiUk9MRV9QRVNRVUlTQVJfUEVTU09BIiwiUk9MRV9SRU1PVkVSX1BFU1NPQSIsIlJPTEVfQ0FEQVNUUkFSX0xBTkNBTUVOVE8iLCJST0xFX1BFU1FVSVNBUl9MQU5DQU1FTlRPIiwiUk9MRV9SRU1PVkVSX0xBTkNBTUVOVE8iLCJST0xFX0NBREFTVFJBUl9QRVNTT0EiLCJST0xFX1BFU1FVSVNBUl9DQVRFR09SSUEiXSwianRpIjoiM2IzN2IxZWUtYzJlZS00NmE4LWFiZWEtNjE4MmY5ZjBjOGQ2IiwiY2xpZW50X2lkIjoibW9iaWxlIn0.3Snh-E82ymYnm0JWNUQ80zrGUdgp62mbtr3qkZOkl3c');

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
    .then(response => response.json().content);
  }
}