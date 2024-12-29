import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FileDataService } from '../../services/file-data.service';
import { of } from 'rxjs';

import { PreviewPaneComponent } from './preview-pane.component';

describe('PreviewPaneComponent', () => {
  let component: PreviewPaneComponent;
  let fixture: ComponentFixture<PreviewPaneComponent>;
  let fileDataService: FileDataService;

  beforeEach(async () => {
    const fileDataServiceMock = {
      currentFileData: of([
        { content: { title: 'Title 1', name: 'Name 1' } },
      ]),
    };

    await TestBed.configureTestingModule({
      imports: [PreviewPaneComponent, CommonModule, MatDividerModule],
      providers: [{ provide: FileDataService, useValue: fileDataServiceMock }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewPaneComponent);
    component = fixture.componentInstance;
    fileDataService = TestBed.inject(FileDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize datasource with data from fileDataService', () => {
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0].content.title).toBe('Title 1');
    expect(component.dataSource[0].content.name).toBe('Name 1');
  });

  it('should display the title and name in the template', () => {
    const compiled = fixture.nativeElement;
    const titles = compiled.querySelectorAll('.title');
    const names = compiled.querySelectorAll('.name');

    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Title 1');


    expect(names.length).toBe(1);
    expect(names[0].textContent).toContain('Name 1');
  });
});
