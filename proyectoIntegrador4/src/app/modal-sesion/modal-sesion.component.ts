import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-sesion',
  templateUrl: './modal-sesion.component.html',
  styleUrls: ['./modal-sesion.component.css']
})
export class ModalSesionComponent implements OnInit {

  constructor(
    private dialogRef : MatDialogRef<ModalSesionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
  ) { }

  ngOnInit() {
  }

  //SALIR MODAL
  clickSalir(){
    this.dialogRef.close();
  }

}
