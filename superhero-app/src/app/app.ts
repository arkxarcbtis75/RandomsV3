import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperheroService } from './services/superhero';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent {
  private superheroService = inject(SuperheroService);

  criterioBusqueda: string = 'nombre';
  valorBusqueda: string = '';
  listaDeHeroes: any[] = [];

  realizarBusqueda() {
    if (!this.valorBusqueda.trim()) return;

    let peticion$;

    switch (this.criterioBusqueda) {
      case 'nombre': peticion$ = this.superheroService.buscarPorNombre(this.valorBusqueda); break;
      case 'nombreReal': peticion$ = this.superheroService.buscarPorNombreReal(this.valorBusqueda); break;
      case 'alias': peticion$ = this.superheroService.buscarPorAlias(this.valorBusqueda); break;
      case 'bando': peticion$ = this.superheroService.filtrarPorBando(this.valorBusqueda); break;
      case 'editorial': peticion$ = this.superheroService.filtrarPorEditorial(this.valorBusqueda); break;
      case 'genero': peticion$ = this.superheroService.filtrarPorGenero(this.valorBusqueda); break;
      default: peticion$ = this.superheroService.buscarPorNombre(this.valorBusqueda);
    }

    peticion$.subscribe((resultados: any[]) => {
      if (resultados && resultados.length > 0) {
        this.listaDeHeroes = resultados;
      } else {
        this.listaDeHeroes = [];
        Swal.fire({
          icon: 'error',
          title: '¡Sin coincidencias!',
          text: `No se encontraron resultados para "${this.valorBusqueda}".`,
          confirmButtonColor: '#0d6efd'
        });
      }
    });
  }

  verDetalles(heroe: any) {
    Swal.fire({
      title: heroe.name,
      html: `
        <div class="text-start fs-6">
          <p><strong>Nombre Real:</strong> ${heroe.biography.fullName || 'Desconocido'}</p>
          <p><strong>Bando:</strong> ${heroe.biography.alignment === 'good' ? 'Bueno' : 'Malo'}</p>
          <p><strong>Editorial:</strong> ${heroe.biography.publisher || 'N/A'}</p>
          <p><strong>Lugar de Nacimiento:</strong> ${heroe.biography.placeOfBirth || 'Desconocido'}</p>
          <p><strong>Raza / Género:</strong> ${heroe.appearance.race || 'N/A'} / ${heroe.appearance.gender || 'N/A'}</p>
          <p><strong>Base:</strong> ${heroe.work.base || 'Desconocida'}</p>
          <p><strong>Equipos:</strong> ${heroe.connections.groupAffiliation || 'Ninguno'}</p>
          <hr>
          <h6 class="fw-bold">Estadísticas de Poder:</h6>
          <small>Inteligencia: ${heroe.powerstats.intelligence} | Fuerza: ${heroe.powerstats.strength} | Velocidad: ${heroe.powerstats.speed}</small>
        </div>
      `,
      imageUrl: heroe.images.md || heroe.images.sm,
      imageHeight: 250,
      imageAlt: heroe.name,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#0d6efd'
    });
  }
}

