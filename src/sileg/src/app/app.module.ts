import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import {HttpClientModule} from '@angular/common/http';


// configuro la autentificacion
import { OAuthModule } from 'angular-oauth2-oidc';


// aca se importa todo lo de material
import { MyMaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { SilegService } from './sileg.service';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfirmarGenerarClaveComponent } from './generar-clave/confirmar-generar-clave.component';
import { GenerarClaveComponent   } from './generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from './generar-designacion/generar-designacion.component';
import { CreateComponent } from './create/create.component';
import { CreateConfirmacionComponent } from './create/create-confirmacion.component';
import { CrearCorreoComponent } from './crear-correo/crear-correo.component';
import { DesignacionesComponent } from './designaciones/designaciones.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ToogleFullscreenDirective } from './toogle-fullscreen.directive';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { BuscarLugaresComponent } from './buscar-lugares/buscar-lugares.component';
import { DetalleLugarComponent } from './detalle-lugar/detalle-lugar.component';
import { CrearLugarComponent } from './crear-lugar/crear-lugar.component';

import { OidpGuard } from './oidp.guard';



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
    DetalleLugarComponent,
    CrearLugarComponent
  ],
  entryComponents: [
    ConfirmarGenerarClaveComponent,
    CreateConfirmacionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MyMaterialModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [SilegService, OidpGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
