import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/models/user';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data?: User
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.data?.name || '', [Validators.required, Validators.minLength(3)]],
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      role: [this.data?.role || '', Validators.required],
    });

    this.isEditMode = !!this.data;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const user: User = {
        id: this.data?.id ?? Math.floor(Math.random() * 1000),
        ...formValue,
      };

      if (this.isEditMode) {
        this.userService.updateUser(user);
      } else {
        this.userService.addOrUpdateUser(user);
      }

      this.dialogRef.close(user);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
