import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Product, ProductsReponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css'],
})
export class ViewProductsComponent implements OnInit {
  productsResponse?: ProductsReponse;
  product?: Product;

  constructor(
    public productService: ProductService,
    private toatrService: ToastrService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadProducts(0);
  }

  loadProducts(pageNumber = 0) {
    this.productService
      .getAllProducts(pageNumber, 10, 'addedDate', 'desc')
      .subscribe({
        next: (productResponse) => {
          this.productsResponse = productResponse;
          console.log(this.productsResponse);
        },
      });
  }

  pageChange(page: number) {
    console.log(page);
    this.loadProducts(page - 1);
  }

  open(content: any, product: Product) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'xl',
    });
    this.product = product;
  }
}
