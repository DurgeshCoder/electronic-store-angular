import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent {
  productId?: string;
  product?: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    public _productService: ProductService,
    private title: Title
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['productId'];
      console.log(this.productId);
      this.loadProduct();
    });
  }
  loadProduct() {
    if (this.productId) {
      this._productService.getProduct(this.productId).subscribe({
        next: (data) => {
          console.log(data);
          this.product = data;
          this.title.setTitle(data.title + ' | Electonic Store ');
        },
      });
    }
  }
}
