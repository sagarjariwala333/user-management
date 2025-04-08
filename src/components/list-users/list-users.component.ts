import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteComponent } from '../delete/delete.component';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<User>();

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService,
    private dialog: MatDialog
  ) { }

  refreshUserList(): void {
    this.dataSource.data = this.userService.getUsers();
  }  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.filterPredicate = (data: User, filter: string): boolean => {
      return data.name.toLowerCase().includes(filter) ||
             data.email.toLowerCase().includes(filter) ||
             data.role.toLowerCase().includes(filter);
    };
  }

  @ViewChild(MatSort) sort!: MatSort;


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.active = 'name';
    this.sort.direction = 'asc';
    this.sort.disableClear = true;

  }

  ngOnInit(): void {
    this.dataSource.data = this.userService.getUsers();
  }

  deleteUser(id: number): void {

    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ?` }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id)
        this.refreshUserList()
      }
    });
  }

  openUserForm(user?: User) {
      const dialogRef = this.dialog.open(AddUserComponent, {
        width: '400px',
        data: user ? user : null
      });
  
      dialogRef.afterClosed().subscribe((result: User) => {
        if (result) {
          this.userService.addOrUpdateUser(result)
          this.refreshUserList()
        }
      });
    }

}
