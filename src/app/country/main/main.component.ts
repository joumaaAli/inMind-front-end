import { Component, OnInit, ElementRef } from '@angular/core';
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
    private elRef: ElementRef
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

  toggleActive(): void {
    const optionMenu = this.elRef.nativeElement.querySelector('.select-menu');
    optionMenu.classList.toggle('active');
  }

  selectOption(event: any): void {
    const selectedOption = event.target
      .closest('.option')
      .querySelector('.option-text').innerText;
    this.region = selectedOption;
    const sBtnText = this.elRef.nativeElement.querySelector('.sBtn-text');
    sBtnText.innerText = selectedOption;
    const optionMenu = this.elRef.nativeElement.querySelector('.select-menu');
    optionMenu.classList.remove('active');
    this.countryService
      .getCountries(this.searchQuery, selectedOption)
      .subscribe((data: any[]) => {
        this.countries = data.filter((country) => country?.name !== 'Israel');
        this.filteredCountries = [...this.countries];
      });
  }

  removeOption(event: any): void {
    this.region = '';
    const selectedOption = event.target
      .closest('.option')
      .querySelector('.option-text').innerText;
    const sBtnText = this.elRef.nativeElement.querySelector('.sBtn-text');
    sBtnText.innerText = selectedOption;
    const optionMenu = this.elRef.nativeElement.querySelector('.select-menu');
    this.countryService
      .getCountries(this.searchQuery, this.region)
      .subscribe((data: any[]) => {
        this.countries = data.filter((country) => country?.name !== 'Israel');
        this.filteredCountries = [...this.countries];
      });
    optionMenu.classList.remove('active');
  }
}
