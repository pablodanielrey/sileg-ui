import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SilegService } from '../../../../shared/services/sileg.service';
import { NavegarService } from '../../../../core/navegar.service';
import { FormBuilder } from '@angular/forms';

interface FiltroParam {
  lid: string;
  pendientes: boolean;
  actuales: boolean;
}

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss']
})




export class FiltrosComponent {

  form = this.fb.group({
    'actuales': [this.data.actuales],
    'pendientes': [this.data.pendientes]
  })

  constructor(private service: SilegService,
    private navegar: NavegarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FiltrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FiltroParam) { }

  
  filtrar() {
    let value = this.form.value;
    value.filtrar = true;    
    this.dialogRef.close(value);
  }

  

}
