import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SistemaComponent } from './sistema/sistema.component';

import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';


import { LoaderComponent } from './loader/loader.component';
import { CreateComponent } from './usuarios/create/create.component';
import { CrearCorreoComponent } from './usuarios/crear-correo/crear-correo.component';
import { CargarCorreoComponent } from './usuarios/cargar-correo/cargar-correo.component';
import { SeleccionarUsuarioComponent } from './usuarios/seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { GenerarClaveComponent } from './usuarios/generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from './usuarios/generar-designacion/generar-designacion.component';

import { BuscarLugaresComponent } from './lugares/buscar-lugares/buscar-lugares.component';
import { CrearLugarComponent } from './lugares/crear-lugar/crear-lugar.component';
import { DetalleLugarComponent } from './lugares/detalle-lugar/detalle-lugar.component';
import { UsuariosPorOficinaComponent } from './lugares/usuarios-por-oficina/usuarios-por-oficina.component';
import { AgregarQuitarUsuariosComponent } from './lugares/agregar-quitar-usuarios/agregar-quitar-usuarios.component';

import { DesignacionesPorLugarComponent } from './designacion/designaciones-por-lugar/designaciones-por-lugar.component';


import { OidpGuard } from './oauth2/oidp.guard';
import { Oauth2Component } from './oauth2/oauth2.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'error/:error', component: ErrorComponent },
  { path: 'oauth2', component: Oauth2Component },
  { path: 'loader', component: LoaderComponent },
  {
    path: 'sistema',
    canActivate: [OidpGuard],
    component: SistemaComponent,
    children: [
      { path: 'inicial', component: PantallaPrincipalComponent },
      {
        path:'usuario',
        children: [
          { path:'buscar', component: SeleccionarUsuarioComponent },
          { path:'crear', component: CreateComponent },
          { path:'usuario/:id', component: DetalleUsuarioComponent },
          { path:'usuario/:id/reset-clave', component: GenerarClaveComponent },
          { path:'usuario/:id/generar-desig', component: GenerarDesignacionComponent },
          { path:'usuario/:id/crear-correo', component: CrearCorreoComponent },
          { path:'usuario/:id/cargar-correo', component: CargarCorreoComponent }
        ]
      },
      {
        path:'lugares',
        canActivate: [OidpGuard],
        children: [
          { path:'buscar', component: BuscarLugaresComponent },
          { path:'lugar/:id', component: DetalleLugarComponent },
          { path:'crear', component: CrearLugarComponent },
          { path:'lugar/:id/usuarios', component: UsuariosPorOficinaComponent },
          { path:'lugar/:id/usuarios/abm', component: AgregarQuitarUsuariosComponent },
          { path:'lugar/:id/designaciones', component: DesignacionesPorLugarComponent },

        ]
      }
    ]
  },
  { path: '**', redirectTo: '/loader', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
