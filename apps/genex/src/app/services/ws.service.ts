import { Injectable } from '@angular/core';
import { IGridData } from '@genex/interfaces';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../envs/environment';
import { AbstractWebSocketService } from './ws.class';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService extends AbstractWebSocketService {
  private socket: Socket;
  private connectionStatus: Observable<boolean>;

  constructor() {
    super();

    // We create the socket connection
    this.socket = io(environment.serverUrl);

    // We create an observable for the connection status
    this.connectionStatus = new Observable<boolean>((observer) => {
      this.socket.on('connect', () => {
        observer.next(true);
      });

      this.socket.on('disconnect', () => {
        observer.next(false);
      });

      // Handle any initial connection status
      observer.next(this.socket.connected);
    });
  }

  // We get the connection status
  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus;
  }

  // We start generating data
  setBias(bias: string): void {
    this.socket.emit('setBias', bias);
  }

  // We listen for data from the server
  listenForData(): Observable<IGridData> {
    return new Observable((observer) => {
      this.socket.on('dataEvent', (message: IGridData) => {
        observer.next(message);
      });
    });
  }

  // We stop generating data
  stopGeneratingData(): void {
    this.socket.emit('stopGenerating');
  }
}
