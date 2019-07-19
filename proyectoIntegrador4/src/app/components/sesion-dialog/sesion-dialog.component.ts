import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioService } from '../../servicio.service';
import { Pasteles } from '../../modelos/productos.model';

@Component({
  selector: 'app-sesion-dialog',
  templateUrl: './sesion-dialog.component.html',
  styleUrls: ['./sesion-dialog.component.css']
})
export class SesionDialogComponent implements OnInit {

  formProducto : FormGroup;

  constructor(
    private dialogRef : MatDialogRef<SesionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private servicioService : ServicioService,
    private fb : FormBuilder) { }

  ngOnInit(): void {
    this.agregarProducto(Pasteles);
    this.crearFormulario();
  }

  crearFormulario(){
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.minLength(5), Validators.maxLength(20), Validators.required]],
      descripcion: ['', [Validators.minLength(10), Validators.maxLength(40), Validators.required]],
      precio: ['', [Validators.required]],
      imagen: ['', [Validators.required]],
      sabor: ['', [Validators.minLength(5), Validators.maxLength(15), Validators.required]]
    })
  }

  //SALIR MODAL
  clickSalir(){
    this.dialogRef.close();
  }

  //AGREGAR PRODUCTO
  agregarProducto(Pasteles){
    this.servicioService.insertProductos(Pasteles).subscribe(data => {
      // JSON.stringify(data);
      console.log(data);
    },
    error =>{
      console.log(JSON.stringify(error))
    });
  }

}
