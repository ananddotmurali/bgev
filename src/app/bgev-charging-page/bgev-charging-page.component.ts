import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
    selector: 'bgev-charging-page',
    templateUrl: './bgev-charging-page.component.html',
    styleUrls: ['./bgev-charging-page.component.css']
})

export class BgEvChargingPageComponent {
    color: ThemePalette = 'primary';
    mode: ProgressSpinnerMode = 'determinate';
    value = 50;
}