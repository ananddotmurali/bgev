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
    registeredUser(name, mobile, email) {
        const user = {
            username: email,
            password: 'temp',
            attributes: {
                 email,
                 phone_number: mobile,
                 user: name
               }
         }
        Auth.signUp(user)
        .then(data => {
        alert(data);
      })
      .catch(err => console.log(err));

        this._snackBar.open('Registered Successfully. Please Login to Continue', '', {
            duration: 3000
        });
        this.router.navigate(['Login']);
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadComplete = true;
        }, 2500);
    }
}