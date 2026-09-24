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
    const term = nombre.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.name?.toLowerCase().includes(term)))
    );
  }

  buscarPorNombreReal(nombreReal: string): Observable<any[]> {
    const term = nombreReal.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography?.fullName?.toLowerCase().includes(term)))
    );
  }

  buscarPorAlias(alias: string): Observable<any[]> {
    const term = alias.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography?.aliases?.some((a: string) => a.toLowerCase().includes(term))))
    );
  }

  buscarPorBando(bando: string): Observable<any[]> {
    const term = bando.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography?.alignment?.toLowerCase().includes(term)))
    );
  }

  buscarPorEditorial(editorial: string): Observable<any[]> {
    const term = editorial.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography?.publisher?.toLowerCase().includes(term)))
    );
  }

  buscarPorGenero(genero: string): Observable<any[]> {
    const term = genero.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.appearance?.gender?.toLowerCase().includes(term)))
    );
  }

  buscarPorRaza(raza: string): Observable<any[]> {
    const term = raza.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.appearance?.race?.toLowerCase().includes(term)))
    );
  }

  buscarPorEquipo(equipo: string): Observable<any[]> {
    const term = equipo.toLowerCase().trim();
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.connections?.groupAffiliation?.toLowerCase().includes(term)))
    );
  }

  buscarPorBase(base: string): Observable<any[]> {
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.work.base?.toLowerCase().includes(base.toLowerCase().trim())))
    );
  }

  buscarPorLugarNacimiento(lugar: string): Observable<any[]> {
    return this.obtenerDatos().pipe(
      map(heroes => heroes.filter(h => h.biography.placeOfBirth?.toLowerCase().includes(lugar.toLowerCase().trim())))
    );
  }
}