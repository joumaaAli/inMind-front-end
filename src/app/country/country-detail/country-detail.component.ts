import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../../models/country.model';
import { CountryService } from '../country.service';
import { AuthService } from '../../auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  countryId: string | null = null;
  country: Country | null = null;
  countryForm: FormGroup;
  selectedFile: File;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private authService: AuthService
  ) {
    this.countryForm = new FormGroup({});
    this.selectedFile = new File([], '');
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.countryId = params.get('id');
      this.getCountry();
    });
    this.countryForm = new FormGroup({
      capital: new FormControl(null, Validators.required),
      population: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      name: new FormControl(null, Validators.required),
      area: new FormControl(null, [Validators.required, Validators.min(0.1)]),
    });
  }

  getCountry() {
    if (!this.countryId) {
      return;
    }
    this.countryService.getCountryById(this.countryId).subscribe(
      (country) => {
        this.country = country;
        this.countryForm.setValue({
          capital: country.capital,
          population: country.population,
          name: country.name,
          area: country.area,
        });
      },
      (error) => {
        console.error('Error fetching country:', error);
      }
    );
  }

  moveNext(): void {
    const items = document.querySelectorAll('.item');
    const slide = document.querySelector('.slide');
    slide?.appendChild(items[0]);
  }

  movePrev(): void {
    const items = document.querySelectorAll('.item');
    const slide = document.querySelector('.slide');
    slide?.prepend(items[items.length - 1]);
  }

  isAdmin() {
    // return true;
    return this.authService.isAdmin();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile.size === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'You need to select a file first.',
        icon: 'error',
      });
      return;
    }

    if (!this.country?.code) {
      return;
    }
    console.log('Uploading file:', this.selectedFile);
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.countryService.uploadImages(this.country.code, formData).subscribe(
      (country) => {
        Swal.fire({
          title: 'Success!',
          text: 'You have uploaded the flag successfuly.',
          icon: 'success',
        });
      },
      (error) => {
        console.error('Error uploading flag:', error);
      }
    );
    this.getCountry();
  }

  onSubmit(): void {
    if (this.countryForm?.valid) {
      const country = new Country({
        ...this.countryForm.value,
        code: this.country?.code,
      });
      this.countryService.editCountry(country).subscribe(
        (country) => {
          this.country = country;
          Swal.fire({
            title: 'Success!',
            text: 'You have edit the country successfuly.',
            icon: 'success',
          });
        },
        (error) => {
          console.error('Error updating country:', error);
        }
      );
    }
  }
}
