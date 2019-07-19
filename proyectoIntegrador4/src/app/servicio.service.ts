import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from './modelos/pedidos.model';
import { Pasteles } from './modelos/productos.model'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor( private http: HttpClient) { }

  getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>('http://localhost:3000/getPedidos');
  }

  insertProductos(productos: Pasteles): Observable<Pasteles[]> {
    return this.http.post<Pasteles[]>('http://localhost:3000/agregarProducto', productos, httpOptions);
  }
}
