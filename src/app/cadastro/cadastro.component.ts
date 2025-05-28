import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Cliente } from '../shared/models/cliente';
import { ClienteService } from '../shared/services/cliente/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule, MatCardModule, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, CommonModule, NgxMaskDirective],
  providers: [provideNgxMask()],
templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router

  ) {
  }

  ngOnInit(): void {
      this.route.queryParamMap.subscribe((query: any) => {
        const params = query['params'];
        const id = params['id'];
        if(id){
          let clienteEncontrado = this.clienteService.buscarClientePorId(id);
          if(clienteEncontrado){
            this.atualizando = true;
            this.cliente = clienteEncontrado;
          }
        }
      })
  }

  salvar() {
    if(!this.atualizando){
      this.clienteService.salvar(this.cliente);
      this.cliente = Cliente.newCliente(); // Limpa o formulário após salvar
      this.mostrarMensagem('Cliente cadastrado com sucesso!');

    } else {
      // Atualiza
      this.clienteService.atualizar(this.cliente);
      this.atualizando = false; // Reseta o estado de atualização
      this.mostrarMensagem('Cliente atualizado com sucesso!');

    }

    this.router.navigate(['/consulta']);
  }

  mostrarMensagem(mensagem: string) {
    this.snack.open(mensagem, 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }
}
