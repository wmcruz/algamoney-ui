// Angular
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import localePt from '@angular/common/locales/pt';

// Projeto-Interno
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoasService } from 'app/pessoas/pessoas.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { RelatoriosService } from 'app/relatorios/relatorios.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { AuthService } from 'app/seguranca/auth.service';
import { CategoriaService } from 'app/categorias/categoria.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { MoneyHttp } from 'app/seguranca/money-http';

// Terceiros
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { JwtHelperService } from '@auth0/angular-jwt';

registerLocaleData(localePt);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
     // Terceiros
     ToastModule,
     ConfirmDialogModule
  ],
  declarations: [ NavbarComponent, PaginaNaoEncontradaComponent, NaoAutorizadoComponent ],
  exports: [ NavbarComponent, ToastModule, ConfirmDialogModule ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoasService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    AuthService,
    MoneyHttp,
    JwtHelperService,
    Title,
    ConfirmationService, {provide: LOCALE_ID, useValue: 'pt' },
    MessageService
  ]
})
export class CoreModule { }