import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';

import { UsersService } from './users.service';

import swal from 'sweetalert2';

import { User } from './user.model';

declare interface DataTable {
  headerRow: string[];
  dataRows: string[][];
}
declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewChecked {
  users: User[];
  chosenUser: User;
  chosenUserIndex: number;
  dataTable: DataTable;
  dtOptions: object;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.dataTable = {
      headerRow: ['First Name', 'Last Name', 'Username', 'Password', 'Email', 'Status', 'Action'],
      dataRows: null
    };
    this.loadUsers();
  }

  ngAfterViewChecked() {
    $('[rel="tooltip"]').tooltip({
      trigger: 'hover'
    });
  }

  loadUsers() {
    const cachedUsers = localStorage.getItem('admin-users');
    const rows = [];
    if (!cachedUsers) {
      this.usersService.getUsers().subscribe(
        (data) => {
          this.users = data;
          localStorage.setItem('admin-users', JSON.stringify(this.users));
          this.users.forEach((current) => {
            rows.push([
              current.firstname, current.lastname, current.username, current.password, current.email,
              current.status ? 'Activated' : 'Deactivated'
            ]);
          });
          this.dataTable.dataRows = rows;
          this.initialiseDatatable();
        },
        (err) => {
          swal({
            title: 'Error',
            text: 'An unknown error occurred while retrieving users.',
            type: 'error',
            confirmButtonClass: 'btn btn-danger',
            buttonsStyling: false
          });
        });
    } else {
      this.users = JSON.parse(cachedUsers);
      this.users.forEach((current) => {
        rows.push([
          current.firstname, current.lastname, current.username, current.password, current.email,
          current.status ? 'Activated' : 'Deactivated'
        ]);
      });
      this.dataTable.dataRows = rows;
      this.initialiseDatatable();
    }
  }

  initialiseDatatable() {
    if (this.dataTable.dataRows) {
      this.dtOptions = {
        pagingType: 'full_numbers',
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, 'All']],
        responsive: true
      };
    }
  }

  deleteUser(index: number) {
    swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Yes, delete it!',
      buttonsStyling: false
    }).then(() => {
      this.users.splice(index, 1);
      if (this.users.length === 0) {
        this.dataTable.dataRows = null;
      } else {
        this.dataTable.dataRows.splice(index, 1);
      }
      localStorage.setItem('admin-users', JSON.stringify(this.users));
      swal({
        title: 'Deleted',
        text: 'User was deleted successfully.',
        type: 'success',
        confirmButtonClass: 'btn btn-success',
        buttonsStyling: false
      });
    }).catch(() => {
      // Do nothing
    });
  }

  editUser(index: number) {
    this.chosenUser = this.users[index];
    this.chosenUserIndex = index;
  }

  toggleUserStatus(index: number) {
    this.users[index].status = !this.users[index].status;
    this.dataTable.dataRows[index][5] = this.users[index].status ? 'Activated' : 'Deactivated';
    localStorage.setItem('admin-users', JSON.stringify(this.users));
  }

  updateUsers(user: User) {
    if (user) {
      this.users[this.chosenUserIndex] = user;
      this.users[this.chosenUserIndex].status = this.chosenUser.status;
      this.dataTable.dataRows[this.chosenUserIndex] = [user.firstname, user.lastname, user.username, user.password, user.email, user.status ? 'Activated' : 'Deactivated'];
      localStorage.setItem('admin-users', JSON.stringify(this.users));
    }
    this.chosenUser = null;
    this.chosenUserIndex = null;
  }
}
