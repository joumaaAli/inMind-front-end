import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../../models/country.model';
import { CountryService } from '../country.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  countryId: string | null = null;
  country: Country | null = null;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryId = params.get('id');
      this.getCountry();
    });
  }

  getCountry() {
    if (!this.countryId) {
      return;
    }
    this.countryService.getCountryById(this.countryId).subscribe(
      (country) => {
        this.country = country;
      },
      (error) => {
        console.error('Error fetching country:', error);
      }
    );
  }

  isAdmin() {
    return true;
    // return this.authService.isAdmin();
  }
}
