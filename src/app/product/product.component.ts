import { Component, inject } from '@angular/core';
import { ProductDescriptionComponent } from '../product-description/product-description.component';
import { IProductDescription } from '../product-description';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductDescriptionComponent],
  template: `
    <section>
      <form>
        <input type="search" placeholder="Filter by name" #filter />
        <button
          type="button"
          class="primary" 
          (click)="filterResults(filter.value)"
        >
          Search
        </button>
      </form>
    </section>
    <section class="results">
      @if(!productDescriptionList.length){
      <span>Loading...</span>
      } @for(product of filteredProducList; track product.id ){

        <app-produc-description [productDescription] ="product" />


      }
    </section>
  `,
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productDescriptionList: IProductDescription[] = [];
  productService: ProductService = inject(ProductService);
  filteredProducList: IProductDescription[] = [];
  constructor() {
    this.productService
      .getAllProduct()
      .then((productDescriptionList: IProductDescription[]) => {
        this.productDescriptionList = productDescriptionList;
        this.filteredProducList = productDescriptionList;
      });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredProducList = this.productDescriptionList;
    }
    this.filteredProducList = this.productDescriptionList.filter((house) =>
      house?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
