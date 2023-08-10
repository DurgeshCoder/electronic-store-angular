import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  user?: User;
  previewImageUrl?: string;
  imageFile?: File;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    this.authService.getLoggedInData().subscribe({
      next: (user) => {
        this.user = user.user;
      },
    });
  }

  openUpdateModal(updateContent: any) {
    this.modalService.open(updateContent, {
      size: 'lg',
      centered: false,
    });
  }

  imageFieldChanged(event: any) {
    this.imageFile = (event.target as HTMLInputElement).files![0];
    if (
      this.imageFile.type == 'image/png' ||
      this.imageFile.type == 'image/jpeg'
    ) {
      //preview ..
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.imageFile);
      // upload file
    } else {
      this.toastr.error('Only JPEG or PNG allowed !!');
      this.imageFile = undefined;
    }
  }
}
