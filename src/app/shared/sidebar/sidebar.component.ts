import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  private _itemSidebar: string = "";

  get historial() {
    return this.gifsService.historial;
  }



  constructor(private gifsService: GifsService) { }

  buscar(item: string): void {
    this.gifsService.buscarGifs(item);
  }

}
