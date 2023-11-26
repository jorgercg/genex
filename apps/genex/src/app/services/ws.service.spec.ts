import { WebSocketService } from './ws.service';

describe('WebSocketService', () => {
  let service: WebSocketService;

  beforeEach(() => {
    service = new WebSocketService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
