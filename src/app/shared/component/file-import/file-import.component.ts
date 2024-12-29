import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDataService } from '../../services/file-data.service';

@Component({
  selector: 'app-file-import',
  imports: [CommonModule],
  templateUrl: './file-import.component.html',
  styleUrl: './file-import.component.css'
})
export class FileImportComponent {
  importedFiles: { name: string, type: string, size: number }[] = [];
  importedContentFiles: { content: string }[] = [];
  dragOver = false;

  constructor(private fileDataService: FileDataService) { }

  handleFileInput(files: FileList | null): void {
    if (!files) {
      return;
    }
    
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.readFile(file)
      }
    }
  }

  readFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e) => {
      let content;
      this.importedFiles.push({
        name: file.name,
        type: file.type,
        size: file.size
      });

      if (file.type === 'application/json') {
        try {
          content = JSON.parse(reader.result as string);
          if (Array.isArray(content)) {
            content.forEach((item: any) => {
              this.importedContentFiles.push({
                content: item
              });
            });
          } else {
            this.importedContentFiles.push({
              content: content
            });
          }
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      }
      else {
        this.importedContentFiles.push({
          content: reader.result as string
        });
      }

      this.fileDataService.updateFileData(this.importedContentFiles);
    };

    reader.onerror = (e) => {
      console.error('Error reading file:', e);
    };

    if (file.type === 'application/json' || file.type === 'text/plain') {
      reader.readAsText(file);
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
      reader.readAsArrayBuffer(file); // For Excel files
    } else {
      reader.readAsDataURL(file); // For other files types like images or videos PDFs
    }
  }

  handleDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = true;
  }

  handleDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
  }

  handleDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFileInput(files);
    }
  }

  clearFiles(): void {
    this.importedFiles = [];
    this.importedContentFiles = [];
    this.fileDataService.updateFileData(this.importedContentFiles);
  }
}
