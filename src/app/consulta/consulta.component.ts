import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from '../shared/services/cliente/cliente.service';
import { Cliente } from '../shared/models/cliente';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule, CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = "";
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private router: Router

  ) { }

  ngOnInit(){
    this.listaClientes = this.clienteService.pesquisarClientes("");
  }

  pesquisar(){
    this.listaClientes = this.clienteService.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } });
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente){
    this.clienteService.deletar(cliente);
    this.listaClientes = this.clienteService.pesquisarClientes("");
  }
}
