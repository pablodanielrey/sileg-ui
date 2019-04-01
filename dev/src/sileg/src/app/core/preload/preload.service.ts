import { Injectable, NgZone } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Scope } from '@angular/core/src/profile/wtf_impl';
import { viewClassName } from '@angular/compiler';
import { create } from 'domain';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {

  preload_completo = new BehaviorSubject<boolean>(false);
  preload_parcial = new BehaviorSubject<boolean>(false);

  pcompleto_channel = new BroadcastChannel('preload-completo-core');
  pparcial_channel = new BroadcastChannel('preload-parcial-core');

  constructor(zone:NgZone) { 
    this.pcompleto_channel.onmessage = (e) => {
      console.log(e);
      let d = <boolean>e.data
      zone.run(() => {
        this.preload_completo.next(d);
      })
    }  
    this.pparcial_channel.onmessage = (e) => {
      console.log(e);
      let d = <boolean>e.data
      zone.run(() => {
        this.preload_parcial.next(d);
      });
    }
  }

  obtener_preload_completo(): Subject<boolean> {
    return this.preload_completo;
  }

  obtener_preload_parcial(): Subject<boolean> {
    return this.preload_parcial;
  }

  activar_preload_completo() {
    this.cambiar_preload_completo(true);
  }

  desactivar_preload_completo() {
    this.cambiar_preload_completo(false);
  }

  cambiar_preload_completo(b) {
    this.pcompleto_channel.postMessage(b);
  }

  activar_preload_parcial() {
    this.cambiar_preload_parcial(true);
  }

  desactivar_preload_parcial() {
    this.cambiar_preload_parcial(false);
  }

  cambiar_preload_parcial(b) {
    this.pparcial_channel.postMessage(b);
  }
  
}
