import { Component, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import  { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-request-dialog-box',
  templateUrl: './request-dialog-box.component.html',
  styleUrls: ['./request-dialog-box.component.css']
})
export class RequestDialogBoxComponent implements OnInit {
  constructor(private router: Router,public dialogRef: MatDialogRef<RequestDialogBoxComponent>,private _snackBar: MatSnackBar) { }
  giveRequest(){
    this._snackBar.open('Requested', '', {
      duration: 3000
  });
  this.dialogRef.close();
  /* setTimeout(function () {
    this.router.navigate([`./home`]);
 }, 2000); */
 setTimeout(() => {
  this.router.navigate(['./payment']);
}, 2500);
}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
