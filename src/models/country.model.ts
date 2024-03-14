export class Country {
  name: string;
  code: number;
  region: string;
  population: number;
  capital: string;
  flag: string;
  images: string[] = [];
  area: number;

  constructor(data: any) {
    this.name = data.name;
    this.code = data.code;
    this.region = data.region;
    this.population = data.population;
    this.capital = data.capital;
    this.flag = data.flag;
    this.images = data.images
      ? data.images.map(
          (image: string) =>
            `http://localhost:3000/${image.replace(/\\/g, '/')}`
        )
      : [];
    this.area = data.area;
  }
}
