import { Component, OnInit } from '@angular/core';
import { PreloadService } from '../preload/preload.service';
import { EventsService } from '../events.service';
import { FormGroup, FormControl } from '@angular/forms';
import { RouterService } from '../router.service';
import { PermisosService } from '../permisos.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss']
})
export class DebugComponent implements OnInit {

  rutas: object[] = [];

  constructor(private preload: PreloadService, 
              private routerService: RouterService, 
              private permisos: PermisosService,
              private router: Router) { }

  ngOnInit() {
    this.procesar_rutas('', this.router.config);
  }

  private procesar_rutas(parent:string, rs:Route[]) {
    rs.forEach(r => {
      if (r.children && r.children.length > 0) {
        this.procesar_rutas(parent + '/' + r.path, r.children);
      } else {
        this.rutas.push({path:parent + '/' + r.path});
      }
    });
  }
 
  configurar_permisos() {
    this.permisos._save_example();
  }

  activar_preload_parcial() {
    this.preload.activar_preload_parcial();
  }

  desactivar_preload_parcial() {
    this.preload.desactivar_preload_parcial();
  }  

  activar_preload_completo() {
    this.preload.activar_preload_completo();
  }

  desactivar_preload_completo() {
    this.preload.desactivar_preload_completo();
  }  


  form = new FormGroup({
    ruta: new FormControl('')
  })

  navegar() {
    this.routerService.navegar(this.form.value['ruta']);
  }

}
