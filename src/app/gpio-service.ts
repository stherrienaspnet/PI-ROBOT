import * as MQTT from 'mqtt';
import * as Promise from 'bluebird';
import {EventEmitter} from 'events';
import {ActionType, GPIOServicable, MessageType} from './gpio.model';

export class GPIOService extends EventEmitter implements GPIOServicable {
  private readonly SERVER_URL: string = 'ws://mosquitto.org:8080/';
  private readonly REQUEST: string = 'request';
  private readonly RESPONSE: string = 'response';

  private client: MQTT.Client;
  private deviceId: string;
  private connectResolve: (...args: any[]) => void;
  private disconnectResolve: (...args: any[]) => void;
  private subscribeResolve: (...args: any[]) => void;
   private publishResolve: (...args: any[]) => void;

  private addEventListeners(): void {
    this.client.addListener('connect', this.onConnect);
    this.client.addListener('message', this.onMessage);
    this.client.addListener('close', this.onClose);
  }

  private removeEventListeners(): void {
    this.client.removeAllListeners('connect');
    this.client.removeAllListeners('message');
    this.client.removeAllListeners('close');
  }

  private getBaseTopicUrl(): string {
    return `pi-robot/${this.deviceId}/control/`;
  }

  private onConnect: () => any = () => {
    const topicUrl: string = `${this.getBaseTopicUrl()}+`;
    this.subscribe(topicUrl).then((result: boolean) => {
      this.connectResolve(result);
    });
  };

  private resolveMessa

  private onMessage = (topicUrl: string, message: Uint8Array) => {
    const messageType:string = MessageType.resolve(topicUrl);
    const actionType:string = message.toString();
    this.emit('onAction', messageType, actionType);
  }

  private onClose = () => {
    //
  }


  private subscribeCallback: () => any = () => {
    this.subscribeResolve(true);
  };

  private subscribe(topicUrl: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.subscribeResolve = resolve;
      this.client.subscribe(topicUrl, this.subscribeCallback);
    });
  }

  linkDevice(deviceId: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (deviceId == null || deviceId.length < 1) {
        reject(true);
      }
      this.deviceId = deviceId;
      this.client = MQTT.connect(this.SERVER_URL);
      this.connectResolve = resolve;
      this.addEventListeners();
      this.commandDevice(ActionType.LINK_DEVICE);
    });
  }

  unlinkDevice(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.client.end();
      resolve(true);
    });
  }

  commandDevice(command: string): void {
    const topicUrl: string = `${ this.getBaseTopicUrl()}${this.REQUEST}`;
    this.client.publish(topicUrl, command);
  }
}
