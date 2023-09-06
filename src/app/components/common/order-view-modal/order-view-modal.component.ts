import { Component, ElementRef, ViewChild } from '@angular/core';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/order.model';
import { OrderStatus, PaymentStatus } from 'src/app/models/order.request.model';
import { HelperService } from 'src/app/services/helper.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css'],
})
export class OrderViewModalComponent {
  order?: Order;
  @ViewChild('content') content?: ElementRef;
  public orderStatus = OrderStatus;
  public paymentStatus = PaymentStatus;

  closeResult: any;
  constructor(
    private modalService: NgbModal,
    private _helper: HelperService,
    public _product: ProductService
  ) {
    this._helper.openOrderModalEmitter.subscribe({
      next: (order: Order) => {
        // alert("output from modal view")
        console.log(order);
        this.order = order;
        this.open(this.content);
      },
    });
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
}
