import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { CreateComponent } from './usuarios/create/create.component';
import { CrearCorreoComponent } from './usuarios/crear-correo/crear-correo.component';
import { SeleccionarUsuarioComponent } from './usuarios/seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { GenerarClaveComponent } from './usuarios/generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from './usuarios/generar-designacion/generar-designacion.component';

import { BuscarLugaresComponent } from './lugares/buscar-lugares/buscar-lugares.component';
import { CrearLugarComponent } from './lugares/crear-lugar/crear-lugar.component';
import { DetalleLugarComponent } from './lugares/detalle-lugar/detalle-lugar.component';
import { UsuariosPorOficinaComponent } from './lugares/usuarios-por-oficina/usuarios-por-oficina.component';
import { AgregarQuitarUsuariosComponent } from './lugares/agregar-quitar-usuarios/agregar-quitar-usuarios.component';

const routes: Routes = [
    {
      path:'usuarios',
      children: [
        { path:'buscar', component: SeleccionarUsuarioComponent },
        { path:'crear', component: CreateComponent },
        { path:'usuario/:id', component: DetalleUsuarioComponent },
        { path:'usuario/:id/reset-clave', component: GenerarClaveComponent },
        { path:'usuario/:id/generar-desig', component: GenerarDesignacionComponent },
        { path:'usuario/:id/crear-correo', component: CrearCorreoComponent }
      ]
    },
    {
      path:'lugares',
      children: [
        { path:'buscar', component: BuscarLugaresComponent },
        { path:'lugar/:id', component: DetalleLugarComponent },
        { path:'crear', component: CrearLugarComponent },
        { path:'lugar/:id/usuarios', component: UsuariosPorOficinaComponent },
        { path:'lugar/:id/usuarios/abm', component: AgregarQuitarUsuariosComponent }
      ]
    },
    { path: '', redirectTo: '/lugares/buscar', pathMatch: 'full' }

    // { path: '', component: AppComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
