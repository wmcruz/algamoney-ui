// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Terceiros
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

// Projeto-Interno
import { SharedModule } from './../shared/shared.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    RouterModule,
    // Projeto-Interno
    SharedModule,
    // Terceiros
    ButtonModule,
    CalendarModule,
    CurrencyMaskModule,
    DataTableModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    SelectButtonModule,
    TooltipModule
  ],
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ]
})
export class LancamentosModule { }