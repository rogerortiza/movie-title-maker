import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { FileDataService } from '../../services/file-data.service';

@Component({
  selector: 'app-file-actions',
  imports: [MatButtonModule],
  templateUrl: './file-actions.component.html',
  styleUrl: './file-actions.component.css'
})
export class FileActionsComponent implements OnInit {
  datasource: any[] = [];
  
  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
    this.fileDataService.currentFileData.subscribe((data) => {
      this.datasource = data;
    });
  }

  exportToJson() {
    if (!this.datasource.length) {
      return;
    }
    
    const contentArray = this.datasource.map(item => item.content);
    const json = JSON.stringify(contentArray, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movie-title-maker.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  exportToText() {
    if (!this.datasource.length) {
      return;
    }
    
    const contentArray = this.datasource.map(item => JSON.stringify(item.content));
    const text = contentArray.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'movie-title-maker.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
