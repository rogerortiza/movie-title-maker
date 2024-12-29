import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { FileDataService } from '../../services/file-data.service';
import { of } from 'rxjs';
import { FileActionsComponent } from './file-actions.component';

describe('FileActionsComponent', () => {
  let component: FileActionsComponent;
  let fixture: ComponentFixture<FileActionsComponent>;
  let fileDataService: FileDataService;

  beforeEach(async () => {
    const fileDataServiceMock = {
      currentFileData: of([
        { content: { title: 'Title 1', name: 'Name 1' } },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [FileActionsComponent, MatButtonModule],
      providers: [{ provide: FileDataService, useValue: fileDataServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileActionsComponent);
    component = fixture.componentInstance;
    fileDataService = TestBed.inject(FileDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datasource with data from fileDataService', () => {
    fixture.detectChanges();
    
    expect(component.datasource.length).toBe(1);
    expect(component.datasource[0].content.title).toBe('Title 1');
    expect(component.datasource[0].content.name).toBe('Name 1');
  });

  it('should export data to JSON', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    spyOn(document, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy('click'),
    } as any);
    
    component.exportToJson();
    
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.createElement('a').click).toHaveBeenCalled();
  });

  it('should export data to text', () => {
    spyOn(window.URL, 'createObjectURL').and.returnValue('blob:url');
    spyOn(document, 'createElement').and.returnValue({
      href: '',
      download: '',
      click: jasmine.createSpy('click'),
    } as any);
    
    component.exportToText();
    
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(document.createElement('a').click).toHaveBeenCalled();
  });
});
