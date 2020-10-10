import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { RelatoriosLancamentosComponent } from './relatorios-lancamentos/relatorios-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,

    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatoriosLancamentosComponent]
})
export class RelatoriosModule { }
