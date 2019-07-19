import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SesionDialogComponent } from '../components/sesion-dialog/sesion-dialog.component';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css']
})
export class MainNavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private dialogo: MatDialog) {}

  abrirModal():void{
    const dialogRef = this.dialogo.open(SesionDialogComponent, {});
    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}
