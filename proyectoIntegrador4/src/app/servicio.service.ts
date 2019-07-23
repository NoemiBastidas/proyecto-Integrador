import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from './modelos/pedidos.model';
import { Pasteles, PastelesGet } from './modelos/productos.model'

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
}


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor( private http: HttpClient) { }

  // pastelObject : Object = {};

  getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>('http://localhost:3000/getPedidos');
  }

  insertProductos(pasteles : Pasteles): Observable<PastelesGet> {
    console.log(pasteles);
    return this.http.post<PastelesGet>('http://localhost:3000/agregarProducto', pasteles);
  }
}

// Observable<Pasteles[]>
// return this.http.post<Pasteles[]>('http://localhost:3000/agregarProducto', productos, httpOptions);

// this.pastelObject = JSON.stringify({
//   nombre : Pasteles.nombre,
//   descripcion : Pasteles.descripcion,
//   precio : Pasteles.precio,
//   imagen : Pasteles.imagen,
//   sabor : Pasteles.sabor
// })
// return this.http.post<Pasteles[]>('http://localhost:3000/agregarProducto', this.pastelObject, httpOptions); 
