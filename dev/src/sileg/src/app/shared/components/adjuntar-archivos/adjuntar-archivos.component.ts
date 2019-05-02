import { Component, OnInit, Output, EventEmitter, NgZone } from '@angular/core';

interface Archivo {
  archivo: File,
  cargando: boolean,
  cargado: number,
  contenido: string
}

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  archivos: Archivo[] = [];

  constructor(private zone: NgZone) { 
  }

  ngOnInit() {
  }

  chequear(f:File) {
    for (let o = 0; o < this.archivos.length; o++) {
      let d = this.archivos[o].archivo;
      if (d.name == f.name && d.size == f.size && d.lastModified == f.lastModified) {
        return true;
      }
    }
    return false;
  }

  computar_porcentaje(actual: number, total: number):number {
    return (actual * 100 / total);
  }  

  cargar_archivos() {
    this.archivos.forEach(f => {
      if (f.contenido == null) {
        // leo archivo por archivo
        let reader = new FileReader();
        reader.onloadstart = _ => {
          console.log('on-load');
          this.zone.run(_ => {
            f.cargando = true;
            f.cargado = 0;
          });
        }
        reader.onprogress = (x:ProgressEvent) => {
          console.log(x);
          let p = this.computar_porcentaje(x.loaded, x.total);
          console.log(p);
          this.zone.run(_ => {
            f.cargado = p;
          });          
        }
        reader.onloadend = _=> {
          console.log('onloadend');
          let b64 = window.btoa(<string>reader.result);
          this.zone.run(_ => {
            f.cargando = false;
            f.cargado = 100;
            f.contenido = b64;          
          });
        }
        console.log('leyendo archivo : ' + f.archivo.name);
        reader.readAsBinaryString(f.archivo);
      }
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let f = event.target.files[i];
        if (!this.chequear(f)) {
          this.archivos.push({archivo:f, cargando:false, cargado: 0, contenido:null});
        }
      }
    }
    this.cargar_archivos();
  }

  deseleccionar(f:Archivo) {
    for (let i = 0; i < this.archivos.length; i++) {
      if (this.archivos[i].archivo.name == f.archivo.name) {
        this.archivos.splice(i,1);
      }
    }
  }

  seleccionar() {
    let evento = [];
    this.archivos.forEach(f => {
      evento.push({
        nombre: f.archivo.name,
        tamano: f.archivo.size,
        tipo: f.archivo.type,
        contenido: f.contenido
      })
    });
    this.seleccionado.emit(evento);
  }

}

