// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Projeto-Interno
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoasService } from 'app/pessoas/pessoas.service';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';

// Terceiros
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  // Atributos
  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  // Construtor
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoasService,
    private lancamentoService: LancamentoService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean (this.lancamento.codigo);
  }

  salvar(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.toastyService.success('Lançamento adicionando com sucesso!')
      form.reset();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .then(categorias => {
      this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => ({label: p.nome, value: p.codigo }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}