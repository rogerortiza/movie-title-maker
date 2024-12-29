import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from "./shared/component/header/header.component";
import { CombinedDataComponent } from "./shared/component/combined-data/combined-data.component";
import { FileActionsComponent } from './shared/component/file-actions/file-actions.component';
import { FileImportComponent } from "./shared/component/file-import/file-import.component";
import { PreviewPaneComponent } from "./shared/component/preview-pane/preview-pane.component";

@Component({
  selector: 'app-root',
  imports: [CombinedDataComponent, HeaderComponent, FileActionsComponent, FileImportComponent, PreviewPaneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-title-maker';
}
