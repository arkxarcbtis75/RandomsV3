// superhero.ts
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

  private obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  buscarPorNombre(nombre: string): Observable<any[]> {
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.name.toLowerCase().includes(nombre.toLowerCase().trim())))
    );
  }

  buscarPorNombreReal(nombreReal: string): Observable<any[]> {
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography.fullName?.toLowerCase().includes(nombreReal.toLowerCase().trim())))
    );
  }

  buscarPorAlias(alias: string): Observable<any[]> {
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography.aliases?.some((a: string) => a.toLowerCase().includes(alias.toLowerCase().trim()))))
    );
  }
}