import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { ModificarComponent as ModificarDesignacionComponent } from './modules/designaciones/modificar/modificar.component';
import { SeleccionarLugaresComponent as SeleccionarLugaresDesignacionComponent } from './modules/designaciones/seleccionar-lugares/seleccionar-lugares.component';

import { SistemaComponent } from './core/sistema/sistema.component';
import { InicioComponent } from './modules/inicio/inicio.component';

import { PendientesComponent as MovimientosPendientesComponent } from './modules/designaciones/movimientos/pendientes/pendientes.component';
import { SeleccionarPersonaComponent as AltaMovimientoSeleccionarPersonaComponent } from './modules/designaciones/movimientos/crear/seleccionar-persona/seleccionar-persona.component';
import { ListarComponent as ListarDesignacionesComponent } from './modules/designaciones/listar/listar.component';


import { CrearPersonaComponent as AltaMovimientoCrearPersonaComponent } from './modules/designaciones/movimientos/crear/crear-persona/crear-persona.component';
import { AltaCargoComponent as AltaMovimientoAltaCargoComponent } from './modules/designaciones/movimientos/crear/alta-cargo/alta-cargo.component';

import { CrearComponent as BajaMovimientoCrearComponent } from './modules/designaciones/movimientos/baja/crear/crear.component';
import { EditarComponent as EditarMovimientoComponent } from './modules/designaciones/movimientos/editar/editar.component';

import { SeleccionarComponent as SeleccionarLugarComponent } from './modules/lugares/seleccionar/seleccionar.component';
import { DetalleComponent as DetalleLugarComponent } from './modules/lugares/detalle/detalle.component';

import { AdjuntarArchivoComponent } from './shared/components/adjuntar-archivo/adjuntar-archivo.component'; 

import { DebugComponent } from './core/debug/debug.component';
import { EjemploErrorComponent } from './modules/ejemplo-error/ejemplo-error.component';
import { OidpGuard } from './core/oauth2/oidp.guard';
import { LoaderComponent } from './core/loader/loader.component';
import { Oauth2Component } from './core/oauth2/oauth2.component';


const routes: Routes = [


 { path: 'debug', component: DebugComponent },
 { path: 'oauth2', component: Oauth2Component }, 
 { path: 'loader', component: LoaderComponent }, 
 {
    path:'sistema',
    canActivate: [OidpGuard],
    component: SistemaComponent,
    children: [
      { path: 'error', component: EjemploErrorComponent },
      { path: 'inicio', component: InicioComponent },
      {
        path: 'movimientos',
        children: [
          { path: 'editar/:mid', component: EditarMovimientoComponent },
          { path:'pendientes', component: MovimientosPendientesComponent },
          { 
            path: 'crear',
            children: [
              { path: 'seleccionar/:lid', component: AltaMovimientoSeleccionarPersonaComponent },
              { path: 'crear/:lid', component: AltaMovimientoCrearPersonaComponent },
              { path: 'alta/:lid/:pid', component: AltaMovimientoAltaCargoComponent }
            ] 
          }
        ]
      },
      {
        path: 'designaciones',
        children: [
          { 
            path: 'listar/:id', 
            component: ListarDesignacionesComponent,
            children: [
              { path: 'baja/:mid', component: BajaMovimientoCrearComponent }
            ]
          },
          { path: 'modificar/:id', component: ModificarDesignacionComponent},
          { path: 'seleccionar-lugar', component: SeleccionarLugaresDesignacionComponent }
        ]
      },
      {
        path: 'lugares',
        children: [
           { path: 'seleccionar', component: SeleccionarLugarComponent },
           { path: 'detalle/:lid', component: DetalleLugarComponent }
        ]
      },
      {
        path: 'componentes',
        children: [
          { path: 'adjuntar-archivo', component: AdjuntarArchivoComponent }
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
