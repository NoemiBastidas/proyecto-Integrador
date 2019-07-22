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

  pasteles = new Pasteles();
  objPasteles : Pasteles;

  constructor(
    private dialogRef : MatDialogRef<SesionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string,
    private servicioService : ServicioService,
    private fb : FormBuilder) { }

  ngOnInit() {
    // this.agregarProducto(Pasteles);
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

  // onSubmit(){
  //   this.agregarProducto(this.enviarDatos);
  // }

  //AGREGAR PRODUCTO
  agregarProducto(body : Pasteles){
    this.servicioService.insertProductos(body).subscribe(data => {
      // console.log(data);
      this.objPasteles = data;
    },
    error =>{
      console.log(error)
    });
  }

  // get nombre(){ return this.formProducto.get('nombre')};
  // get descripcion(){ return this.formProducto.get('descripcion')};
  // get precio(){ return this.formProducto.get('precio')};
  // get imagen(){ return this.formProducto.get('imagen')};
  // get sabor(){ return this.formProducto.get('sabor')};

}
