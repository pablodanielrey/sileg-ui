import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { visitSiblingRenderNodes } from '@angular/core/src/view/util';
// import { createReadStream } from 'fs';


@Component({
  selector: 'app-referencias',
  templateUrl: './referencias.component.html',
  styleUrls: ['./referencias.component.scss']
})
export class ReferenciasComponent implements OnInit {

  @Input()
  visible: boolean;

  @Output()
  cerrar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  _cerrar() {
    this.cerrar.next(true);
  }

}
