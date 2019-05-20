import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { ModificarComponent as ModificarDesignacionComponent } from './modules/designaciones/modificar/modificar.component';
import { SeleccionarLugaresComponent as SeleccionarLugaresDesignacionComponent } from './modules/designaciones/lista/seleccionar-lugares/seleccionar-lugares.component';

import { SistemaComponent } from './core/sistema/sistema.component';
import { InicioComponent } from './modules/inicio/inicio.component';

import { PendientesComponent as MovimientosPendientesComponent } from './modules/designaciones/movimientos/pendientes/pendientes.component';
import { SeleccionarPersonaComponent as AltaMovimientoSeleccionarPersonaComponent } from './modules/designaciones/movimientos/alta/seleccionar-persona/seleccionar-persona.component';

import { ReferenciasComponent } from './modules/designaciones/movimientos/referencias/referencias.component';

import { ListarComponent as ListarDesignacionesComponent } from './modules/designaciones/lista/listar/listar.component';
import { DetalleComponent as DetalleDesignacionComponent } from './modules/designaciones/detalle/detalle.component';

import { CrearPersonaComponent as AltaMovimientoCrearPersonaComponent } from './modules/designaciones/movimientos/alta/crear-persona/crear-persona.component';
import { AltaCargoComponent as AltaMovimientoAltaCargoComponent } from './modules/designaciones/movimientos/alta/alta-cargo/alta-cargo.component';

import { CancelarComponent as CancelarMovimientoComponent } from './modules/designaciones/movimientos/cancelar/cancelar.component';
// import { DenegarComponent as DenegarMovimientoComponent } from './modules/designaciones/movimientos/denegar/denegar.component';
import { AprobarComponent as AprobarMovimientoComponent } from './modules/designaciones/movimientos/aprobar/aprobar.component';
import { BajaComponent as BajaMovimientoComponent } from './modules/designaciones/movimientos/baja/baja.component';
import { EditarComponent as EditarMovimientoComponent } from './modules/designaciones/movimientos/editar/editar.component';
import { AdjuntarResolucionComponent } from './modules/designaciones/movimientos/adjuntar-resolucion/adjuntar-resolucion.component';

import { SeleccionarComponent as SeleccionarLugarComponent } from './modules/lugares/seleccionar/seleccionar.component';
import { DetalleComponent as DetalleLugarComponent } from './modules/lugares/detalle/detalle.component';

import { AdjuntarArchivoComponent } from './shared/components/adjuntar-archivo/adjuntar-archivo.component'; 
import { AdjuntarArchivosComponent } from './shared/components/adjuntar-archivos/adjuntar-archivos.component'; 

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
          { path: 'pendientes', component: MovimientosPendientesComponent },
          { path: 'editar/:mid', component: EditarMovimientoComponent },
          {
            path: 'alta',
            children: [
              { path: 'seleccionar-persona/:lid', component: AltaMovimientoSeleccionarPersonaComponent },
              { path: 'crear-persona/:lid', component: AltaMovimientoCrearPersonaComponent },
              { path: 'alta-cargo/:lid/:pid', component: AltaMovimientoAltaCargoComponent }
            ] 
          },
          { path: 'baja', component: BajaMovimientoComponent },
          { path: 'adjuntar-resolucion', component: AdjuntarResolucionComponent },
          { path: 'referencias', component: ReferenciasComponent }
        ]
      },
      {
        path: 'designaciones',
        children: [
          { 
            path: 'listar', 
            children: [
              { path: 'seleccionar-lugar', component: SeleccionarLugaresDesignacionComponent },
              { 
                path: 'listar/:mid', component: ListarDesignacionesComponent,
                children: [
                  { path: 'baja', component: BajaMovimientoComponent },
                  { path: 'adjuntar-resolucion', component: AdjuntarResolucionComponent }
                ]
              }
            ]
          },
          { path: 'modificar/:id', component: ModificarDesignacionComponent},
          { path: 'detalle/:lid', component: DetalleDesignacionComponent }
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
          { path: 'adjuntar-archivo', component: AdjuntarArchivoComponent },
          { path: 'adjuntar-archivos', component: AdjuntarArchivosComponent }
        ]
      }

    ]
  },
  { path: '**', redirectTo: '/loader', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule { }
