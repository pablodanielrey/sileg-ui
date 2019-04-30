import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss']
})
export class AdjuntarArchivosComponent implements OnInit {

  @Output()
  seleccionado: EventEmitter<File[]> = new EventEmitter<File[]>();
  archivos: File[] = [];

  constructor() { 
  }

  ngOnInit() {
  }

  chequear(f:File) {
    for (let o = 0; o < this.archivos.length; o++) {
      let d = this.archivos[o];
      if (d.name == f.name && d.size == f.size && d.lastModified == f.lastModified) {
        return true;
      }
    }
    return false;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        let f = event.target.files[i];
        if (!this.chequear(f)) {
          this.archivos.push(f);
        }
      }
    }
  }  

  seleccionar() {
    this.seleccionado.emit(this.archivos);
  }

}

