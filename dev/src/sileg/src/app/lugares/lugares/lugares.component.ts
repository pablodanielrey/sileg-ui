import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable, of, BehaviorSubject } from 'rxjs';


class LugarView {
  nombre: string;
  hijos: LugarView[];

  constructor(n:string, hijos: LugarView[] = []) {
    this.nombre = n;
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

  constructor() {
    this.lugares = new BehaviorSubject([]);
    this.treeControl = new NestedTreeControl(this.obtenerHijos);
    this.dataSource = new MatTreeNestedDataSource<LugarView>();
  }

  ngOnInit() {
    this.lugares.subscribe(ls => this.dataSource.data = ls);

    let l = new LugarView('raiz', [
      new LugarView('h1', [
        new LugarView('a1')
      ]),
      new LugarView('h2'),
      new LugarView('h3', [
        new LugarView('m1'),
        new LugarView('m2')
      ])
    ]);

    this.lugares.next([l]);
  
  }

  obtenerHijos(dataNode:LugarView):Observable<LugarView[]> {
    return of(dataNode.hijos);
  }

  tieneHijos(index:number, node:LugarView):boolean {
    return node.hijos.length > 0;
  }


}
