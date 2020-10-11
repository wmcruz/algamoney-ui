// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Terceiros
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { PanelModule } from 'primeng/panel';

// Projeto-Interno
import { SharedModule } from './../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    // Projeto-Interno
    SharedModule,
    PessoasRoutingModule,
    // Terceiros
    ButtonModule,
    TableModule,
    InputTextModule,
    InputMaskModule,
    TooltipModule,
    PanelModule
  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  exports: []
})
export class PessoasModule { }