import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

//import { GlobalErrorHandler } from './error.handler';

import { ServiceWorkerModule } from '@angular/service-worker';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SilegService } from './shared/services/sileg.service';
import { AppRoutingModule } from './app-routing.module';

import { PendientesComponent as MovimientosPendientesComponent } from './modules/designaciones/movimientos/pendientes/pendientes.component';
import { InicioComponent } from './modules/inicio/inicio.component';
import { ModificarComponent } from './modules/designaciones/modificar/modificar.component';
import { SeleccionarPersonaComponent } from './modules/designaciones/movimientos/alta/seleccionar-persona/seleccionar-persona.component';
import { CrearPersonaComponent } from './modules/designaciones/movimientos/alta/crear-persona/crear-persona.component';
import { AltaCargoComponent } from './modules/designaciones/movimientos/alta/alta-cargo/alta-cargo.component';
import { SeleccionarUsuarioComponent } from './shared/components/seleccionar-usuario/seleccionar-usuario.component';

import { SelecionarLugarComponent } from './shared/components/selecionar-lugar/selecionar-lugar.component';

import { SelecionMultipleLugarComponent } from './shared/components/selecion-multiple-lugar/selecion-multiple-lugar.component';
import { SeleccionarLugaresComponent } from './modules/designaciones/lista/seleccionar-lugares/seleccionar-lugares.component';

import { ListarComponent } from './modules/designaciones/lista/listar/listar.component';
import { SeleccionarComponent } from './modules/lugares/seleccionar/seleccionar.component';
import { DetalleComponent as DetalleDesigancionComponent } from './modules/designaciones/detalle/detalle.component';

import { DetalleComponent as DetalleLugarComponent } from './modules/lugares/detalle/detalle.component';

import { environment } from '../environments/environment';
import { EjemploErrorComponent } from './modules/ejemplo-error/ejemplo-error.component';
import { BajaComponent } from './modules/designaciones/movimientos/baja/baja.component';
import { AprobarComponent } from './modules/designaciones/movimientos/aprobar/aprobar.component';
import { DenegarComponent } from './modules/designaciones/movimientos/denegar/denegar.component';
import { EditarComponent } from './modules/designaciones/movimientos/editar/editar.component';
import { AdjuntarArchivoComponent } from './shared/components/adjuntar-archivo/adjuntar-archivo.component';
import { AdjuntarArchivosComponent } from './shared/components/adjuntar-archivos/adjuntar-archivos.component';
import { CancelarComponent } from './modules/designaciones/movimientos/cancelar/cancelar.component';
import { AdjuntarResolucionComponent } from './modules/designaciones/movimientos/adjuntar-resolucion/adjuntar-resolucion.component';
import { ReferenciasComponent } from './modules/designaciones/movimientos/referencias/referencias.component';
import { MatDialogModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    MovimientosPendientesComponent,
    InicioComponent,
    ModificarComponent,
    SeleccionarPersonaComponent,
    CrearPersonaComponent,
    AltaCargoComponent,
    SeleccionarUsuarioComponent,
    SelecionarLugarComponent,
    SelecionMultipleLugarComponent,
    SeleccionarLugaresComponent,
    ListarComponent,
    SeleccionarComponent,
    DetalleDesigancionComponent,
    DetalleLugarComponent,
    EjemploErrorComponent,
    BajaComponent,
    AprobarComponent,
    DenegarComponent,
    EditarComponent,
    AdjuntarArchivoComponent,
    AdjuntarArchivosComponent,
    CancelarComponent,
    AdjuntarResolucionComponent,
    ReferenciasComponent
  ],
  entryComponents: [
    DenegarComponent,
    AprobarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule,
    /*
    CoreModule.forRoot({
      resourceServer: {
        allowedUrls: ['http'],
        sendAccessToken: true
      }
    }),*/
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    SilegService,
    //{ provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
