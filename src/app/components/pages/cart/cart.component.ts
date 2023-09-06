import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Cart, CartItem } from 'src/app/models/cart.model';
import {
  OrderRequest,
  OrderStatus,
  PaymentStatus,
} from 'src/app/models/order.request.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { updateCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart?: Cart;
  user?: User;
  @ViewChildren('billingName')
  billingName!: ElementRef<HTMLInputElement>;
  orderRequest: OrderRequest = {
    billingName: '',
    billingPhone: '',
    billingAddress: '',
    paymentStatus: PaymentStatus.NOTPAID,
    orderStatus: OrderStatus.PENDING,
    userId: '',
    cartId: '',
  };

  constructor(
    private _auth: AuthService,
    public _cart: CartService,
    private _toastr: ToastrService,
    private _router: Router,
    private _cartStore: Store<{ cart: Cart }>,
    private _model: NgbModal,
    private _order: OrderService
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
          this._cartStore.dispatch(updateCart({ cart: this.cart }));
          this.orderRequest.userId = this.user?.userId as string;
          this.orderRequest.cartId = this.cart.cartId;
          console.log(this.orderRequest);
        },
        error: (error) => {
          console.log(error);
          this._toastr.error('Error in loading  cart!!');
        },
      });
    }
  }

  increaseQuantity(cartItem: CartItem) {
    // valildate
    this.updateQuantity(cartItem, cartItem.quantity + 1);
  }

  decreaseQuantity(cartItem: CartItem) {
    const quantityToUpdate = cartItem.quantity - 1;
    if (quantityToUpdate <= 0) {
      this._toastr.error('Quantity must be > 0');
      // this.deleteItemCall(cartItem);
      return;
    }
    this.updateQuantity(cartItem, quantityToUpdate);
  }

  deleteItem(cartItem: CartItem) {
    this.deleteItemCall(cartItem);
  }

  clearCart() {
    this._cart.clearCart(this.user?.userId as string).subscribe({
      next: (data: any) => {
        console.log(data);

        if (data.success) {
          this._toastr.success('Cart Cleared !!');

          if (this.cart) {
            this.cart = { ...this.cart, items: [] };
            this._cartStore.dispatch(updateCart({ cart: this.cart }));
          }
        }
      },
    });
  }

  // ----------------------------------------

  private deleteItemCall(cartItem: CartItem) {
    this._cart
      .removeItemFromCart(this.user?.userId as string, cartItem.cartItemId)
      .subscribe({
        next: (data: any) => {
          if (data.success) {
            this._toastr.success('Item removed');

            if (this.cart) {
              this.cart = {
                ...this.cart,
                items: this.cart.items.filter((item) => {
                  console.log(item.cartItemId);
                  console.log(cartItem.cartItemId);
                  return item.cartItemId !== cartItem.cartItemId;
                }),
              };
              this._cartStore.dispatch(updateCart({ cart: this.cart }));
            }
          }
        },
        error: (error) => {
          this._toastr.error('Error in removing item from cart');
        },
      });
  }

  private updateQuantity(cartItem: CartItem, quantity: number) {
    this._cart
      .addItemToCart(this.user?.userId as string, {
        productId: cartItem.product.productId,
        quantity: quantity,
      })
      .subscribe({
        next: (cart) => {
          this._toastr.success('Quntity Updated !! ');
          this.cart = cart;
          this._cartStore.dispatch(updateCart({ cart: cart }));
        },
      });
  }

  // open order modal

  openOrderPlaceModel(modalContent: any) {
    if (this.cart && this.cart.items.length > 0) {
      const result = this._model.open(modalContent, {
        size: 'lg',
        animation: true,
      });
    }
  }

  // create order form submit
  createOrderFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    // validator
    if (this.orderRequest.billingName?.trim() === '') {
      this._toastr.warning('Billing name is required !!');
      return;
    }
    if (this.orderRequest.billingPhone?.trim() === '') {
      this._toastr.warning('Billing phone is required !!');
      return;
    }
    if (this.orderRequest.billingAddress?.trim() === '') {
      this._toastr.warning('Billing address is required !!');
      return;
    }

    console.log(this.orderRequest);
    this._order.createOrder(this.orderRequest).subscribe({
      next: (order: any) => {
        this._toastr.success('Order Created ', '', {
          positionClass: 'toast-bottom-center',
        });
        this._toastr.info('Processing for the payment...', '', {
          positionClass: 'toast-bottom-center',
        });
        this._model.dismissAll();
        this.loadCart();
      },
    });
    //
  }
}
