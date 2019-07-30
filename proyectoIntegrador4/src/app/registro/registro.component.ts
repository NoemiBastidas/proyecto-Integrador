import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { Login } from '../modelos/login.model'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor( private servicioService : ServicioService, private router:Router ) { }

  login = new Login();
  objLogin : Login;

  ngOnInit() {
  }

  agregarUsuario(){
    alert("te haz registrado con exito");
    this.servicioService.insertUsuario(this.login).subscribe(data => {
      // console.log(data);
      this.objLogin = data;
    },
    error =>{
      console.log(error)
    });
  }

  salir(){
    this.router.navigateByUrl('/inicio');
  }

}
