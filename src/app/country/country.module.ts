import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { CountryService } from './country.service';

@NgModule({
  declarations: [MainComponent, CountryDetailComponent],
  imports: [CommonModule, HttpClientModule],
  providers: [CountryService],
})
export class CountryModule {}
