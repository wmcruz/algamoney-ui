// Angular
import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';

// Projeto-Interno
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { LancamentoService } from 'app/lancamentos/lancamento.service';
import { PessoasService } from 'app/pessoas/pessoas.service';

// Terceiros
import { ConfirmationService } from 'primeng/components/common/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
     // Terceiros
     ToastyModule.forRoot(),
     ConfirmDialogModule
  ],
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent, ToastyModule, ConfirmDialogModule ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    PessoasService,
    ConfirmationService, {provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }