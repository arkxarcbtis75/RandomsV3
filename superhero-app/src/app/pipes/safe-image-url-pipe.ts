import { Pipe, PipeTransform, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Pipe({
  name: 'safeImageUrl',
  standalone: true
})
export class SafeImageUrlPipe implements PipeTransform {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  transform(url: string): Observable<SafeUrl | string> {
    if (!url) return of('https://dummyimage.com/200x250/cccccc/000000.png&text=Sin+Imagen');

    // Usamos wsrv.nl codificando la URL completa y forzando la cabecera CORS
    const proxyUrl = `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=webp`;

    return this.http.get(proxyUrl, { responseType: 'blob' }).pipe(
      map(blob => {
        const objectUrl = URL.createObjectURL(blob);
        return this.sanitizer.bypassSecurityTrustUrl(objectUrl);
      }),
      catchError(() => of('https://dummyimage.com/200x250/cccccc/000000.png&text=Sin+Imagen'))
    );
  }
}