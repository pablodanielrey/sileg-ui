import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SistemaComponent } from './sistema/sistema.component';

import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';


import { LoaderComponent } from './loader/loader.component';
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
import { OidpGuard } from './oidp.guard';

const routes: Routes = [
  { path: 'loader', component: LoaderComponent },
  {
    path: 'sistema',
    component: SistemaComponent,
    children: [
      { path: 'inicial', component: PantallaPrincipalComponent },
      {
        path:'usuario',
        canActivate: [OidpGuard],
        children: [
          { path:'buscar', component: SeleccionarUsuarioComponent, canActivate: [OidpGuard] },
          { path:'crear', component: CreateComponent, canActivate: [OidpGuard] },
          { path:'usuario/:id', component: DetalleUsuarioComponent, canActivate: [OidpGuard] },
          { path:'usuario/:id/reset-clave', component: GenerarClaveComponent, canActivate: [OidpGuard] },
          { path:'usuario/:id/generar-desig', component: GenerarDesignacionComponent, canActivate: [OidpGuard] },
          { path:'usuario/:id/crear-correo', component: CrearCorreoComponent, canActivate: [OidpGuard] }
        ]
      },
      {
        path:'lugares',
        canActivate: [OidpGuard],
        children: [
          { path:'buscar', component: BuscarLugaresComponent, canActivate: [OidpGuard] },
          { path:'lugar/:id', component: DetalleLugarComponent, canActivate: [OidpGuard] },
          { path:'crear', component: CrearLugarComponent, canActivate: [OidpGuard] },
          { path:'lugar/:id/usuarios', component: UsuariosPorOficinaComponent, canActivate: [OidpGuard] },
          { path:'lugar/:id/usuarios/abm', component: AgregarQuitarUsuariosComponent, canActivate: [OidpGuard] }
        ]
      }
    ]
  }
  //{ path: '**', redirectTo: '/sistema/inicial', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
