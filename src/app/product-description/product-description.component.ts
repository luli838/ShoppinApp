import { Component, Input } from '@angular/core';
import { IProductDescription } from '../product-description';


import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-produc-description',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="listing" [routerLink]="['/details', productDescription.id]">
      <img
        class="listing-photo"
        [src]="productDescription.photo"
        alt="Exterior photo of {{ productDescription.name }}"
      />
      <h2 class="listing-heading">{{ productDescription.name }}</h2>
      <p class="listing-description" >
        {{ productDescription.description }} 
      </p>
      <p class="listing-price">
        $ {{ productDescription.price }} 
      </p>
    </section>
  `,
  styleUrl: './product-description.component.css',
})
export class ProductDescriptionComponent {
  @Input() productDescription!: IProductDescription;
}
