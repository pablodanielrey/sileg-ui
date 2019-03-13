import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { GlobalErrorHandler } from './error.handler';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { Oauth2Component } from '../oauth2/oauth2.component';
import { OidpGuard } from '../oauth2/oidp.guard';
import { ErrorComponent } from './error/error.component';

// aca se importa todo lo de material
import { MyMaterialModule } from './material.module';

import { ListadoUsuariosComponent } from '../shared/components/listado-usuarios/listado-usuarios.component';

import { AppComponent } from './app.component';
import { SilegService } from '../shared/services/sileg.service';
import { AppRoutingModule } from './app-routing.module';

import { SeleccionarUsuarioComponent } from '../usuarios/seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from '../usuarios/detalle-usuario/detalle-usuario.component';
import { ConfirmarGenerarClaveComponent } from '../usuarios/generar-clave/confirmar-generar-clave.component';
import { GenerarClaveComponent   } from '../usuarios/generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from '../usuarios/generar-designacion/generar-designacion.component';
import { CreateComponent } from '../usuarios/create/create.component';
import { CreateConfirmacionComponent } from '../usuarios/create/create-confirmacion.component';
import { CrearCorreoComponent } from '../usuarios/crear-correo/crear-correo.component';
import { DesignacionesComponent } from '../usuarios/designaciones/designaciones.component';

import { ToogleFullscreenDirective } from './menu/toogle-fullscreen.directive';
import { MenuComponent } from './menu/menu/menu.component';
import { FooterComponent } from './menu/footer/footer.component';
import { HeaderComponent } from './menu/header/header.component';

import { LugaresComponent } from '../lugares/lugares/lugares.component';
import { BuscarLugaresComponent } from '../lugares/buscar-lugares/buscar-lugares.component';
import { DetalleLugarComponent } from '../lugares/detalle-lugar/detalle-lugar.component';
import { CrearLugarComponent } from '../lugares/crear-lugar/crear-lugar.component';
import { UsuariosPorOficinaComponent } from '../lugares/usuarios-por-oficina/usuarios-por-oficina.component';
import { AgregarQuitarUsuariosComponent } from '../lugares/agregar-quitar-usuarios/agregar-quitar-usuarios.component';


import { NotificacionesService } from '../shared/services/notificaciones.service';
import { DialogoEliminarLugarComponent } from '../lugares/dialogo-eliminar-lugar/dialogo-eliminar-lugar.component';
import { DialogoEliminarDesignacionComponent } from '../lugares/dialogo-eliminar-designacion/dialogo-eliminar-designacion.component';
import { LoaderComponent } from './loader/loader.component';
import { SistemaComponent } from './sistema/sistema.component';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { CargarCorreoComponent } from '../usuarios/cargar-correo/cargar-correo.component';

import { DesignacionesPorLugarComponent } from '../designacion/designaciones-por-lugar/designaciones-por-lugar.component';
import { DetalleDesignacionComponent } from '../designacion/detalle-designacion/detalle-designacion.component';
import { DesignacionesPorPersonaComponent } from '../designacion/designaciones-por-persona/designaciones-por-persona.component';
import { UsuariosSincComponent } from '../sinc/usuarios-sinc/usuarios-sinc.component';
import { LoginSincComponent } from '../sinc/login-sinc/login-sinc.component';
import { DatosPersonalesComponent } from '../usuarios/creacion/personal/datos-personales/datos-personales.component';
import { DatosDesignacionComponent } from '../usuarios/creacion/personal/datos-designacion/datos-designacion.component';
import { DatosCorreoComponent } from '../usuarios/creacion/personal/datos-correo/datos-correo.component';
import { FinComponent } from '../usuarios/creacion/personal/fin/fin.component';
import { BusquedaLugaresComponent } from '../shared/components/busqueda-lugares/busqueda-lugares.component';
import { PendientesComponent } from '../modules/designacion/pendientes/pendientes.component';



@NgModule({
  declarations: [
    AppComponent,
    SeleccionarUsuarioComponent,
    DetalleUsuarioComponent,
    ConfirmarGenerarClaveComponent,
    GenerarClaveComponent,
    GenerarDesignacionComponent,
    CreateComponent,
    CreateConfirmacionComponent,
    CrearCorreoComponent,
    DesignacionesComponent,
    LugaresComponent,
    ToogleFullscreenDirective,
    MenuComponent,
    FooterComponent,
    HeaderComponent,
    BuscarLugaresComponent,
    ListadoUsuariosComponent,
    DetalleLugarComponent,
    CrearLugarComponent,
    UsuariosPorOficinaComponent,
    AgregarQuitarUsuariosComponent,
    DialogoEliminarLugarComponent,
    DialogoEliminarDesignacionComponent,
    LoaderComponent,
    SistemaComponent,
    PantallaPrincipalComponent,
    Oauth2Component,
    ErrorComponent,
    CargarCorreoComponent,
    DesignacionesPorLugarComponent,
    DetalleDesignacionComponent,
    DesignacionesPorPersonaComponent,
    UsuariosSincComponent,
    LoginSincComponent,
    DatosPersonalesComponent,
    DatosDesignacionComponent,
    DatosCorreoComponent,
    FinComponent,
    BusquedaLugaresComponent,
    PendientesComponent
  ],
  entryComponents: [
    ConfirmarGenerarClaveComponent,
    CreateConfirmacionComponent,
    DialogoEliminarLugarComponent,
    DialogoEliminarDesignacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MyMaterialModule,
    AppRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http'],
        sendAccessToken: true
      }
    })
  ],
  providers: [
    SilegService,
    OidpGuard,
    { provide: OAuthStorage, useValue: localStorage },
    NotificacionesService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MAT_DATE_LOCALE, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
