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

  nombreBusqueda: string = '';
  listaDeHeroes: any[] = [];

  realizarBusqueda() {
    if (this.nombreBusqueda.trim() !== '') {
      this.superheroService.buscarHeroe(this.nombreBusqueda).subscribe((respuesta: any) => {
        if (respuesta.results && respuesta.results.length > 0) {
          this.listaDeHeroes = respuesta.results;
        } else {
          this.listaDeHeroes = [];
          
          Swal.fire({
            icon: 'error',
            title: '¡Héroe no encontrado!',
            text: `No se encontraron resultados para "${this.nombreBusqueda}". Intenta con otro nombre en inglés.`,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    }
  }
}