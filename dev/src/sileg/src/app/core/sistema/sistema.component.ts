import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../oauth2/oauth2.service';
import { Configuracion } from '../../shared/entities/sileg';
import { SilegService } from '../../shared/services/sileg.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss']
})
export class SistemaComponent implements OnInit {
  
  modulos: string[] = [];
  subscriptions: any[] = [];
  config: Configuracion = null;

  constructor(private oauthService: Oauth2Service, 
              private service: SilegService) { 
              
  }

  ngOnInit() {
    this.subscriptions.push(this.service.obtenerConfiguracion().subscribe(r => {
      this.config = r;
    }));    

    this.subscriptions.push(this.service.obtenerAccesoModulos().subscribe(modulos=> {
      this.modulos = modulos;
    }));    
  }

  ngOnDestroy(){
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  cerrar_menu(d) {
    d.toggle();
    console.log('cerrar_menu');
  } 

  chequearPerfil(profiles: string[]): boolean {
   // return false;
    let r = false;
    profiles.forEach(p => {
      if (this.modulos.includes(p)){
        r = true;
      }
    });
    return r;
  }  

  mostrarOrganigrama():boolean{
    return this.config.mostrar_organigrama;
  }

  mostrarSincoUsuarios():boolean{
    return this.config.mostrar_sincronizacion_usuarios;
  }

  mostrarSincoLogin():boolean{
    return this.config.mostrar_sincronizacion_login;
  }  

}
