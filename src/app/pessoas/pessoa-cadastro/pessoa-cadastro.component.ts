// Angular
import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormControl } from '@angular/forms';

// Projeto-Interno
import { PessoasService } from '../pessoas.service';
import { Pessoa } from 'app/core/model';
import { ErrorHandlerService } from 'app/core/error-handler.service';

// Terceiros
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  // Atributos
  pessoa = new Pessoa();

  // Contrutor
  constructor(
    private pessoaService: PessoasService,
    private toastyService: ToastyService,
    private errorHandler: ErrorHandlerService) { }

  // Init da classe
  ngOnInit() { }

  // Método responsável por chamar o serciço para adicionar pessoa nova
  salvar(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.toastyService.success('Pessoa adicionada com sucesso!!!')
      form.reset();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }
}
