import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterState } from '@angular/router';
import { NavegarService } from '../../core/navegar.service';
import { Observable } from 'rxjs';
import {LocationStrategy} from '@angular/common';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  constructor(private route: ActivatedRoute, 
              private navegarService: NavegarService,
              private router: Router) { 
  }

  ngOnInit() {    
   console.log(this.router.url.split('?')[0])
  }

  recargar() {
    this.navegarService.navegar({url: '/sistema/error', params: {'error': 'mensaje de error por parametro'}})
  }

  volver() {    
  }

}
