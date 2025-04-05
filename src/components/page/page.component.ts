import { Component, OnInit } from '@angular/core';
import { AddUserComponent } from '../add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/models/user';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  users: User[] = [];

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
