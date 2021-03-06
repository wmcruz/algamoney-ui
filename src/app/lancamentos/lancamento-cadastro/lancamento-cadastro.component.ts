// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

// Projeto-Interno
import { CategoriaService } from 'app/categorias/categoria.service';
import { ErrorHandlerService } from 'app/core/error-handler.service';
import { PessoasService } from 'app/pessoas/pessoas.service';
import { Lancamento } from 'app/core/model';
import { LancamentoService } from '../lancamento.service';

// Terceiros
import { MessageService } from 'primeng/api';

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
  formulario: FormGroup;
  uploadEmAndamento = false;

  // Construtor
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoasService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.configurarFormulario();
    this.title.setTitle('Novo Lançamento');
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: [ 'RECEITA', Validators.required ],
      dataVencimento: [ null, Validators.required ],
      dataPagamento: [],
      descricao: [ null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
      valor: [ null, Validators.required ],
      pessoa: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }),
      categoria: this.formBuilder.group({
        codigo: [ null, Validators.required ],
        nome: []
      }) ,
      observacao: [],
      anexo: [],
      urlAnexo: []
    });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true });
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor }}
    };
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean (this.formulario.get('codigo').value);
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamentoAdicionado => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' })
      // form.reset();
      this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {
      // this.lancamento = lancamento;
      this.formulario.patchValue(lancamento);

      this.messageService.add({ severity: 'success', detail: 'Lancamento alterado com sucesso!'});
      this.atualizarTituloEdicao();
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

  novo() {
    this.formulario.reset();

    // gambiarra do javascript
    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de laçamento: ${this.formulario.get('descricao').value}`);
  }

  get urlUploadAnexo() {
    return this.lancamentoService.urlUploadAnexo();
  }

  antesUploadAnexo(event) {
    event.xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
    this.uploadEmAndamento = true;
  }

  aoTerminarUploadAnexo(event) {
    const anexo = JSON.parse(event.xhr.response);

    this.formulario.patchValue({
      anexo: anexo.nome,
      urlAnexo: (anexo.url as string).replace('\\', 'https://')
    });

    this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    })
  }

  get nomeAnexo() {
    const nome = this.formulario.get('anexo').value;

    if (nome) {
      return nome.substring(nome.indexOf('_') + 1, nome.length)
    }

    return '';
  }

  erroUpload(event) {
    this.messageService.add({ severity: 'error', detail: 'Erro ao tentar enviar anexo!'});
    this.uploadEmAndamento = false;
  }
}