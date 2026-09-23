import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperheroService } from './services/superhero';
import { SafeImageUrlPipe } from './pipes/safe-image-url-pipe'; // Importante

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
    console.log('¡Buscando a:', this.nombreBusqueda);

    if (this.nombreBusqueda.trim() !== '') {
      this.superheroService.buscarHeroe(this.nombreBusqueda).subscribe((respuesta: any) => {
        if (respuesta.results) {
          this.listaDeHeroes = respuesta.results;
        } else {
          this.listaDeHeroes = [];
          alert('¡Héroe no encontrado!');
        }
      });
    }
  }
}