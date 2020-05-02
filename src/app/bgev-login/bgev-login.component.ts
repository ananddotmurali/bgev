import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';


@Component({
    selector: 'bgev-login',
    templateUrl: './bgev-login.component.html',
    styleUrls: ['./bgev-login.component.css']
})
export class BgEvLoginComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    hide = true;
    constructor(private router: Router) {}

    login(email: string, password: string) {

        const user = {
            username: email,
            password: password
        }
        Auth.signIn(user).then( ( res ) => {
            console.log(res);
            this.router.navigate([`./evloggedin`]);
          })
            .catch(err => console.log(err));
        // let owner = login_id.substring(0, 7);
        // if(owner == 'gomathi'){
        //     this.router.navigate([`./cploggedin`]);
        // } else if(owner == 'swaroop'){
        //     console.log(owner);
        //     this.router.navigate([`./evloggedin`]);
        // } else {
        //     return false;
        // }
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    
    getPasswordErrorMsg() {
        return this.password.hasError('required') ? 'Please enter your password' : '';
    }
    
}