import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'gpio-stop',
    templateUrl: './gpio-stop.component.html',
    styleUrls: ['./gpio-stop.component.css']
})
export class GPIOStopComponent implements OnInit {
    private readonly STOP: string = 'stop';

    constructor() {

    }

    sendCommand(): void {
        //this.gpioService.sendCommand(this.STOP);
    }

    ngOnInit(): void {

    }
}
