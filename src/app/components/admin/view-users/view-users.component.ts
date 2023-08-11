import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UsersResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  usersResponse?: UsersResponse;
  user?: User;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (usersResponse) => {
        this.usersResponse = usersResponse;
        console.log(this.usersResponse);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openUserModal(content: any, user: User) {
    this.user = user;
    this.modalService.open(content, {
      size: 'lg',
    });
  }
}
