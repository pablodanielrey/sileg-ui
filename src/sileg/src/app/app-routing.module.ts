import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { CrearCorreoComponent } from './crear-correo/crear-correo.component';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { GenerarClaveComponent } from './generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from './generar-designacion/generar-designacion.component';
import { BuscarLugaresComponent } from './buscar-lugares/buscar-lugares.component';
import { CrearLugarComponent } from './crear-lugar/crear-lugar.component';
import { DetalleLugarComponent } from './detalle-lugar/detalle-lugar.component';

import { OidpGuard } from './oidp.guard';

const routes: Routes = [
    {
      path:'usuario',
      canActivate: [OidpGuard],
      children: [
        { path:'crear', component: CreateComponent },
        { path:'buscar', component: SeleccionarUsuarioComponent },
        { path:'detalle/:id', component: DetalleUsuarioComponent },
        { path:'reset-clave/:id', component: GenerarClaveComponent },
        { path:'generar-desig/:id', component: GenerarDesignacionComponent },
        { path:'crear-correo/:id', component: CrearCorreoComponent }
      ]
    },
    {
      path:'lugar',
      canActivate: [OidpGuard],
      children: [
        { path:'crear', component: CrearLugarComponent },
        { path:'buscar', component: BuscarLugaresComponent }
        { path:'detalle/:id', component: DetalleLugarComponent, canActivate: [OidpGuard] }
      ]
    },
    { path: '', redirectTo: '/usuario/buscar', pathMatch: 'full' }
    //{ path: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
