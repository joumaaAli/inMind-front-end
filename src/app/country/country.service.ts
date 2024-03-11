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
      .get<any[]>(this.apiUrl)
      .pipe(
        map((data: any[]) =>
          data.map((country) => this.formatCountryData(country))
        )
      );
  }

  private formatCountryData(data: any): Country {
    return new Country(data);
  }
}
