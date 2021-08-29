import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';

@Injectable({

  //Con providedIn: 'root' Angular eleva el acceso a este servicio
  //desde cualquier parte de la aplicaion
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'Y3o5GuYOJLS5dNQDvmuKfqfbeOEO7aNP';
  private servicioUrl: string = "https://api.giphy.com/v1/gifs"
  private _historial: string[] = [];

  //TODO Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  get historial(): string[] {
    //Al utilizar el operador spread, te retorna una 
    //lista contenido en la propiedad original de la lista, pero
    //con la ventaja de que la puedes manipular sin modificar la propiedad
    //original, ya que corre el riesgo de que modifiques el valor
    //original al hacerlo sin el spread operator
    return [...this._historial];
  }

  //El localStorage se iguala a la variable que se usa en el constructor porque el constructor se ejecuta una sola vez en toda la aplicacion desde que se
  //recarga la pagina
  constructor(private http: HttpClient) {

    //this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    if (localStorage.getItem('historial')) {
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = "") {

    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    //Con HttpParams podemos construir los parametros de una url
    const params = new HttpParams().set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10');

    /*Forma de hacer peticiones */
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp: SearchGifsResponse) => {
        this.resultados = resp.data;
        console.log(params);
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      })

  }
}
