// Angular
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

// Projeto-Interno
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoasService } from 'app/pessoas/pessoas.service';

// Terceiros
import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { CategoriaService } from 'app/categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
     // Terceiros
     ToastyModule.forRoot(),
     ConfirmDialogModule
  ],
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent ],
  exports: [ NavbarComponent, ToastyModule, ConfirmDialogModule ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoasService,
    CategoriaService,
    Title,
    ConfirmationService, {provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }