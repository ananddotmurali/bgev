import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { BgEvConfigService } from '../bgev-config-service/bgev-config-service';
import { MatTabChangeEvent } from '@angular/material/tabs/public-api';


@Component({
    selector: 'bgev-intro-page',
    templateUrl: './bgev-intro-page.component.html',
    styleUrls: ['./bgev-intro-page.component.css'],
})
export class BgEvIntroPageComponent implements OnInit {
    links = ['Search', 'Login', 'Register'];
    linksIcons = ['search', 'people_alt', 'person_add'];
    background: ThemePalette = undefined;
    constructor(private configService: BgEvConfigService) {
    }
    ngOnInit(): void {
        localStorage.setItem('loggedIn', 'no');
    }
    activeLink = this.configService.getCurrentTab();

    

    updateActiveLink() {
        setTimeout(() => {
            this.configService.setCurrentTab(this.activeLink);
        }, 0);
    }

    selectedTabChange() {
        console.log('tab changed...');
    }
}