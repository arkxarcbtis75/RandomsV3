import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SuperheroService {
  private http = inject(HttpClient);
  private apiUrl = 'https://akabab.github.io/superhero-api/api/all.json';

  buscarHeroe(nombre: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((heroes) => {
        const termino = nombre.toLowerCase().trim();
        
        // Filtramos héroes que contengan la búsqueda en su nombre
        const filtrados = heroes.filter(h => 
          h.name.toLowerCase().includes(termino)
        );

        // Mapeamos los datos para mantener la estructura que usas en tu app.html
        const resultados = filtrados.map(heroe => ({
          id: heroe.id,
          name: heroe.name,
          image: {
            url: heroe.images.md || heroe.images.sm
          },
          biography: {
            alignment: heroe.biography.alignment || 'good'
          }
        }));

        return { results: resultados };
      })
    );
  }
}