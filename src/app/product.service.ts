import { Injectable } from '@angular/core';

import { IProductDescription } from './product-description';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  url = 'http://localhost:3000/products';
  constructor() {}
  async getAllProduct(): Promise<IProductDescription[]> {
    const data = await fetch(this.url);
    const houses = (await data.json()) ?? [];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(houses);
      }, 300);
    });
  }
  async getProducDescriptionById(id: Number): Promise<IProductDescription> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }
  async submitApplication(firstName: string, lastName: string, email: string) {
    alert(JSON.stringify({ firstName, lastName, email }));
  }
}
