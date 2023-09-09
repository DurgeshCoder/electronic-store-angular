import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderStatus, PaymentStatus } from 'src/app/models/order.request.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css'],
})
export class OrderViewModalComponent implements OnInit, OnDestroy {
  order?: Order;
  @ViewChild('content') content?: ElementRef;
  public orderStatus = OrderStatus;
  public paymentStatus = PaymentStatus;
  public modalSubscription?: Subscription;
  updateState = false;

  closeResult: any;
  constructor(
    private modalService: NgbModal,
    private _helper: HelperService,
    public _product: ProductService,
    private _order: OrderService,
    private _toastr: ToastrService,
    public _auth: AuthService
  ) {}
  // init
  ngOnInit(): void {
    console.log('Subscribing');

    this.modalSubscription = this._helper.openOrderModalEmitter.subscribe({
      next: (order: Order) => {
        // alert("output from modal view")
        console.log(order);
        this.order = order;
        this.open(this.content);
      },
    });
  }
  ngOnDestroy(): void {
    console.log('unsubcribing');

    this.modalSubscription?.unsubscribe();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changeState() {
    this.updateState = !this.updateState;
  }

  updateFormSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.order);
    // call server api to save data
    if (this.order) {
      this._order.updateOrder(this.order).subscribe({
        next: (order) => {
          this.order = order;
          this._toastr.success('Order Updated');
          this.updateState = false;
        },
        error: (error) => {
          console.log(error);
          this._toastr.error('Error in updating order'!!);
        },
      });
    }
  }
}
