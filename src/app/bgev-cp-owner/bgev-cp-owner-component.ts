import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'bgev-cp-owner',
    templateUrl: './bgev-cp-owner-component.html',
    styleUrls: ['./bgev-cp-owner-component.scss']
})
export class BgCpOwnerComponent implements OnInit {
    loadComplete = false;
    constructor(private router: Router, private _snackBar: MatSnackBar) {}
    registeredUser() {
        this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
            duration: 3000
        });
        this.router.navigate(['home']);
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 2500)
    }    
}