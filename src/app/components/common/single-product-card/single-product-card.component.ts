import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css'],
})
export class SingleProductCardComponent {
  user?: User;

  @Input() product?: Product;
  constructor(
    public productService: ProductService,
    private _toastr: ToastrService,
    private _cartService: CartService,
    private _auth: AuthService
  ) {
    this._auth.getLoggedInData().subscribe({
      next: (data) => {
        this.user = data.user;
      },
    });
  }

  addToCartRequest(product: Product) {
    if (!product.stock) {
      this._toastr.error('Product is not in stock');
      return;
    }

    // request to add item in cart
    if (this.user) {
      this._cartService
        .addItemToCart(this.user.userId, {
          productId: product.productId,
          quantity: 1,
        })
        .subscribe({
          next: (cart) => {
            console.log(cart);
            this._toastr.success('Item is added to cart');
          },
          error: (error) => {
            console.log(error);
            this._toastr.error('Failed to add item to cart');
          },
        });
    } else {
      this._toastr.error('Need to login first ');
    }
  }
}
