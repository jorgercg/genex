import { Injectable } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { IGridData } from '@genex/interfaces';
import { Subscription, interval, map } from 'rxjs';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class GridEngineGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private connectedClients = new Map<string, Socket>();
  private clientsSubscription = new Map<string, Subscription>();

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  sendDataToClient(clientId: string, message: IGridData) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit('dataEvent', message);
      console.log(`Sent dataEvent to client ${clientId} @ ${Date.now()}`);
    }
  }

  @SubscribeMessage('stopGenerating')
  handleStopGenerating(@ConnectedSocket() client: Socket): void {
    console.log(`Client ${client.id} asked to stop generating`);
    const subscription = this.clientsSubscription.get(client.id);
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  @SubscribeMessage('setBias')
  handleSetBias(
    @MessageBody() bias: string,
    @ConnectedSocket() client: Socket
  ): void {
    console.log(`Client ${client.id} sent bias: ${bias}`);
    let subscription = this.clientsSubscription.get(client.id);
    if (subscription) {
      subscription.unsubscribe();
    }
    subscription = this.getGridData(bias).subscribe((data) => {
      this.sendDataToClient(client.id, data);
    });
    this.clientsSubscription.set(client.id, subscription);
  }

  private generateRandomChar(bias: string | null): string {
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (bias) {
      alphabet = alphabet.replace(bias, '');
    }
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  private generateBiasRandomPositions(): [number, number][] {
    const positions: [number, number][] = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        positions.push([i, j]);
      }
    }

    // Shuffle array
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Return first 20 elements, that is 20% of the grid
    return positions.slice(0, 20);
  }

  private generateGrid(bias: string | null): string[][] {
    const grid: string[][] = [];
    for (let i = 0; i < 10; i++) {
      grid[i] = [];
      for (let j = 0; j < 10; j++) {
        grid[i][j] = this.generateRandomChar(bias);
      }
    }

    if (!bias) {
      return grid;
    }

    const biasPositions = this.generateBiasRandomPositions();
    for (const [i, j] of biasPositions) {
      grid[i][j] = bias;
    }

    return grid;
  }

  private getTwoDigitSeconds(): string {
    const seconds = new Date().getSeconds();
    return seconds < 10 ? `0${seconds}` : seconds.toString();
  }

  private getCharOcurrences(grid: string[][]): [number, number] {
    const currentSeconds = this.getTwoDigitSeconds();
    const row1 = parseInt(currentSeconds[0]);
    const col1 = parseInt(currentSeconds[1]);
    const row2 = col1;
    const col2 = row1;

    const value1 = grid[row1] && grid[row1][col1] ? grid[row1][col1] : 'N/A';
    const value2 = grid[row2] && grid[row2][col2] ? grid[row2][col2] : 'N/A';

    let ocurrences1 = 0;
    let ocurrences2 = 0;

    for (const row of grid) {
      for (const col of row) {
        if (col === value1) {
          ocurrences1++;
        }
        if (col === value2) {
          ocurrences2++;
        }
      }
    }

    return [ocurrences1, ocurrences2];
  }

  private adjustCount(ocurrences: number): number {
    if (ocurrences % 9 === 0) return 9; // Divisible by 9
    if (ocurrences % 8 === 0) return 8; // Divisible by 8
    if (ocurrences % 7 === 0) return 7; // Divisible by 7
    if (ocurrences % 6 === 0) return 6; // Divisible by 6
    if (ocurrences % 5 === 0) return 5; // Divisible by 5
    if (ocurrences % 4 === 0) return 4; // Divisible by 4
    if (ocurrences % 3 === 0) return 3; // Divisible by 3
    if (ocurrences % 2 === 0) return 2; // Divisible by 2

    return 1;
  }

  private getGridCode(grid: string[][]): number {
    let [ocurrences1, ocurrences2] = this.getCharOcurrences(grid);
    if (ocurrences1 > 9) {
      ocurrences1 = this.adjustCount(ocurrences1);
    }
    if (ocurrences2 > 9) {
      ocurrences2 = this.adjustCount(ocurrences2);
    }
    return ocurrences1 * 10 + ocurrences2;
  }

  private getGridData(bias: string | null) {
    return interval(1000).pipe(
      map(() => {
        const grid = this.generateGrid(bias);
        const code = this.getGridCode(grid);
        const data: IGridData = {
          grid,
          code,
        };
        return data;
      })
    );
  }
}
