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
    amenities= [{"icon_name":"Store","icon":"shopping_cart"},
    {"icon_name":"Cafe","icon":"local_cafe"},
    {"icon_name":"Hospital","icon":"local_hospital"},
    {"icon_name":"Restaurant","icon":"local_dining"},
    {"icon_name":"Parking","icon":"local_parking"},
    {"icon_name":"Rest Room","icon":"wc"},
    {"icon_name":"Children Area","icon":"child_care"},
    {"icon_name":"Car Wash","icon":"local_car_wash"},
    {"icon_name":"Car Service","icon":"build"},
    {"icon_name":"ATM","icon":"atm"}];
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