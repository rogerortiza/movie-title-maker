import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

import { FileDataService } from '../../services/file-data.service';

@Component({
  selector: 'app-preview-pane',
  imports: [CommonModule, MatDividerModule],
  templateUrl: './preview-pane.component.html',
  styleUrl: './preview-pane.component.css'
})
export class PreviewPaneComponent implements OnInit {
  dataSource: any[] = [];

  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
    this.fileDataService.currentFileData.subscribe((data) => {
      this.dataSource = data;
    });
  }
}
