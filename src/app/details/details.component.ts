import { Component, inject } from '@angular/core';

import { IProductDescription } from '../product-description';

import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if(!productDescription){
    <p>Loading...</p>
    }@else {

    <article>
      <img
        class="listing-photo"
        [src]="productDescription.photo"
        [alt]="productDescription.name"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ productDescription.name }}</h2>
        <p class="listing-description">
          {{ productDescription.description }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Product</h2>
        <ul>
          <li>Price: $ {{ productDescription.price }}</li>
           <li>
            Category: {{
              productDescription.category}}
          </li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to buy this product!</h2>
        <form [formGroup]="applyForm" (submit)="handleSubmit()">
          <label for="first-name">First Name</label>
          <input type="text" id="fist-name" formControlName="firstName" />
          <span class="alert" [hidden]="firstName.valid || firstName.untouched"
            >First name is required</span
          >
          <label for="last-name">Last Name</label>
          <input type="text" id="last-name" formControlName="lastName" />
          <span class="alert" [hidden]="lastName.valid || lastName.untouched"
            >Last name is required</span
          >
          <label for="email">Email</label>
          <input type="text" id="email" formControlName="email" />
          <span class="alert" [hidden]="email.valid || email.untouched">
            @if(email.errors?.['required']){Email is required} @else{Must be a
            valid email}
          </span>
          <button type="submit" class="primary" [disabled]="applyForm.invalid">
            Apply now
          </button>
        </form>
      </section>
    </article>

    }
  `,
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productDescription: IProductDescription | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
    ]),
  });
  constructor() {
    const productDescriptionId = Number(this.route.snapshot.params['id']);
    this.productService
      .getProducDescriptionById(productDescriptionId)
      .then((productDescription) => {
        this.productDescription = productDescription;
      });
  }
  get firstName() {
    return this.applyForm.get('firstName') as FormControl;
  }
  get lastName() {
    return this.applyForm.get('lastName') as FormControl;
  }
  get email() {
    return this.applyForm.get('email') as FormControl;
  }

  handleSubmit() {
    if (this.applyForm.invalid) return;
    this.productService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
