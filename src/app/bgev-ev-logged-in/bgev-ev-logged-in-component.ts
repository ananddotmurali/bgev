import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bgev-ev-logged-in',
    templateUrl: './bgev-ev-logged-in-component.html',
    styleUrls: ['./bgev-ev-logged-in-component.scss']
})
export class BgEvEvLoggedInComponent implements OnInit {
    user = {
        name: 'Anderson'
    }
    ngOnInit() {
        localStorage.setItem('loginType', 'ev');
    }
    constructor(private router: Router, private _snackBar: MatSnackBar) {
        this._snackBar.open('Logged In Successfully..', '', {
            duration: 3000
        });
    }
}