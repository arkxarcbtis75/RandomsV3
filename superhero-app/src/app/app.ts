import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { SuperheroService } from './services/superhero';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html'
})
export class AppComponent {
  private superheroService = inject(SuperheroService);

  nombreBusqueda: string = '';
  listaDeHeroes: any[] = [];

  realizarBusqueda() {
    if (this.nombreBusqueda.trim() !== '') {
      this.superheroService.buscarHeroe(this.nombreBusqueda).subscribe((respuesta: any) => {
        if (respuesta.results && respuesta.results.length > 0) {
          this.listaDeHeroes = respuesta.results;
        } else {
          this.listaDeHeroes = [];
          alert('¡Héroe no encontrado!');
        }
      });
    }
  }
}