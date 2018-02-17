import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import {HttpClientModule} from '@angular/common/http';

// aca se importa todo lo de material
import { MyMaterialModule } from './material.module';


import { AppComponent } from './app.component';
import { SilegService } from './sileg.service';
import { SeleccionarUsuarioComponent } from './seleccionar-usuario/seleccionar-usuario.component';
import { DetalleUsuarioComponent } from './detalle-usuario/detalle-usuario.component';
import { AppRoutingModule } from './/app-routing.module';
import { ConfirmarGenerarClaveComponent } from './generar-clave/confirmar-generar-clave.component';
import { GenerarClaveComponent   } from './generar-clave/generar-clave.component';
import { GenerarDesignacionComponent } from './generar-designacion/generar-designacion.component';



@NgModule({
  declarations: [
    AppComponent,
    SeleccionarUsuarioComponent,
    DetalleUsuarioComponent,
    ConfirmarGenerarClaveComponent,
    GenerarClaveComponent,
    GenerarDesignacionComponent
  ],
  entryComponents: [
    ConfirmarGenerarClaveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MyMaterialModule,
    AppRoutingModule
  ],
  providers: [SilegService],
  bootstrap: [AppComponent]
})
export class AppModule { }
