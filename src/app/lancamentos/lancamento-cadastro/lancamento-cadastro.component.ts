import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    { label: 'Alimentação', value: 0},
    { label: 'Transporte', value: 1}
  ];

  pessoas = [
    { label: 'João da Silva', value: 4},
    { label: 'Sebastião Souza', value: 6},
    { label: 'Maria Abadia', value: 3}
  ];

  constructor() { }

  ngOnInit() {
  }
}