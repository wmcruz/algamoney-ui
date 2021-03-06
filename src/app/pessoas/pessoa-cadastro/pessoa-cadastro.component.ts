// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Projeto-Interno
import { PessoasService } from '../pessoas.service';
import { Contato, Pessoa } from 'app/core/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';

// Terceiros
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  // Atributos
  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  // Contrutor
  constructor(
    private pessoaService: PessoasService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  // Init da classe
  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    this.carregarEstados();

    if (codigoPessoa) {
      this.carregaPessoa(codigoPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(
      lista => {
        this.estados = lista.map(uf => ({ label: uf.nome, value: uf.codigo}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.listarCidades(this.estadoSelecionado).then(
      lista => {
        this.cidades = lista.map(c => ({ label: c.nome, value: c.codigo}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  // Método responsável por chamar o serciço para adicionar pessoa nova
  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(pessoaAdicionada => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!!!'});
      this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa => {
      this.pessoa = pessoa;

      this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!!!'});
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregaPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
        this.pessoa.endereco.cidade.estado.codigo : null;
      this.atualizarTituloEdicao();
    })
    .catch(erro => { this.errorHandler.handle(erro)});
  }

  get editando() {
    return Boolean (this.pessoa.codigo);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  nova(form: FormControl) {
    form.reset();

    // gambiarra do javascript
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }
}