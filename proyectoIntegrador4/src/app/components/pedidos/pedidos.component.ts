import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioService } from '../../servicio.service';
import { Pedidos } from '../../modelos/pedidos.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  pedidos : Pedidos[];

  constructor( private servicioService : ServicioService ) { }

  ngOnInit() {
    this.obtenerPedidos();
  }

  obtenerPedidos(){
    this.servicioService.getPedidos().subscribe(data => {
      this.pedidos = data;
      console.log(data);
    },
    error =>{
      console.log(JSON.stringify(error));
    })
  }

}
