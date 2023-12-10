import { IGridData } from '@genex/interfaces';
import { Observable } from 'rxjs';

export abstract class AbstractWebSocketService {
  abstract getConnectionStatus(): Observable<boolean>;
  abstract setBias(bias: string): void;
  abstract listenForData(): Observable<IGridData>;
  abstract stopGeneratingData(): void;
}
