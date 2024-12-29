
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FileDataService } from '../../services/file-data.service';


@Component({
  selector: 'app-combined-data',
  imports: [CommonModule, FormsModule, MatIconModule, MatInputModule, MatTableModule, MatFormFieldModule],
  templateUrl: './combined-data.component.html',
  styleUrl: './combined-data.component.css'
})

export class CombinedDataComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['title', 'name'];
element: any;

  constructor(private fileDataService: FileDataService) { }

  ngOnInit() {
    this.fileDataService.currentFileData.subscribe((data) => {
      
      this.dataSource.data = data.map(item => ({
        ...item,
        editingTitle: false,
        editingName: false
      }));
    });
  }

  trackByFn(index: number, item: any): any {
    return item.title + item.name;
  }
}
