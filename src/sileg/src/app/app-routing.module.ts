import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { GenerarClaveComponent } from './generar-clave/generar-clave.component';

const routes: Routes = [
    { path:'buscar',component: SeleccionarUsuarioComponent },
    { path:'reset-clave',component: GenerarClaveComponent },
    { path: '', redirectTo: '/buscar', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
