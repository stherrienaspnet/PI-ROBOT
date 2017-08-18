import {Component, OnInit} from '@angular/core';
import {GPIOService} from './gpio-service';
import * as Promise from 'bluebird';
import {ActionType, MessageType} from './gpio.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly LINKING_MESSAGE: string = 'Linking device...';
  private readonly LINKED_MESSAGE: string = 'Device linked';

  deviceId: string;
  isLinked: boolean;
  isLinking:boolean;

  linkMessage: string;

  private onAction = (messageType: string, actionType: string) => {
    if (messageType == MessageType.RESPONSE && actionType == ActionType.LINK_DEVICE) {
      this.isLinked = true;
      this.isLinking = false;
    }
  };

  constructor(private gpioService: GPIOService) {
    gpioService.addListener('onAction', this.onAction);
  }

  ngOnInit(): void {
    this.linkMessage = '';
  }

  linkDevice(): void {
    const linkPromise: Promise<boolean> = this.gpioService.linkDevice(this.deviceId);
    this.linkMessage = this.LINKING_MESSAGE;
    this.isLinking = true;
    linkPromise.then((result) => {
      this.linkMessage = this.LINKED_MESSAGE;
    });
  }

  unlinkDevice(): void {
    const unlinkPromise: Promise<boolean> = this.gpioService.unlinkDevice();
    unlinkPromise.then((result) => {
      this.isLinked = false;
    });
  }
}
