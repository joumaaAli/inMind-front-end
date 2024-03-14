import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchQuery: string = '';
  region: string = '';

  constructor(
    private countryService: CountryService,
    private router: Router,
    authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService
      .getCountries(this.searchQuery, this.region)
      .subscribe((data: any[]) => {
        this.countries = data.filter((country) => country?.name !== 'Israel');
        console.log('this.countries', this.countries);
        this.filteredCountries = [...this.countries];
      });
  }

  searchCountries(query: string): void {
    this.searchQuery = query;
    if (!this.searchQuery) {
      this.filteredCountries = [...this.countries];
    } else {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  navigateToCountry(countryId: string) {
    console.log('countryId', countryId);
    this.router.navigate(['/country', countryId]);
  }
}
