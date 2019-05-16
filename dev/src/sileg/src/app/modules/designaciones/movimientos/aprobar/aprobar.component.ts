import { Component, OnInit } from '@angular/core';
import { NavegarService } from '../../../../core/navegar.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-aprobar',
  templateUrl: './aprobar.component.html',
  styleUrls: ['./aprobar.component.scss']
})
export class AprobarComponent implements OnInit {
  lid$: Observable<string>;
  
  constructor(private navegar: NavegarService, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log("aprobar component");
  }

  aprobar() {
    
  }
}
