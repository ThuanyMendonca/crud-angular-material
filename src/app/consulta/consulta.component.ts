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


@Component({
  selector: 'app-consulta',
  imports: [MatInputModule, MatCardModule, FlexLayoutModule, MatIconModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit{

  nomeBusca: string = "";
  listaClientes: Cliente[] = [];
  colunasTable: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'email'];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(){
    this.listaClientes = this.clienteService.pesquisarClientes("");
    console.log(this.listaClientes);
  }

  pesquisar(){
    this.listaClientes = this.clienteService.pesquisarClientes(this.nomeBusca);
  }

}
