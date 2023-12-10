import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratorComponent } from './generator.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { GeneratorState } from '../state/generator.reducer';
import { IGridData } from '@genex/interfaces';
import { GenexButtonComponent } from '@genex/button';
import { GenexInputComponent } from '@genex/input';
import { AbstractWebSocketService } from '../../../services/ws.class';
import { Observable } from 'rxjs';

class MockWebSocketService extends AbstractWebSocketService {
  override getConnectionStatus(): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
  override setBias(bias: string): void {
    throw new Error('Method not implemented.');
  }
  override listenForData(): Observable<IGridData> {
    throw new Error('Method not implemented.');
  }
  override stopGeneratingData(): void {
    throw new Error('Method not implemented.');
  }
}

describe('GeneratorComponent', () => {
  let component: GeneratorComponent;
  let fixture: ComponentFixture<GeneratorComponent>;
  let wsService: MockWebSocketService;
  let store: MockStore;
  const initialState: GeneratorState = {
    pageData: <IGridData>{
      grid: [],
      code: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneratorComponent],
      imports: [GenexButtonComponent, GenexInputComponent],
      providers: [provideMockStore({ initialState }), MockWebSocketService],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    wsService = TestBed.inject(MockWebSocketService);
    fixture = TestBed.createComponent(GeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
