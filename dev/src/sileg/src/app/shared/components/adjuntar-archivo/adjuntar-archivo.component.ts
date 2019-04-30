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

  cargando = false;
  

  constructor(private zone: NgZone) { 
  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadstart = _ => {
        this.zone.run(_ => {
          this.cargando = true;
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
          this.cargando = false;
        });
        this.seleccionado.emit(archivo);
      }
      reader.readAsBinaryString(file);
    }
  }  

}
