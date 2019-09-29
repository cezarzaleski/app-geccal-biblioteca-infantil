import { Component } from '@angular/core';
import { Filtros } from 'src/app/components/filtros/filtros.component';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.page.html',
  styleUrls: ['./livros.page.scss'],
})
export class LivrosPage {
  filtros: Filtros[] = [
    {
      id: 'status-sisbi',
      tipo: 'selecao-unica',
      nome: 'Situação do SISBI',
      placeholder: 'Todos',
      selecionadoChange: selecionado => this.carregarDados(),
      selecionado: {
        id: '',
        nome: 'Todas as situações',
      },
      opcoes: [
        {
          nome: 'Não solicitado',
          id: 'NS',
        },
        {
          nome: 'Solicitado',
          id: 'SL',
        },
        {
          nome: 'Suspenso',
          id: 'SP',
        },
        {
          nome: 'Ativo',
          id: 'AT',
        },
        {
          nome: 'Inativo',
          id: 'IN',
        },
        {
          nome: 'Rascunho',
          id: 'RA',
        },
        {
          id: '',
          nome: 'Todas as situações',
        }
      ],
    },
  ];

  constructor() { }

  carregarDados() {
    
  }
}
