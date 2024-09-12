import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-actions',
  standalone: true,
  imports: [],
  templateUrl: './file-actions.component.html',
  styleUrl: './file-actions.component.css'
})
export class FileActionsComponent {

  @Input() selectedFiles: any[] = [];
  @Output() onNewFile = new EventEmitter<void>();
  @Output() onDeletedFile = new EventEmitter<void>();

  
  newFile() {
    this.onNewFile.emit();
  }
  

  deleteFiles() {
    if(this.selectedFiles.length > 0){
      this.onDeletedFile.emit();
    }
  }

}
