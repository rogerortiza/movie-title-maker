import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FileDataService } from '../../services/file-data.service';
import { of } from 'rxjs';
import { FileImportComponent } from './file-import.component';

describe('FileImportComponent', () => {
  let component: FileImportComponent;
  let fixture: ComponentFixture<FileImportComponent>;
  let fileDataService: FileDataService;

  beforeEach(async () => {
    const fileDataServiceMock = {
      updateFileData: jasmine.createSpy('updateFileData'),
      currentFileData: of([])
    };

    await TestBed.configureTestingModule({
      imports: [FileImportComponent, CommonModule],
      providers: [{ provide: FileDataService, useValue: fileDataServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileImportComponent);
    component = fixture.componentInstance;
    fileDataService = TestBed.inject(FileDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file input', () => {
    const file = new File(['content'], 'file.txt', { type: 'text/plain' });
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => file
    }

    spyOn(component, 'readFile');

    component.handleFileInput(fileList as any);

    expect(component.readFile).toHaveBeenCalledWith(file);
  });

  
  it('should handle drag over event', () => {
    const event = new DragEvent('dragover');
    spyOn(event, 'preventDefault');

    component.handleDragOver(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.dragOver).toBeTrue();
  });

  it('should handle drag leave event', () => {
    const event = new DragEvent('dragleave');

    component.handleDragLeave(event);

    expect(component.dragOver).toBeFalse();
  });

  it('should handle drop event', () => {
    const file = new File(['content'], 'file.txt', { type: 'application/json' });
    const fileList = {
      0: file,
      length: 1,
      item: (index: number) => file
    }

    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      dataTransfer: {
        files: fileList
      }
    }

    spyOn(component, 'handleFileInput');

    component.handleDrop(event as any);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(component.handleFileInput).toHaveBeenCalledWith(fileList as any);
    expect(component.dragOver).toBeFalse();
  });

});
