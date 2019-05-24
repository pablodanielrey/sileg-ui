import { Component, OnInit, Output, EventEmitter, NgZone, Input, OnDestroy, HostBinding, Optional, Self } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { getQueryValue } from '@angular/core/src/view/query';
import { Subject } from 'rxjs';
import { NgControl, ControlValueAccessor } from '@angular/forms';

interface Archivo {
  archivo: File,
  cargando: boolean,
  cargado: number,
  contenido: string
} 

/*
  https://material.angular.io/guide/creating-a-custom-form-field-control
  https://blog.angularindepth.com/never-again-be-confused-when-implementing-controlvalueaccessor-in-angular-forms-93b9eee9ee83
  https://github.com/maximusk/custom-form-control-that-implements-control-value-accessor-and-wraps-jquery-slider
*/


@Component({
  selector: 'adjuntar-archivos',
  templateUrl: './adjuntar-archivos.component.html',
  styleUrls: ['./adjuntar-archivos.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: AdjuntarArchivosComponent}]
})
export class AdjuntarArchivosComponent extends MatFormFieldControl<Archivo[]> implements ControlValueAccessor, OnInit, OnDestroy  {

  ///////////// ControlValueAccessor ///////////////

  onChange;

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // por ahora lo ignoro
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /////// MatFormFieldControl /////////////
    
  get value(): Archivo[] | null {
    return this._value;
  }
  @Input()
  set value(archivos: Archivo[] | null) {
    this._value = archivos;
    this.stateChanges.next();
  } 
  
  private _value: Archivo[] = [];

  static nextId = 0;
  @HostBinding() id = `adjuntar-archivos-${AdjuntarArchivosComponent.nextId++}`;

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(phl) {
    this._placeholder = phl;
    this.stateChanges.next();
  }
  _placeholder: string;

  get empty() {
    return (this.value == null || this.value.length <= 0);
  }

  stateChanges = new Subject<void>();
  focused: boolean;
  
  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return !this.empty;
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = req;
    this.stateChanges.next();
  }
  private _required = false; 

  disabled: boolean = false;
  errorState: boolean;
  controlType?: string = 'adjuntar-archivos';
  autofilled?: boolean;
  
  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }
  
  onContainerClick(event: MouseEvent): void {
    // por ahora lo ignoro
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }  



  /////////////////////////////////////////////////////////


  /*
  @Output()
  seleccionado: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  */

  constructor(private zone: NgZone, 
              @Optional() @Self() public ngControl: NgControl) { 
    super();
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    } 
  }

  ngOnInit() {
  }


  chequear(f:File) {
    for (let o = 0; o < this.value.length; o++) {
      let d = this.value[o].archivo;
      if (d.name == f.name && d.size == f.size && d.lastModified == f.lastModified) {
        //return true;
        return false;
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
            this.onChange(this.value);
          });
        }
        reader.onprogress = (x:ProgressEvent) => {
          console.log(x);
          let p = this.computar_porcentaje(x.loaded, x.total);
          console.log(p);
          this.zone.run(_ => {
            f.cargado = p;
            this.stateChanges.next();
            this.onChange(this.value);
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
            this.onChange(this.value);
          });
        }
        console.log('leyendo archivo : ' + f.archivo.name);
        reader.readAsBinaryString(f.archivo);
      }
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      if (this.value == null) {
        this.value = [];
      }
      for (let i = 0; i < event.target.files.length; i++) {
        let f = event.target.files[i];
        if (f != null && !this.chequear(f)) {
          let _v = this.value;
          _v.push({archivo:f, cargando:false, cargado: 0, contenido:null});
          this.value = _v;
        }
      }
    }
    this.cargar_archivos();
  }

}

