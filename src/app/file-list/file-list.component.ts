import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileItem } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent {

  @Input() files: FileItem[] = [];
  @Input() selectedFiles: FileItem[] = [];
  @Output() fileSelected = new EventEmitter<FileItem>();

  selectFile(file: FileItem) {
    this.fileSelected.emit(file);
  }

}
