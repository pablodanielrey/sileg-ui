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

const routes: Routes = [
    { path:'buscar', component: SeleccionarUsuarioComponent },
    { path:'detalle/:id', component: DetalleUsuarioComponent },
    { path:'crear', component: CreateComponent },
    { path:'reset-clave/:id', component: GenerarClaveComponent },
    { path:'generar-desig/:id', component: GenerarDesignacionComponent },
    { path:'crear-correo/:id', component: CrearCorreoComponent },
    { path:'lugares', component: BuscarLugaresComponent },
    { path:'lugar/:id', component: DetalleLugarComponent },
    { path:'crear_lugar', component: CrearLugarComponent },
    { path: '', redirectTo: '/buscar', pathMatch: 'full' }
    // { path: '', component: AppComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
