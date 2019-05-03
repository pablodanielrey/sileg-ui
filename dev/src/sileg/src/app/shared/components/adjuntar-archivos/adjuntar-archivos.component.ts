import { Component, OnInit, Output, EventEmitter, NgZone, Input, OnDestroy, HostBinding, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { getQueryValue } from '@angular/core/src/view/query';
import { Subject } from 'rxjs';
import { NgControl } from '@angular/forms';

interface Archivo {
  archivo: File,
  cargando: boolean,
  cargado: number,
  contenido: string
} 

@Component({
  selector: 'app-adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: AdjuntarArchivosComponent}]
})
export class AdjuntarArchivosComponent extends MatFormFieldControl<Archivo[]> implements OnInit, OnDestroy  {

  ///////////////////////// MatFormFieldControl ///////////////

  
  get value(): Archivo[] | null {
    return this._value;
  }
  @Input()
  set value(archivos: Archivo[] | null) {
    this._value = archivos;
    this.stateChanges.next();
  } 
  
  private _value: Archivo[] = [];

  stateChanges = new Subject<void>();
  placeholder: string;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string = 'adjuntar-archivos';
  autofilled?: boolean;
  
  @HostBinding('attr.aria-describedby') describedBy = '';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  
  onContainerClick(event: MouseEvent): void {
    throw new Error("Method not implemented.");
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }  

  static nextId = 0;
  @HostBinding() id = `adjuntar-archivos-${AdjuntarArchivosComponent.nextId++}`;

  /////////////////////////////////////////////////////////


  @Output()
  seleccionado: EventEmitter<Object[]> = new EventEmitter<Object[]>();
 

  constructor(private zone: NgZone, 
              @Optional() @Self() public ngControl: NgControl) { 
    super();
  }

  ngOnInit() {
  }


  chequear(f:File) {
    for (let o = 0; o < this.value.length; o++) {
      let d = this.value[o].archivo;
      if (d.name == f.name && d.size == f.size && d.lastModified == f.lastModified) {
        return true;
      }
    }
    return false;
  }

  private computar_porcentaje(actual: number, total: number):number {
    return (actual * 100 / total);
  }  

  cargar_archivos() {
    this.value.forEach(f => {
      if (f.contenido == null) {
        // leo archivo por archivo
        let reader = new FileReader();
        reader.onloadstart = _ => {
          console.log('on-load');
          this.zone.run(_ => {
            f.cargando = true;
            f.cargado = 0;
            this.stateChanges.next();
          });
        }
        reader.onprogress = (x:ProgressEvent) => {
          console.log(x);
          let p = this.computar_porcentaje(x.loaded, x.total);
          console.log(p);
          this.zone.run(_ => {
            f.cargado = p;
            this.stateChanges.next();
          });          
        }
        reader.onloadend = _=> {
          console.log('onloadend');
          let b64 = window.btoa(<string>reader.result);
          this.zone.run(_ => {
            f.cargando = false;
            f.cargado = 100;
            f.contenido = b64;
            this.stateChanges.next();
            
            // chequeo a ver si se terminaron de cargar todos los archivos disparo el seleccionado.
            let cargados : boolean = true;
            this.value.forEach(f => {
              cargados = cargados && f.contenido != null;
            });
            if (cargados) {
              this.seleccionar();
            }

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
          let _v = this.value;
          _v.push({archivo:f, cargando:false, cargado: 0, contenido:null});
          this.value = _v;
        }
      }
    }
    this.cargar_archivos();
  }

  deseleccionar(f:Archivo) {
    for (let i = 0; i < this.value.length; i++) {
      if (this.value[i].archivo.name == f.archivo.name) {
        this.value.splice(i,1);
      }
    }
  }

  seleccionar() {
    let evento = [];
    this.value.forEach(f => {
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

