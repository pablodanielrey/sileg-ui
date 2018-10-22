import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error = '';
  descripcion = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(p => {
      if (p.has('error')) {
        this.error = p.get('error');
      }
      if (p.has('error_description')) {
        this.descripcion = p.get('error_description');
      }
    });
 
  }

    esErrorDeUsuario():boolean {
      return this.error == 'unknown_user';
    }

    login() {
      this.router.navigate(['/oauth2']);
    }

}
