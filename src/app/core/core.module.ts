// Angular
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import localePt from '@angular/common/locales/pt';

// Projeto-Interno
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoasService } from 'app/pessoas/pessoas.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from 'app/seguranca/auth.service';
import { CategoriaService } from 'app/categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

// Terceiros
import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';
import { JwtHelper } from 'angular2-jwt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
     // Terceiros
     ToastyModule.forRoot(),
     ConfirmDialogModule
  ],
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent ],
  exports: [ NavbarComponent, ToastyModule, ConfirmDialogModule ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoasService,
    CategoriaService,
    AuthService,
    JwtHelper,
    Title,
    ConfirmationService, {provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class CoreModule { }