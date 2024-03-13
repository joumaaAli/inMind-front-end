import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  countries: any[] = [];
  filteredCountries: any[] = [];
  searchQuery: string = '';

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCountries();
  }

  fetchCountries(): void {
    this.countryService.getCountries().subscribe((data: any[]) => {
      this.countries = data.filter(
        (country) => country.name?.common !== 'Israel'
      );
      this.filteredCountries = [...this.countries];
    });
  }

  searchCountries(query: string): void {
    this.searchQuery = query;
    if (!this.searchQuery) {
      this.filteredCountries = [...this.countries];
    } else {
      this.filteredCountries = this.countries.filter((country) =>
        country.name.common
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }
  }

  navigateToCountry(countryId: string) {
    this.router.navigate(['/country', countryId]);
  }
}
