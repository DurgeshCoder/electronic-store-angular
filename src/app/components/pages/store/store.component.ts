import { Component, OnInit } from '@angular/core';
import { ProductsReponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  productsResponse?: ProductsReponse;

  constructor(public productService: ProductService) {}
  ngOnInit(): void {
    this.productService.getLiveProducts().subscribe({
      next: (productsResponse) => {
        this.productsResponse = productsResponse;
        console.log(this.productsResponse);
      },
    });
  }
}
