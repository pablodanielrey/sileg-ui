import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { SilegService } from '../../shared/services/sileg.service';
import { Lugar } from '../../shared/entities/sileg';

class LugarView {
  id: string;
  nombre: string;
  tipo: string;
  hijos: LugarView[];
  padre_id: string;

  constructor(id:string, n:string, tipo:string, hijos: LugarView[] = []) {
    this.id = id;
    this.nombre = n;
    this.tipo = tipo;
    this.hijos = hijos;
  }
}

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {

  lugares: BehaviorSubject<LugarView[]>;
  treeControl: NestedTreeControl<LugarView>;
  dataSource: MatTreeNestedDataSource<LugarView>;

  constructor(private service: SilegService) {
    this.lugares = new BehaviorSubject([]);
    this.treeControl = new NestedTreeControl(this.obtenerHijos);
    this.dataSource = new MatTreeNestedDataSource<LugarView>();
  }

  ngOnInit() {
    this.lugares.subscribe(ls => this.dataSource.data = ls);

    this.service.buscarLugares('.').pipe(map(ls => {
      /*
        transformo las catedras para tener el nombre correcto de la materia
      */

      interface Materia {
        nombre: string;
      };
      interface Catedra extends Lugar {
        nombre: string;
        descripcion: string;
        materia: Materia;
      };

      let lugares = [];
      ls.forEach(l => {
        if ('materia' in l) {
          var c = <Catedra>l;
          c.nombre = c.nombre + ' - ' + c.materia.nombre;
          lugares.push(c);
        } else {
          lugares.push(l);
        }
      });
      return lugares;

    })).pipe(map(ls => {

      /*
        convierto los Lugar en LugarView
      */

      let raices = [];
      let lugares = [];
      ls.forEach(l => {
        let lv = new LugarView(l.id, l.nombre, l.tipo);
        lv.padre_id = l.padre_id;
        lugares.push(lv);
        if (lv.padre_id == null) {
          raices.push(lv);
        }
      });
      lugares.forEach(l => {
        lugares.forEach(p => {
          if (p.id == l.padre_id) {
            p.hijos.push(l);
          }
        });
      });
      return raices;
    })).subscribe(ls => {
      this.lugares.next(ls);
    });
  }

  obtenerHijos(dataNode:LugarView):Observable<LugarView[]> {
    return of(dataNode.hijos);
  }

  tieneHijos(index:number, node:LugarView):boolean {
    return node.hijos.length > 0;
  }


  todoLeafItemSelectionToggle(n) {
    
  }

}
