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

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data: any[]) => {
      this.countries = data.filter(
        (country) => country.name?.common !== 'Israel'
      );
    });
  }
  navigateToCountry(countryId: string) {
    this.router.navigate(['/country', countryId]);
  }
}
