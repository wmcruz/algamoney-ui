// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Projeto-Interno
import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ MessageComponent ],
  exports: [ MessageComponent ]
})
export class SharedModule { }