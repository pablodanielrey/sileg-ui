import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';


@Component({
  selector: 'app-adjuntar-archivo',
  templateUrl: './adjuntar-archivo.component.html',
  styleUrls: ['./adjuntar-archivo.component.scss']
})
export class AdjuntarArchivoComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<Object> = new EventEmitter<Object>();
  cargado = 2.4;
  cargando = false;
  

  constructor(private zone: NgZone) { 
  }

  ngOnInit() {
  }

  computar_porcentaje(actual: number, total: number):number {
    return (actual * 100 / total);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadstart = _ => {
        this.zone.run(_ => {
          console.log('cargando iniciando');
          this.cargando = true;
        });
      }
      reader.onprogress = (x:ProgressEvent) => {
        console.log(x);
        let p = this.computar_porcentaje(x.loaded, x.total);
        console.log(p);
        this.zone.run(_ => {
          this.cargado = p;
        });
      }
      reader.onloadend = _ => {
        let archivo = {
          nombre: file.name,
          tamano: file.size,
          tipo: file.type,
          contenido: window.btoa(<string>reader.result)
        }
        this.zone.run(_ => {
          console.log('cargando finalizado');
          this.cargando = false;
        });
        this.seleccionado.emit(archivo);
      }
      console.log('leyendo archivo');
      reader.readAsBinaryString(file);
    }
  }  

}
