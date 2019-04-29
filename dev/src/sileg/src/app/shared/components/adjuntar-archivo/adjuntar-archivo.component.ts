import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';

@Component({
  selector: 'app-adjuntar-archivo',
  templateUrl: './adjuntar-archivo.component.html',
  styleUrls: ['./adjuntar-archivo.component.scss']
})
export class AdjuntarArchivoComponent implements OnInit {

  constructor(private fb: FormBuilder) { 

  }

  ngOnInit() {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    }
  }  

}
