import {Component} from '@angular/core';
import * as MQTT from 'mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private client: MQTT.Client;

  deviceId: string;

  constructor() {

  }

  link(): void {
    this.client = MQTT.connect('mqtt://test.mosquitto.org');

    this.client.on('connect', () => {
      console.log('connect');
    });

    this.client.on('close', () => {
      console.log('close');
    });

  }

  unlink(): void {
    this.client.end();
  }


}
