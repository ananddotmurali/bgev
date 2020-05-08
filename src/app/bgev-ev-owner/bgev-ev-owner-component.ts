import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from 'aws-amplify';

@Component({
    selector: 'bgev-ev-owner',
    templateUrl: './bgev-ev-owner-component.html',
    styleUrls: ['./bgev-ev-owner-component.scss']
})
export class BgEvOwnerComponent implements OnInit {
    loadComplete = false;
    constructor(private router: Router, private _snackBar: MatSnackBar) {}
    async registeredUser(name: string, mobile: string, email: string) {
        const user = {
            username: email,
            password: 'test@123',
            attributes: {
                nickname: name,
                name: name,
                profile: 'ev',
                 email,
                 gender: 'Male',
                 phone_number: mobile,
                 birthdate: '2000-01-01'
               }
         }
        const data = await Auth.signUp(user);

        console.log('userConfirmation::', data.userConfirmed);

        this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
        });
        this.router.navigate(['login']);
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 2500);
    }
}