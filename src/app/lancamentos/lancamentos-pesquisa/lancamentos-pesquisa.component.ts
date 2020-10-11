// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Projeto-Interno
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { AuthService } from 'app/seguranca/auth.service';

// Terceiros
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  // Atributos
  lancamentos = [];
  filtro = new LancamentoFiltro();
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  // construtor
  constructor(
    private lancamentoService: LancamentoService,
    private auth: AuthService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandlerService,
    private title: Title) { }

  // init
  ngOnInit() {
    this.title.setTitle('Pesquisa de Lançamentos');
  }

  // metodo de pesquisa de lancamentos
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar( this.filtro )
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    .catch(erro => this.errorHandle.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso.'});
    })
    .catch(erro => this.errorHandle.handle(erro))
  }
}