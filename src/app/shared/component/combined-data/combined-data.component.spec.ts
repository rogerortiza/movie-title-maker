import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { FileDataService } from '../../services/file-data.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CombinedDataComponent } from './combined-data.component';

describe('CombinedDataComponent', () => {
  let component: CombinedDataComponent;
  let fixture: ComponentFixture<CombinedDataComponent>;
  let fileDataService: FileDataService;

  beforeEach(async () => {
    const fileDataServiceMock = {
      currentFileData: of([
        {
          content: [
            { title: 'Title 1', name: 'Name 1' },
            { title: 'Title 2', name: 'Name 2' }
          ]
        },
      ]),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CombinedDataComponent, MatTableModule, BrowserAnimationsModule],
      providers: [{ provide: FileDataService, useValue: fileDataServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedDataComponent);
    component = fixture.componentInstance;
    fileDataService = TestBed.inject(FileDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should initialize dataSource with data from fileDataService', () => {
    fixture.detectChanges();
    
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0]['content'][0].title).toBe('Title 1');
    expect(component.dataSource.data[0]['content'][0].name).toBe('Name 1');
  });

  it('should set editingTitle and editingName to false for each item in dataSource', () => {
    fixture.detectChanges();
    const data = component.dataSource.data;
    data.forEach((item: any) => {
      expect(item.editingTitle).toBeFalse();
      expect(item.editingName).toBeFalse();
    });
  });

  it('should return a unique identifier for each item in dataSource', () => {
    const item = { title: 'Title 1', name: 'Name 1' };
    const index = 0;
    const result = component.trackByFn(index, item);

    expect(result).toBe('Title 1Name 1');
  });
});
