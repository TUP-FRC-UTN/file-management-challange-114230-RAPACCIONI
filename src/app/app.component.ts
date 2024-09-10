import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FileItem, FileType } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {



  title = 'file-management';

  files: FileItem[] = FILE_LIST;
  selectedFiles: FileItem[] = [];

  archivos: any[] = [];
  carpetasExistentes: string[] = ['Carpeta 1', 'Carpeta 2'];
  nuevoArchivo: any = {
    nombre: '',
    fecha: '',
    tipo: 'Archivo',
    carpetaPadre: '',
    duenos: []
  };
  duenoActual: string = '';

  // ordenar los archivos y carpetas
  get sortedFiles(): FileItem[]{
    return this.files.sort((a, b) => {
      // primero mostramos carpetas, despues archivos
      if(a.type === FileType.FOLDER && b.type === FileType.FILE) return -1;
      if(a.type === FileType.FILE && b.type === FileType.FOLDER) return 1;
      return a.name.localeCompare(b.name);
    });
  }


  // seleccionar archivos y carpetas
  selectedFile(file: FileItem) {
    if(this.selectedFiles.includes(file)){
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    } else{
      this.selectedFiles.push(file);
    }
  }


  // eliminar los archivos/carpetas
  deletedSelected() {
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

  // abrit formulario de alta
  openForm() {
    const modalElement = document.getElementById('nuevoArchivoModal')!;
    const modal = new Modal(modalElement);
    modal.show();
  }

  crearArchivo(form: NgForm) {
    if (form.valid) {
      this.archivos.push({ ...this.nuevoArchivo });
      form.reset();
    }
  }

  eliminarDueno(index: number) {
    this.nuevoArchivo.duenos.splice(index, 1);
  }

  agregarDueno() {
    if (this.duenoActual && !this.nuevoArchivo.duenos.includes(this.duenoActual)) {
      this.nuevoArchivo.duenos.push(this.duenoActual);
      this.duenoActual = '';
    }
  }

}
