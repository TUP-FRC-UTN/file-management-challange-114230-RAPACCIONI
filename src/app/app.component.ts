import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileType } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';
import { FileActionsComponent } from "./file-actions/file-actions.component";
import { FileListComponent } from "./file-list/file-list.component";
import { FileFormComponent } from "./file-form/file-form.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, FileActionsComponent, FileListComponent, FileFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {


  title = 'file-management';


  files: FileItem[] = FILE_LIST;
  selectedFiles: FileItem[] = [];


  // ordenar los archivos y carpetas
  get sortedFiles(): FileItem[]{
    return this.files
    .filter(file => file.name)
    .sort((a, b) => a.name.localeCompare(b.name));
  }

  // seleccionar archivos y carpetas
  handleFileSelected(file: FileItem) {
    if(this.selectedFiles.includes(file)){
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    } else{
      this.selectedFiles.push(file);
    }
  }


  // eliminar los archivos/carpetas
  handleDeletedFiles() {
    if(this.selectedFiles.length > 1){
      if(confirm("Seguro que desea eliminar los archivos seleccionados?")){
        this.selectedFiles.forEach(file => {
          this.files = this.files.filter(f => f.id !== file.id);
        });
        this.selectedFiles = [];
      }
    } else{
      const file = this.selectedFiles[0];
      this.files = this.files.filter(f => f.id !== file.id);
      this.selectedFiles = [];
    }
  }

  // abrir el formulario de archivo nuevo
  handleNewFile() {
    const modalElement = document.getElementById('newFileModal')!;
    const modal = new Modal(modalElement);
    modal.show();
  }

  addNewFile(newFile: any) {

    const duenos = newFile.duenos ? newFile.duenos : [];

    if (!newFile.nombre || newFile.nombre.trim() === '') {
      console.error('El nombre del archivo es obligatorio');
      return;
    }

    this.files.push({
      id: (this.files.length + 1).toString(),
      name: newFile.name,
      creation: new Date(newFile.fecha),
      owners: duenos.map((owner: string) => ({name: owner, avatarUrl: 'default.png'})),
      type: newFile.type === 'Archivo' ? FileType.FILE : FileType.FOLDER
    });
  }
}
