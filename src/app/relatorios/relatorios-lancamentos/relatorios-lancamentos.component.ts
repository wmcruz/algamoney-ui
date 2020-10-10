import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorios.service';

@Component({
  selector: 'app-relatorios-lancamentos',
  templateUrl: './relatorios-lancamentos.component.html',
  styleUrls: ['./relatorios-lancamentos.component.css']
})
export class RelatoriosLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
    .then(relatorio => {
      const url = window.URL.createObjectURL(relatorio);

      window.open(url);
    });
  }
}