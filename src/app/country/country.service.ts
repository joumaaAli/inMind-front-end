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

  getCountries(name: string, region: string): Observable<Country[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/countries?name=${name}&region=${region}`)
      .pipe(
        map((data: any[]) =>
          data.map((country) => this.formatCountryData(country))
        )
      );
  }

  getCountryById(code: string): Observable<Country> {
    const data = this.http.get<any>(`${this.apiUrl}/country?code=${code}`);
    return data.pipe(map((country) => this.formatCountryData(country)));
  }

  editCountry(country: Country): Observable<Country> {
    return this.http
      .put<any>(`${this.apiUrl}/countries/${country?.code}`, country)
      .pipe(map((country) => this.formatCountryData(country)));
  }

  uploadImages(code: number, flag: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/countries/${code}/images`, flag);
  }

  private formatCountryData(data: any): Country {
    return new Country(data);
  }
}
