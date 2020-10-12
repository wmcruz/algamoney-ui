// Angular
import { Component, OnInit, ViewChild } from '@angular/core';

// Projeto-Interno
import { PessoaFiltro, PessoasService } from './../pessoas.service';

// Terceiros
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  // Atributos
  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela', { static: true }) grid: any;

  // Construtor
  constructor(
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandle: ErrorHandlerService) { }

    ngOnInit(): void { }

  // metodo de pesquisa de pessoas
  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      })
      .catch(erro => this.errorHandle.handle(erro));
  }

  // metodo de calculo de paginacao
  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  // metodo que pergunta ao usuário antes de exluir a pessoa
  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  // metodo de excluir pessoa
  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
    .then(() => {
      if (this.grid.first === 0) {
        this.pesquisar();
      } else {
        this.grid.first = 0;
      }

      this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso.'});
    })
    .catch(erro => this.errorHandle.handle(erro));
  }

  // metodo para mudar status da pessoa
  mudarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      pessoa.ativo = novoStatus;
      this.messageService.add({ severity: 'success', detail: `Pessoa ${acao} com sucesso!`});
    })
    .catch(erro => { this.errorHandle.handle(erro) });
  }
 }