// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Projeto-Interno
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ NavbarComponent ],
  exports: [ NavbarComponent ]
})
export class CoreModule { }