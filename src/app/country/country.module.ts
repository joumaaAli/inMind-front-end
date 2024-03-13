import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryService } from './country.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, CountryDetailComponent, NavbarComponent],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [CountryService],
  exports: [NavbarComponent],
})
export class CountryModule {}
