import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart?: Cart;
  user?: User;

  constructor(
    private _auth: AuthService,
    public _cart: CartService,
    private _toastr: ToastrService,
    private _router: Router
  ) {
    this._auth.getLoggedInData().subscribe({
      next: (userData) => {
        if (!userData.login) {
          this._toastr.error('Please login !!');
          this._router.navigate(['/login']);
        }
        this.user = userData.user;

        this.loadCart();
      },
    });
  }
  loadCart() {
    if (this.user) {
      this._cart.getCartOfUser(this.user.userId).subscribe({
        next: (cart) => {
          this.cart = cart;
          console.log(this.cart);
        },
        error: (error) => {
          console.log(error);
          this._toastr.error('Error in loading  cart!!');
        },
      });
    }
  }
}
