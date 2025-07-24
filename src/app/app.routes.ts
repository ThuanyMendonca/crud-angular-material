import { Routes } from '@angular/router';
import { CadastroComponent } from './cliente/cadastro/cadastro.component';
import { ConsultaComponent } from './cliente/consulta/consulta.component';

export const routes: Routes = [
  {
    path: 'cadastro',
    component: CadastroComponent
  },
  {
    path: 'consulta',
    component: ConsultaComponent
  }
];
