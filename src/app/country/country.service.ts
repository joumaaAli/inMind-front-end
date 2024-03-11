import { Injectable } from '@angular/core';
import { Country } from '../../models/country.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = environment.countriesUrl;
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/all`)
      .pipe(
        map((data: any[]) =>
          data.map((country) => this.formatCountryData(country))
        )
      );
  }

  getCountryById(id: string): Observable<Country> {
    const data = this.http.get<any>(`${this.apiUrl}/alpha/${id}`);
    return data.pipe(map((countries) => this.formatCountryData(countries[0])));
  }

  private formatCountryData(data: any): Country {
    return new Country(data);
  }
}
