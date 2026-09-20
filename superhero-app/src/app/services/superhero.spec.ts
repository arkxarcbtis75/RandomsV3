import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { SuperheroService } from './superhero';

describe('SuperheroService', () => {
  let service: SuperheroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SuperheroService,
        provideHttpClient() 
      ]
    });
    service = TestBed.inject(SuperheroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});