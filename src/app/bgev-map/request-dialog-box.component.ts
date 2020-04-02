import { Component, OnInit } from '@angular/core';;
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'map-request-dialog-box',
  templateUrl: './request-dialog-box.component.html',
  styleUrls: ['./request-dialog-box.component.scss']
})
export class RequestDialogBoxComponent implements OnInit {
  constructor(private router: Router, public dialogRef: MatDialogRef<RequestDialogBoxComponent>, private _snackBar: MatSnackBar) { }
  giveRequest() {
    this._snackBar.open('Requested', '', {
      duration: 1500
    });
    this.dialogRef.close();
    /* setTimeout(function () {
      this.router.navigate([`./home`]);
   }, 2000); */
    setTimeout(() => {
      this.router.navigate(['./payment']);
      this._snackBar.open('Request Accepted', '', {
        duration: 1500
      });
    }, 2500);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}
