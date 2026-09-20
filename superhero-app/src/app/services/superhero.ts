import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private http = inject(HttpClient);
  private miToken = 'a0aa1d8592eab251c98a781d9b3ddaad';

  buscarHeroe(nombre: string): Observable<any> {
    return this.http.get(`/api/${this.miToken}/search/${nombre}`);
  }

  // Descarga la imagen vía HTTP y la convierte a Base64 local
  obtenerImagenBase64(urlImagen: string): Observable<string> {
    if (!urlImagen) return of('https://dummyimage.com/200x250/cccccc/000000.png&text=Sin+Imagen');
    
    // Usamos el proxy local de /api o la URL directa
    return this.http.get(urlImagen, { responseType: 'blob' }).pipe(
      switchMap(blob => new Observable<string>(observer => {
        const reader = new FileReader();
        reader.onloadend = () => {
          observer.next(reader.result as string);
          observer.complete();
        };
        reader.onerror = () => {
          observer.next('https://dummyimage.com/200x250/cccccc/000000.png&text=Sin+Imagen');
          observer.complete();
        };
        reader.readAsDataURL(blob);
      })),
      catchError(() => of('https://dummyimage.com/200x250/cccccc/000000.png&text=Sin+Imagen'))
    );
  }
}