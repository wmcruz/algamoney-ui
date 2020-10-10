import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { RelatoriosLancamentosComponent } from './relatorios-lancamentos/relatorios-lancamentos.component';

@NgModule({
  imports: [
    CommonModule,

    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatoriosLancamentosComponent]
})
export class RelatoriosModule { }
