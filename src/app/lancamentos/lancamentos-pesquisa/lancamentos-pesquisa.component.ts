import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  // Atributos
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  lancamentos = [];

  // construtor
  constructor(private lancamentoService: LancamentoService) { }

  // init
  ngOnInit() {
    this.pesquisar();
  }

  // metodo de pesquisa de lancamentos
  pesquisar() {
    const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };

    this.lancamentoService.pesquisar( filtro )
    .then(lancamentos => this.lancamentos = lancamentos);
  }
}
